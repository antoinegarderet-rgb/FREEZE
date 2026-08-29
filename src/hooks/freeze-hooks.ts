import { useMemo } from 'react';
import { OFFERS } from '@/data/offers';
import type { Offer, OfferCategory } from '@/data/offers';

interface UseOffersOptions {
  cat?: OfferCategory;
  search?: string;
}

interface UseOffersResult {
  offers: Offer[];
  total: number;
}

/**
 * useOffers — retourne les offres filtrées avec locationCount déjà dans les données.
 *
 * En production, ce hook ferait un join Supabase :
 *   .select(`*, partners!inner(id, name, logo_url, bg_color, is_active, category, partner_locations(count))`)
 *
 * Pour l'instant, les données mock dans src/data/offers.ts incluent locationCount directement.
 */
export function useOffers({ cat = 'all', search = '' }: UseOffersOptions = {}): UseOffersResult {
  const offers = useMemo(() => {
    return OFFERS.filter((o) => {
      const matchCat = cat === 'all' || o.cat === cat;
      const q = search.toLowerCase();
      const matchSearch = !q || o.name.toLowerCase().includes(q) || o.offer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [cat, search]);

  return { offers, total: offers.length };
}

export function useLocationLabel(locationCount: number | undefined): string {
  const count = locationCount ?? 1;
  if (count === 1) return '📍 1 établissement participant';
  return `📍 ${count} établissements participants`;
}
