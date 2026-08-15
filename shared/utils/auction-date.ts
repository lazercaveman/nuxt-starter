/** Parses the court format "17.07.2026, 09:00 Uhr". Returns null if the page used something else. */
export const parseAuctionDate = (date: string): Date | null => {
  const match = date.match(/(\d{2})\.(\d{2})\.(\d{4})(?:,\s*(\d{2}):(\d{2}))?/);
  if (!match) return null;

  const [, day, month, year, hour = '0', minute = '0'] = match;
  return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
};

/** Unparsable dates sink to the bottom of a sorted list. */
export const toTimestamp = (date: string): number => parseAuctionDate(date)?.getTime() ?? Number.POSITIVE_INFINITY;
