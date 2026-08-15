import { defineEventHandler } from 'h3';
import type { Auction } from '#shared/types/auction';

export default defineEventHandler(async (): Promise<Auction[]> => {
  return await readAuctions();
});
