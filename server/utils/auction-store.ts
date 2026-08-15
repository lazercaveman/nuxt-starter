import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import type { Auction } from '#shared/types/auction';

/**
 * Defaults into `data/`, not next to the deployed `.output/`, so that replacing the build on a
 * redeploy cannot take the crawl history with it. `AUCTION_DATA_FILE` overrides it — in Docker it
 * points at a mounted volume. An absolute value is used verbatim, a relative one resolves from cwd.
 */
const dataFile = (): string => resolve(process.cwd(), process.env.AUCTION_DATA_FILE ?? 'data/auctions.json');

export const readAuctions = async (): Promise<Auction[]> => {
  try {
    const raw = await readFile(dataFile(), 'utf8');
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Auction[]) : [];
  } catch (error) {
    // A missing data file is the expected state before the first run.
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
};

export const writeAuctions = async (auctions: Auction[]): Promise<void> => {
  const target = dataFile();
  const temporaryFile = `${target}.tmp`;

  // The volume is mounted empty on a fresh container, so the directory may not exist yet.
  await mkdir(dirname(target), { recursive: true });

  // Written beside the target on purpose: rename() is only atomic within one filesystem.
  await writeFile(temporaryFile, `${JSON.stringify(auctions, null, 2)}\n`, 'utf8');
  await rename(temporaryFile, target);
};

interface MergeResult {
  auctions: Auction[];
  added: number;
  updated: number;
  unchanged: number;
}

/** Fields that may change on an existing record — `id` is the key, `new`/`updated` are derived below. */
const MUTABLE_FIELDS = ['title', 'address', 'place', 'cost', 'date', 'url', 'court'] as const;

const assignIfChanged = <K extends keyof Auction>(target: Auction, source: Auction, key: K): boolean => {
  if (target[key] === source[key]) return false;
  target[key] = source[key];
  return true;
};

/**
 * Merges a crawl result into the stored list:
 * - unknown id  -> appended with `new: true`
 * - known id    -> `new` drops to false, changed fields are overwritten and flagged via `updated`
 * - not scraped -> left untouched (records are never dropped)
 *
 * Both flags describe the *last* crawl only: a record seen again without any change loses them and
 * falls back out of the NEWS list into its court group.
 */
export const mergeAuctions = (stored: Auction[], scraped: Auction[]): MergeResult => {
  // `updated` may be missing on records written before the flag existed.
  const auctions = stored.map((auction) => ({ ...auction, updated: auction.updated ?? false }));
  const byId = new Map(auctions.map((auction) => [auction.id, auction]));

  let added = 0;
  let updated = 0;
  let unchanged = 0;

  for (const incoming of scraped) {
    const existing = byId.get(incoming.id);

    if (!existing) {
      const record = { ...incoming, new: true, updated: false };
      auctions.push(record);
      byId.set(record.id, record);
      added += 1;
      continue;
    }

    let changed = false;

    for (const field of MUTABLE_FIELDS) {
      if (assignIfChanged(existing, incoming, field)) changed = true;
    }

    // Seen again, so it is no longer new — regardless of its previous flag.
    existing.new = false;
    existing.updated = changed;

    if (changed) updated += 1;
    else unchanged += 1;
  }

  return { auctions, added, updated, unchanged };
};
