/** `NRW` = Nordrhein-Westfalen, `SH` = Schleswig-Holstein. */
export type FederalState = 'NRW' | 'SH';

export interface Auction {
  id: string;
  title: string;
  address: string;
  place: string;
  cost: number;
  date: string;
  url: string;
  new: boolean;
  /** Set when the last crawl changed one of the mutable fields; cleared on the next quiet crawl. */
  updated: boolean;
  court: string;
  /** Assigned per source in `server/utils/auction-sources.ts`, not read from the page. */
  state: FederalState;
}

export interface CrawlResult {
  auctions: Auction[];
  stats: {
    scraped: number;
    added: number;
    updated: number;
    unchanged: number;
  };
  /** Courts that could not be reached or parsed — the run still succeeds for the others. */
  failures: { source: string; message: string }[];
}
