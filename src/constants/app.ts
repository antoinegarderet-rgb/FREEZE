export const APP_SCHEME = 'freeze';

export const OFFER_KINDS = {
  PERMANENT: 'permanent',
  DISCOVERY: 'discovery',
} as const;

export const OFFER_MODES = {
  COMPTOIR: 'comptoir',
  BORNE: 'borne',
  ONLINE: 'online',
} as const;

export const PARTNER_CATEGORIES = {
  RESTO: 'resto',
  BARS: 'bars',
  SPORT: 'sport',
  BEAUTY: 'beauty',
  LOISIRS: 'loisirs',
  SHOPPING: 'shopping',
  ONLINE: 'online',
} as const;

export const PARTNER_STATUSES = {
  PENDING: 'pending',
  VALIDATED: 'validated',
  REFUSED: 'refused',
  SUSPENDED: 'suspended',
  PENDING_REVIEW: 'pending_review',
} as const;

export const PREMIUM_PLANS = {
  MONTHLY: 'monthly',
  ANNUAL: 'annual',
} as const;

export const USER_ROLES = {
  USER: 'user',
  PARTNER: 'partner',
} as const;

export const MIN_AGE = 0; // age non vérifié numériquement, certification déclarative uniquement
export const AFFILIATE_COMMISSION_EUR = 4;
export const AFFILIATE_MIN_PAYOUT_EUR = 20;
export const AFFILIATE_YEARLY_CAP_EUR = 600;
export const AFFILIATE_YEARLY_WARNING_EUR = 500;
export const AFFILIATE_VALIDATION_DELAY_DAYS = 14;

export const SECURE_STORE_KEYS = {
  SUPABASE_SESSION: 'freeze_supabase_session',
} as const;

export const ASYNC_STORAGE_KEYS = {
  PREFERENCES: 'freeze_preferences',
} as const;
