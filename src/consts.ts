export const TODO_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PARTIAL: 'partial'
} as const

export const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: {
    literal: 'all',
    href: `/?filter=${TODO_FILTERS.ALL}`
  },
  [TODO_FILTERS.ACTIVE]: {
    literal: 'active',
    href: `/?filter=${TODO_FILTERS.ALL}`
  },
  [TODO_FILTERS.COMPLETED]: {
    literal: 'completed',
    href: `/?filter=${TODO_FILTERS.ALL}`
  }
} as const
