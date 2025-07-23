export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
} as const;

export const CAR_LISTING = {
  GRID_VIEW: 'grid',
  LIST_VIEW: 'list',
  DEFAULT_SORT: 'popular',
} as const;

export const URL_PARAMS = {
  PAGE: 'page',
  SORT: 'sort',
  VIEW: 'view',
} as const;
