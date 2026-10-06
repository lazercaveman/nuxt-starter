<template>
  <!-- The default layout already renders <main>, so this page must not nest another one. -->
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <h1 class="text-lg font-semibold">Auction Grabber</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            <template v-if="visibleAuctions.length">
              {{ visibleAuctions.length }} Objekte · {{ courtCount }} {{ courtCount === 1 ? 'Amtsgericht' : 'Amtsgerichte' }}
              <span
                v-if="totalNew"
                class="font-medium text-emerald-600 dark:text-emerald-400"
              >
                · {{ totalNew }} neu
              </span>
              <span
                v-if="totalUpdated"
                class="font-medium text-amber-600 dark:text-amber-400"
              >
                · {{ totalUpdated }} aktualisiert
              </span>
            </template>
            <template v-else>Zwangsversteigerungen in NRW und Schleswig-Holstein</template>
          </p>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          :disabled="isCrawling"
          @click="startCrawl"
        >
          <span
            v-if="isCrawling"
            class="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          {{ isCrawling ? 'Crawler läuft …' : 'Crawler starten' }}
        </button>
      </div>
    </header>

    <div class="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-8">
      <p
        v-if="status"
        class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
      >
        {{ status }}
      </p>

      <p
        v-if="errorMessage"
        class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
      >
        {{ errorMessage }}
      </p>

      <div
        v-if="auctions.length"
        role="group"
        aria-label="Nach Bundesland filtern"
        class="flex flex-wrap gap-2"
      >
        <button
          v-for="option in stateOptions"
          :key="option.value ?? 'all'"
          type="button"
          :aria-pressed="selectedState === option.value"
          class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100"
          :class="
            selectedState === option.value
              ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
          "
          @click="selectedState = option.value"
        >
          {{ option.label }}
          <span class="text-xs tabular-nums opacity-60">{{ option.count }}</span>
        </button>
      </div>

      <p
        v-if="!auctions.length"
        class="rounded-xl border border-dashed border-slate-300 px-6 py-16 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
      >
        Noch keine Objekte gespeichert.<br />
        Starte den Crawler, um die Termine der Amtsgerichte abzurufen.
      </p>

      <p
        v-else-if="!visibleAuctions.length && selectedState"
        class="rounded-xl border border-dashed border-slate-300 px-6 py-16 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
      >
        Keine Objekte in {{ FEDERAL_STATE_LABELS[selectedState] }} gespeichert.
      </p>

      <section
        v-if="news.length"
        class="flex flex-col gap-3"
      >
        <h2
          class="sticky top-19 z-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-slate-200 bg-slate-50/80 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
        >
          <span class="text-sm font-semibold tracking-wide uppercase">News</span>

          <span class="text-xs text-slate-500 tabular-nums dark:text-slate-400">seit dem letzten Abruf</span>

          <span
            v-if="totalNew"
            class="rounded-full bg-emerald-600 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white uppercase tabular-nums"
          >
            {{ totalNew }} neu
          </span>

          <span
            v-if="totalUpdated"
            class="rounded-full bg-amber-600 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white uppercase tabular-nums"
          >
            {{ totalUpdated }} aktualisiert
          </span>
        </h2>

        <AuctionList
          :auctions="news"
          show-court
        />
      </section>

      <section
        v-for="courtGroup in groupedByCourt"
        :key="courtGroup.court"
        class="flex flex-col gap-4"
      >
        <h2
          class="sticky top-19 z-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-slate-200 bg-slate-50/80 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
        >
          <span class="text-sm font-semibold tracking-wide uppercase">{{ courtGroup.court }}</span>

          <span class="text-xs text-slate-500 tabular-nums dark:text-slate-400">
            {{ courtGroup.total }} {{ courtGroup.total === 1 ? 'Objekt' : 'Objekte' }}
          </span>
        </h2>

        <div
          v-for="cityGroup in courtGroup.cities"
          :key="cityGroup.city"
          class="flex flex-col gap-2 rounded-xl"
          :class="cityAccent(cityGroup.city)?.container"
        >
          <h3 class="flex flex-wrap items-baseline gap-x-2 gap-y-1 px-1">
            <span
              class="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase"
              :class="cityAccent(cityGroup.city)?.badge ?? 'text-slate-500 dark:text-slate-400'"
            >
              {{ cityGroup.city }}
            </span>

            <span class="text-xs text-slate-500 tabular-nums dark:text-slate-400">
              {{ cityGroup.auctions.length }} {{ cityGroup.auctions.length === 1 ? 'Objekt' : 'Objekte' }}
            </span>
          </h3>

          <AuctionList :auctions="cityGroup.auctions" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuctionList from '@/components/auction-list/AuctionList.vue';
import type { Auction, CrawlResult, FederalState } from '#shared/types/auction';
import { toTimestamp } from '#shared/utils/auction-date';
import { FEDERAL_STATE_LABELS, FEDERAL_STATES } from '#shared/utils/federal-state';

