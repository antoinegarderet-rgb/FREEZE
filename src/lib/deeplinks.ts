import * as Linking from 'expo-linking';
import { OFFER_KINDS } from '@/constants/app';
import type { OfferKind } from '@/types/database';

export interface ScanDeepLink {
  offerId: string;
  kind: OfferKind;
}

/**
 * Parses freeze://scan?offer={offer_id}&kind={permanent|discovery}
 */
export function parseScanDeepLink(url: string): ScanDeepLink | null {
  const parsed = Linking.parse(url);
  if (parsed.hostname !== 'scan' && parsed.path !== 'scan') return null;

  const offerId = parsed.queryParams?.offer;
  const kind = parsed.queryParams?.kind;

  if (typeof offerId !== 'string' || typeof kind !== 'string') return null;
  if (kind !== OFFER_KINDS.PERMANENT && kind !== OFFER_KINDS.DISCOVERY) return null;

  return { offerId, kind };
}
