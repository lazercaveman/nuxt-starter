import { describe, expect, it } from 'vitest';
import { mergeAuctions } from './auction-store';
import type { Auction } from '#shared/types/auction';

const auction = (overrides: Partial<Auction> = {}): Auction => ({
  id: 'ag-bruehl-167641',
  title: 'Zweifamilienhaus',
  address: 'Karl-Arnold-Straße 4',
  place: '50374 Erftstadt',
  cost: 435_000,
  date: '17.07.2026, 09:00 Uhr',
  url: 'https://www.zvg-portal.de/index.php?button=showZvg&zvg_id=167641',
  new: true,
  updated: false,
  court: 'Amtsgericht Brühl',
  ...overrides,
});

describe('mergeAuctions', () => {
  it('adds unknown auctions with new: true', () => {
    const { auctions, added } = mergeAuctions([], [auction()]);

    expect(added).toBe(1);
    expect(auctions[0]?.new).toBe(true);
  });

  it('adds unknown auctions without the updated flag', () => {
    const { auctions } = mergeAuctions([], [auction({ updated: true })]);

    expect(auctions[0]?.updated).toBe(false);
  });

  it('flips new: true to false when an auction is seen again', () => {
    const { auctions, unchanged } = mergeAuctions([auction({ new: true })], [auction()]);

    expect(auctions).toHaveLength(1);
    expect(auctions[0]?.new).toBe(false);
    expect(auctions[0]?.updated).toBe(false);
    expect(unchanged).toBe(1);
  });

  it('leaves an already-known auction untouched when nothing changed', () => {
    const stored = [auction({ new: false })];
    const { auctions, updated, unchanged } = mergeAuctions(stored, [auction()]);

    expect(auctions[0]).toEqual(stored[0]);
    expect(updated).toBe(0);
    expect(unchanged).toBe(1);
  });

  it('updates only the fields that actually changed and flags the record', () => {
    const { auctions, updated } = mergeAuctions([auction({ new: false })], [auction({ cost: 400_000 })]);

    expect(auctions[0]?.cost).toBe(400_000);
    expect(auctions[0]?.title).toBe('Zweifamilienhaus');
    expect(auctions[0]?.new).toBe(false);
    expect(auctions[0]?.updated).toBe(true);
    expect(updated).toBe(1);
  });

  it('clears a stale updated flag once a crawl brings no change', () => {
    const { auctions } = mergeAuctions([auction({ new: false, updated: true })], [auction()]);

    expect(auctions[0]?.updated).toBe(false);
  });

  it('defaults a missing updated flag on records stored before it existed', () => {
    const legacy = { ...auction({ new: false }), updated: undefined } as unknown as Auction;
    const { auctions } = mergeAuctions([legacy], []);

    expect(auctions[0]?.updated).toBe(false);
  });

  it('keeps stored auctions that were not part of the crawl', () => {
    const stale = auction({ id: 'ag-bruehl-000001', new: false });
    const { auctions } = mergeAuctions([stale], [auction({ id: 'ag-bruehl-167641' })]);

    expect(auctions).toHaveLength(2);
    expect(auctions[0]).toEqual(stale);
  });
});