const { data: auctions } = await useFetch<Auction[]>('/api/auctions', { default: () => [] });

const isCrawling = ref(false);
const status = ref('');
const errorMessage = ref('');

/** `null` shows every federal state. */
const selectedState = ref<FederalState | null>(null);

const visibleAuctions = computed(() => (selectedState.value ? auctions.value.filter((auction) => auction.state === selectedState.value) : auctions.value));

const stateOptions = computed(() => [
  { value: null, label: 'Alle', count: auctions.value.length },
  ...FEDERAL_STATES.map((state) => ({
    value: state,
    label: FEDERAL_STATE_LABELS[state],
    count: auctions.value.filter((auction) => auction.state === state).length,
  })),
]);

/** New objects first, then updated ones, then by auction date. */
const byRelevance = (a: Auction, b: Auction): number =>
  Number(b.new) - Number(a.new) || Number(b.updated) - Number(a.updated) || toTimestamp(a.date) - toTimestamp(b.date);

const byDate = (a: Auction, b: Auction): number => toTimestamp(a.date) - toTimestamp(b.date);

/** Everything the last crawl touched — pulled out of its court group until it goes quiet again. */
const news = computed(() => visibleAuctions.value.filter((auction) => auction.new || auction.updated).sort(byRelevance));

const totalNew = computed(() => visibleAuctions.value.filter((auction) => auction.new).length);
const totalUpdated = computed(() => visibleAuctions.value.filter((auction) => auction.updated).length);

// Counted across all visible records, not across the rendered groups — those skip courts fully in NEWS.
const courtCount = computed(() => new Set(visibleAuctions.value.map((auction) => auction.court)).size);

/** Pastel highlight per city — kept separate from the NEW/UPDATED accents in AuctionList. */
const CITY_ACCENTS: Record<string, { container: string; badge: string }> = {
  Erftstadt: {
    container: 'border border-rose-200 bg-rose-50/60 p-3 dark:border-rose-500/20 dark:bg-rose-500/5',
    badge: 'bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300',
  },
  'Bad Münstereifel': {
    container: 'border border-sky-200 bg-sky-50/60 p-3 dark:border-sky-500/20 dark:bg-sky-500/5',
    badge: 'bg-sky-200 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300',
  },
  Zülpich: {
    container: 'border border-lime-200 bg-lime-50/60 p-3 dark:border-lime-500/20 dark:bg-lime-500/5',
    badge: 'bg-lime-200 text-lime-800 dark:bg-lime-500/20 dark:text-lime-300',
  },
  Blankenheim: {
    container: 'border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-500/20 dark:bg-amber-500/5',
    badge: 'bg-amber-200 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300',
  },
};

const cityAccent = (city: string) => CITY_ACCENTS[city];

/** Drops the postcode and any district suffix ("50374 Erftstadt, Lechenich" → "Erftstadt") so districts fall into one city bucket. */
const cityOf = (auction: Auction): string => {
  const withoutPostcode = auction.place.replace(/^\d{4,5}\s*/, '');
  return withoutPostcode.split(',')[0]?.trim() || 'Ort nicht angegeben';
};

const groupByCity = (courtAuctions: Auction[]) => {
  const groups = new Map<string, Auction[]>();

  for (const auction of courtAuctions) {
    const city = cityOf(auction);
    const group = groups.get(city) ?? [];
    group.push(auction);
    groups.set(city, group);
  }

  return [...groups].map(([city, group]) => ({ city, auctions: [...group].sort(byDate) })).sort((a, b) => a.city.localeCompare(b.city, 'de'));
};

const groupedByCourt = computed(() => {
  const groups = new Map<string, Auction[]>();

  for (const auction of visibleAuctions.value) {
    if (auction.new || auction.updated) continue;

    const group = groups.get(auction.court) ?? [];
    group.push(auction);
    groups.set(auction.court, group);
  }

  return [...groups].map(([court, group]) => ({ court, total: group.length, cities: groupByCity(group) })).sort((a, b) => a.court.localeCompare(b.court, 'de'));
});

const startCrawl = async () => {
  isCrawling.value = true;
  errorMessage.value = '';
  status.value = '';

  try {
    const result = await $fetch<CrawlResult>('/api/crawl', { method: 'POST' });

    auctions.value = result.auctions;
    status.value = `${result.stats.scraped} Objekte abgerufen · ${result.stats.added} neu · ${result.stats.updated} aktualisiert · ${result.stats.unchanged} unverändert`;

    if (result.failures.length) {
      errorMessage.value = `Nicht erreichbar: ${result.failures.map((failure) => failure.source).join(', ')}`;
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Der Crawler konnte nicht ausgeführt werden.';
  } finally {
    isCrawling.value = false;
  }
};
</script>
