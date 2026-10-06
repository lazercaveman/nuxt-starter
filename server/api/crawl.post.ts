import { createError, defineEventHandler } from 'h3';
import type { Auction, CrawlResult } from '#shared/types/auction';

/** Guards against two crawls interleaving their read-merge-write cycle on data.json. */
let running = false;

export default defineEventHandler(async (): Promise<CrawlResult> => {
  if (running) {
    throw createError({ statusCode: 409, statusMessage: 'Es läuft bereits ein Crawl.' });
  }

  running = true;

  try {
    const results = await Promise.allSettled(AUCTION_SOURCES.map((source) => source.fetch(source.url, source.state)));

    const scraped: Auction[] = [];
    const failures: CrawlResult['failures'] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        scraped.push(...result.value);
        return;
      }

      failures.push({
        source: AUCTION_SOURCES[index]?.url ?? 'unbekannt',
        message: result.reason instanceof Error ? result.reason.message : String(result.reason),
      });
    });

    // Every court failed — nothing to merge, and writing now would be misleading.
    if (scraped.length === 0 && failures.length === AUCTION_SOURCES.length) {
      throw createError({ statusCode: 502, statusMessage: 'Keine der Quellen war erreichbar.' });
    }

    const stored = await readAuctions();
    const { auctions, added, updated, unchanged } = mergeAuctions(stored, scraped);

    await writeAuctions(auctions);

    return {
      auctions,
      stats: { scraped: scraped.length, added, updated, unchanged },
      failures,
    };
  } finally {
    running = false;
  }
});
