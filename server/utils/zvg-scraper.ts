import * as cheerio from 'cheerio';
import type { Auction, FederalState } from '#shared/types/auction';
import { fetchHtml } from './fetch-html';

export const ZVG_SOURCES = [
  'https://www.ag-bruehl.nrw.de/behoerde/zvg_termine/index.php',
  'https://www.ag-euskirchen.nrw.de/behoerde/zvg_termine/index.php',
  'https://www.ag-schleiden.nrw.de/behoerde/zvg_termine/index.php',
  'https://www.ag-rheinbach.nrw.de/behoerde/zvg_termine/index.php',
] as const;

/** Fallback court names, used only if the page title cannot be read. */
const COURT_NAMES: Record<string, string> = {
  'ag-bruehl': 'Amtsgericht Brühl',
  'ag-euskirchen': 'Amtsgericht Euskirchen',
  'ag-schleiden': 'Amtsgericht Schleiden',
  'ag-rheinbach': 'Amtsgericht Rheinbach',
};

/** "www.ag-bruehl.nrw.de" -> "ag-bruehl" */
const courtSlug = (sourceUrl: string): string => {
  const labels = new URL(sourceUrl).hostname.split('.');
  return labels.find((label) => label.startsWith('ag-')) ?? labels[0] ?? 'unbekannt';
};

/**
 * The ZVG-Portal link is stored verbatim, including its `sessionId`: without that parameter the
 * portal answers with a bare "error" page. The id is derived from `zvg_id` instead of the URL, so a
 * rotated sessionId refreshes the stored link without ever resurfacing an object as new.
 */

/** "435.000,00 €" -> 435000 */
const parseCost = (text: string): number => {
  const match = text.match(/([\d.]+,\d{2})/);
  if (!match?.[1]) return 0;
  const value = Number.parseFloat(match[1].replaceAll('.', '').replace(',', '.'));
  return Number.isNaN(value) ? 0 : value;
};

/** "Karl-Arnold-Straße 4, 50374 Erftstadt, Lechenich" -> street + everything from the postcode on. */
const splitLocation = (location: string): { address: string; place: string } => {
  const segments = location
    .split(',')
    .map((segment) => segment.trim())
    .filter(Boolean);
  const postcodeIndex = segments.findIndex((segment) => /^\d{5}\b/.test(segment));

  if (postcodeIndex === -1) return { address: segments.join(', '), place: '' };

  return {
    address: segments.slice(0, postcodeIndex).join(', '),
    place: segments.slice(postcodeIndex).join(', '),
  };
};

export const parseZvgPage = (html: string, sourceUrl: string, state: FederalState): Auction[] => {
  const $ = cheerio.load(html);
  const slug = courtSlug(sourceUrl);
  const court = $('title').text().split(':')[0]?.trim() || COURT_NAMES[slug] || slug;

  const auctions: Auction[] = [];

  $('#zvgTermine .ym-grid').each((_, row) => {
    const teaser = $(row).find('.zvgTeaser');
    const link = teaser.find('a[href*="zvg_id="]').first();
    const href = link.attr('href');

    // The first `.ym-grid` is the table header — it carries no object link.
    if (!href) return;

    const zvgId = new URL(href).searchParams.get('zvg_id');
    if (!zvgId) return;

    // The teaser holds title / location / Verkehrswert as <br>-separated lines.
    const lines = (teaser.html() ?? '')
      .split(/<br\s*\/?>/i)
      .map((line) => cheerio.load(`<div>${line}</div>`).text().replaceAll(/\s+/g, ' ').trim())
      .filter(Boolean);

    const costLine = lines.find((line) => line.startsWith('Verkehrswert')) ?? '';
    const locationLine = lines.slice(1).find((line) => line !== costLine) ?? '';
    const { address, place } = splitLocation(locationLine);

    auctions.push({
      id: `${slug}-${zvgId}`,
      title: link.text().replaceAll(/\s+/g, ' ').trim(),
      address,
      place,
      cost: parseCost(costLine),
      date: $(row).find('.zvgDateX').text().replace('Termin:', '').replaceAll(/\s+/g, ' ').trim(),
      url: href,
      new: true,
      updated: false,
      court,
      state,
    });
  });

  return auctions;
};

export const fetchZvgPage = async (sourceUrl: string, state: FederalState): Promise<Auction[]> => parseZvgPage(await fetchHtml(sourceUrl), sourceUrl, state);
