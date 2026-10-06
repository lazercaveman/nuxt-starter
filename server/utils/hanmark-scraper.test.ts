import { describe, expect, it } from 'vitest';
import { parseHanmarkPage } from './hanmark-scraper';

/** Verbatim excerpt of the markup served by hanmark.de for the Amtsgericht Flensburg. */
const FIXTURE = `
<html>
<head><title>Amtsgericht Flensburg</title></head>
<body>
<div id="center" class="column"><div id="content" class="court">
    <h2>Amtsgericht Flensburg</h2>
    <div class="section">
        <table class="listing">
            <thead>
                <tr>
                    <th>Objekt<br />Sortierung</th>
                    <th>Aktenzeichen<br />▲ ▼</th>
                    <th>Objekttyp<br />▲ ▼</th>
                    <th>PLZ<br />▲ ▼</th>
                    <th>Ort<br />▲ ▼</th>
                    <th>Verkehrswert<br />▲ ▼</th>
                    <th>Termin<br />▲ ▼</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                        <td><a href="https://www.hanmark.de/wertgutachten-31012.html"><img src="https://www.hanmark.de/titelbild-listenansicht-31012.jpg" /></a></td>
                        <td><a href="https://www.hanmark.de/wertgutachten-31012.html">50 K 45/25</a></td>
                        <td><a href="https://www.hanmark.de/wertgutachten-31012.html">Doppelhaushälfte</a></td>
                        <td><a href="https://www.hanmark.de/wertgutachten-31012.html">24944</a></td>
                        <td><a href="https://www.hanmark.de/wertgutachten-31012.html">Flensburg</a></td>
                        <td><a href="https://www.hanmark.de/wertgutachten-31012.html">198.000 EUR</a></td>
                        <td><a href="https://www.hanmark.de/wertgutachten-31012.html">27.10.2026</a>
                            <br />
                            <a href="https://www.hanmark.de/wertgutachten-31012.html">10:00 Uhr</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</div></div>
</body>
</html>
`;

const SOURCE = 'https://www.hanmark.de/amtsgericht-3.html';

describe('parseHanmarkPage', () => {
  it('extracts an auction from the listing table', () => {
    const auctions = parseHanmarkPage(FIXTURE, SOURCE, 'SH');

    expect(auctions).toHaveLength(1);
    expect(auctions[0]).toEqual({
      id: 'hanmark-31012',
      title: 'Doppelhaushälfte',
      address: '',
      place: '24944 Flensburg',
      cost: 198_000,
      date: '27.10.2026, 10:00 Uhr',
      url: 'https://www.hanmark.de/wertgutachten-31012.html',
      new: true,
      updated: false,
      court: 'Amtsgericht Flensburg',
      state: 'SH',
    });
  });

  it('resolves columns by header, not by position', () => {
    const withoutImageColumn = FIXTURE.replace('<th>Objekt<br />Sortierung</th>', '').replace(/<td><a[^>]*><img[^>]*\/><\/a><\/td>/, '');

    expect(parseHanmarkPage(withoutImageColumn, SOURCE, 'SH')[0]).toMatchObject({ title: 'Doppelhaushälfte', place: '24944 Flensburg', cost: 198_000 });
  });

  it('returns an empty list when the page has no listing table', () => {
    expect(parseHanmarkPage('<html><body><p>Keine Termine</p></body></html>', SOURCE, 'SH')).toEqual([]);
  });
});
