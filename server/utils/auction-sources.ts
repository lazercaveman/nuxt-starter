import type { Auction, FederalState } from '#shared/types/auction';
import { fetchHanmarkPage, HANMARK_SOURCES } from './hanmark-scraper';
import { fetchZvgPage, ZVG_SOURCES } from './zvg-scraper';

export interface AuctionSource {
  url: string;
  state: FederalState;
  fetch: (url: string, state: FederalState) => Promise<Auction[]>;
}

/** Every page the crawler visits. The federal state is fixed here, per source. */
export const AUCTION_SOURCES: AuctionSource[] = [
  ...ZVG_SOURCES.map((url): AuctionSource => ({ url, state: 'NRW', fetch: fetchZvgPage })),
  ...HANMARK_SOURCES.map((url): AuctionSource => ({ url, state: 'SH', fetch: fetchHanmarkPage })),
];
