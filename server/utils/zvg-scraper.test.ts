import { describe, expect, it } from 'vitest';
import { parseZvgPage } from './zvg-scraper';

/** Verbatim excerpt of the markup served by ag-bruehl.nrw.de. */
const FIXTURE = `
<html lang="de">
<head><title>
Amtsgericht Brühl:
Zwangsversteigerungs&shy;termine
</title></head>
<body>
  <div id="zvgTermine">
    <div class="ym-grid linearize-level-1 hiddenOnMobile">
      <div class="ym-g75 ym-gl zvgTeaser"><strong>Objekt</strong></div>
      <div class="ym-g25 ym-gr zvgDateX"><strong>Termin</strong></div>
    </div>
    <div id="zvg99c7" class="ym-grid linearize-level-1">
      <div class="ym-g75 ym-gl zvgTeaser">
        <strong><a href="https://www.zvg-portal.de/index.php?button=showZvg&amp;zvg_id=167641&amp;land_abk=nw&amp;sessionId=HL2lRI6S0A" target="_blank">Zweifamilienhaus, Garage, Doppelhaushälfte</a></strong> <img class="screen" src="/layout_rwd/images/externer_Link.gif" alt="externer Link" height="9" width="15"><br />
        Karl-Arnold-Straße 4, 50374 Erftstadt, Lechenich<br />
        Verkehrswert: 435.000,00 €      </div>
      <div class="ym-g25 ym-gr zvgDateX">
        <strong class="hiddenOnDesktop">Termin:</strong>
        17.07.2026, 09:00 Uhr
      </div>
    </div>
  </div>
</body>
</html>
`;

const SOURCE = 'https://www.ag-bruehl.nrw.de/behoerde/zvg_termine/index.php';

describe('parseZvgPage', () => {
  it('extracts a single auction and skips the table header row', () => {
    const auctions = parseZvgPage(FIXTURE, SOURCE, 'NRW');

    expect(auctions).toHaveLength(1);
    expect(auctions[0]).toEqual({
      id: 'ag-bruehl-167641',
      title: 'Zweifamilienhaus, Garage, Doppelhaushälfte',
      address: 'Karl-Arnold-Straße 4',
      place: '50374 Erftstadt, Lechenich',
      cost: 435_000,
      date: '17.07.2026, 09:00 Uhr',
      url: 'https://www.zvg-portal.de/index.php?button=showZvg&zvg_id=167641&land_abk=nw&sessionId=HL2lRI6S0A',
      new: true,
      updated: false,
      court: 'Amtsgericht Brühl',
      state: 'NRW',
    });
  });

  it('keeps the sessionId — the ZVG portal returns an error page without it', () => {
    expect(parseZvgPage(FIXTURE, SOURCE, 'NRW')[0]?.url).toContain('sessionId=HL2lRI6S0A');
  });

  it('derives the id from zvg_id, so a rotated sessionId does not resurface an object as new', () => {
    const first = parseZvgPage(FIXTURE, SOURCE, 'NRW');
    const second = parseZvgPage(FIXTURE.replace('HL2lRI6S0A', 'ZZ9xQQ1a2B'), SOURCE, 'NRW');

    expect(second[0]?.id).toBe(first[0]?.id);
    expect(second[0]?.url).toContain('sessionId=ZZ9xQQ1a2B');
  });

  it('returns an empty list when the page has no auction table', () => {
    expect(parseZvgPage('<html><body><p>Keine Termine</p></body></html>', SOURCE, 'NRW')).toEqual([]);
  });
});
