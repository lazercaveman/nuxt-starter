import * as cheerio from 'cheerio';
import type { Auction, FederalState } from '#shared/types/auction';
import { fetchHtml } from './fetch-html';

/** hanmark.de publishes the Wertgutachten for several courts — one listing page per court. */
export const HANMARK_SOURCES = ['https://www.hanmark.de/amtsgericht-3.html'] as const;

/** Header labels of the listing table — the sort arrows below them are ignored by the prefix match. */
const COLUMNS = {
  type: 'Objekttyp',
  postcode: 'PLZ',
  city: 'Ort',
  cost: 'Verkehrswert',
  date: 'Termin',
} as const;

const clean = (text: string): string => text.replaceAll(/\s+/g, ' ').trim();

/** "298.000 EUR" -> 298000. Unlike the ZVG pages, hanmark omits the cents. */
const parseCost = (text: string): number => {
  const match = text.match(/(\d[\d.]*)(?:,(\d{2}))?/);
  if (!match?.[1]) return 0;
  const value = Number.parseFloat(`${match[1].replaceAll('.', '')}.${match[2] ?? '00'}`);
  return Number.isNaN(value) ? 0 : value;
};

/** Date and time sit in two links ("08.10.2026" / "10:00 Uhr"); joined into the ZVG format "08.10.2026, 10:00 Uhr". */
const parseDate = (text: string): string => {
  const date = text.match(/\d{2}\.\d{2}\.\d{4}/)?.[0];
  if (!date) return clean(text);

  const time = text.match(/\d{2}:\d{2}/)?.[0];
  return time ? `${date}, ${time} Uhr` : date;
};

export const parseHanmarkPage = (html: string, sourceUrl: string, state: FederalState): Auction[] => {
  const $ = cheerio.load(html);
  const court = clean($('#content h2').first().text()) || clean($('title').text()) || new URL(sourceUrl).hostname;

  // Columns are resolved by header so a reordered or added column does not shift every field.
  const headers = $('table.listing thead th')
    .map((_, th) => clean($(th).text()))
    .get();
  const columnIndex = Object.fromEntries(
    Object.entries(COLUMNS).map(([key, label]) => [key, headers.findIndex((header) => header.startsWith(label))]),
  ) as Record<keyof typeof COLUMNS, number>;

  const auctions: Auction[] = [];

  $('table.listing tbody tr').each((_, row) => {
    const cells = $(row).find('td');
    const cell = (key: keyof typeof COLUMNS): string => (columnIndex[key] === -1 ? '' : cells.eq(columnIndex[key]).text());

    const href = $(row).find('a[href*="wertgutachten-"]').first().attr('href');
    const gutachtenId = href?.match(/wertgutachten-(\d+)/)?.[1];
    if (!href || !gutachtenId) return;

    auctions.push({
      // The Wertgutachten number is unique across all hanmark courts.
      id: `hanmark-${gutachtenId}`,
      title: clean(cell('type')),
      // The listing names no street — only postcode and town.
      address: '',
      place: clean(`${clean(cell('postcode'))} ${clean(cell('city'))}`),
      cost: parseCost(cell('cost')),
      date: parseDate(cell('date')),
      url: new URL(href, sourceUrl).toString(),
      new: true,
      updated: false,
      court,
      state,
    });
  });

  return auctions;
};

export const fetchHanmarkPage = async (sourceUrl: string, state: FederalState): Promise<Auction[]> =>
  parseHanmarkPage(await fetchHtml(sourceUrl), sourceUrl, state);
