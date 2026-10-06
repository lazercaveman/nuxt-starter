import type { FederalState } from '#shared/types/auction';

/** Display order of the filter, and the label used for each state. */
export const FEDERAL_STATE_LABELS: Record<FederalState, string> = {
  NRW: 'NRW',
  SH: 'Schleswig-Holstein',
};

export const FEDERAL_STATES = Object.keys(FEDERAL_STATE_LABELS) as FederalState[];
