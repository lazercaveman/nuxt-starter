<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="auction in auctions"
      :key="auction.id"
      class="group relative grid grid-cols-[3.5rem_1fr] items-start gap-x-4 gap-y-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:gap-x-5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
      :class="accentOf(auction)?.ring"
    >
      <!-- Termin as a calendar chip: the fastest thing to scan down a column. -->
      <time
        :datetime="auction.date"
        class="flex flex-col items-center justify-center rounded-lg py-2 leading-none"
        :class="accentOf(auction)?.chip ?? 'bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400'"
      >
        <span class="text-lg font-semibold tabular-nums">{{ formatDate(auction.date).day }}</span>
        <span class="mt-1 text-[0.65rem] font-medium tracking-wide uppercase">{{ formatDate(auction.date).month }}</span>
        <span class="mt-1 text-[0.65rem] tabular-nums opacity-70">{{ formatDate(auction.date).year }}</span>
      </time>

      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <!-- Stretched link: the whole card is the click target, but only the title is focusable. -->
          <a
            :href="auction.url"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-slate-900 underline-offset-4 group-hover:underline after:absolute after:inset-0 after:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-slate-100"
          >
            {{ auction.title }}
          </a>

          <span
            v-if="accentOf(auction)"
            class="rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white uppercase"
            :class="accentOf(auction)?.badge"
          >
            {{ accentOf(auction)?.label }}
          </span>
        </div>

        <p class="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
          <!-- In the NEWS list the records are torn out of their court section, so name it here. -->
          <span v-if="showCourt">{{ auction.court }} · </span>
          <span v-if="auction.address">{{ auction.address }} · </span>{{ auction.place || 'Ort nicht angegeben' }}
          <span
            v-if="formatDate(auction.date).time"
            class="text-slate-400 tabular-nums dark:text-slate-500"
          >
            · {{ formatDate(auction.date).time }} Uhr
          </span>
        </p>

        <p class="mt-0.5 text-xs text-slate-400 tabular-nums sm:hidden dark:text-slate-500">Verkehrswert: {{ formatCost(auction.cost) }}</p>
      </div>

      <p class="hidden text-right sm:block">
        <span class="block font-semibold text-slate-900 tabular-nums dark:text-slate-100">{{ formatCost(auction.cost) }}</span>
        <span class="block text-[0.65rem] tracking-wide text-slate-400 uppercase dark:text-slate-500">Verkehrswert</span>
      </p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Auction } from '#shared/types/auction';
import { parseAuctionDate } from '#shared/utils/auction-date';

withDefaults(defineProps<{ auctions: Auction[]; showCourt?: boolean }>(), { showCourt: false });

interface Accent {
  label: string;
  ring: string;
  chip: string;
  badge: string;
}

/** Green marks a first sighting, amber a record that changed — never both, `new` wins. */
const NEW: Accent = {
  label: 'Neu',
  ring: 'ring-1 ring-emerald-500/30',
  chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  badge: 'bg-emerald-600',
};

const UPDATED: Accent = {
  label: 'Aktualisiert',
  ring: 'ring-1 ring-amber-500/30',
  chip: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  badge: 'bg-amber-600',
};

const accentOf = (auction: Auction): Accent | null => (auction.new ? NEW : auction.updated ? UPDATED : null);

const currency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const monthFormat = new Intl.DateTimeFormat('de-DE', { month: 'short' });
const timeFormat = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });

const formatCost = (cost: number): string => (cost > 0 ? currency.format(cost) : '—');

const formatDate = (date: string): { day: string; month: string; year: string; time: string } => {
  const parsed = parseAuctionDate(date);
  if (!parsed) return { day: '?', month: '', year: '', time: '' };

  return {
    day: String(parsed.getDate()).padStart(2, '0'),
    month: monthFormat.format(parsed).replace('.', ''),
    year: String(parsed.getFullYear()),
    time: timeFormat.format(parsed),
  };
};
</script>
