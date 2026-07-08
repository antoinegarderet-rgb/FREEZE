export type MapPartnerCat = 'resto' | 'bars' | 'sport' | 'beauty' | 'loisirs' | 'shopping';

export interface MapPartner {
  id: number;
  name: string;
  cat: MapPartnerCat;
  lat: number;
  lng: number;
  offer: string;
  saving: string;
  dist: string;
  bg: string;
  initial: string;
  tag: string | null;
}

export const MAP_PARTNERS: MapPartner[] = [
  { id: 1,  name: "McDonald's",     cat: 'resto',   lat: 48.8726, lng: 2.3021, offer: '-20% sur ta commande',         saving: '~3€',  dist: '250m',   bg: '#DA291C', initial: 'M',   tag: 'Populaire' },
  { id: 2,  name: 'Burger King',    cat: 'resto',   lat: 48.8708, lng: 2.3308, offer: '-15% sur tout le menu',        saving: '~4€',  dist: '400m',   bg: '#E8640A', initial: 'BK',  tag: 'Top' },
  { id: 3,  name: 'Theory Bar',     cat: 'bars',    lat: 48.8655, lng: 2.3460, offer: '1 cocktail acheté = 1 offert', saving: '~10€', dist: '500m',   bg: '#4C1D95', initial: 'T',   tag: 'Nouveau' },
  { id: 4,  name: "O'Sullivan's",   cat: 'bars',    lat: 48.8603, lng: 2.3390, offer: 'Happy hour prolongé de 1h',    saving: '~8€',  dist: '700m',   bg: '#1E40AF', initial: 'OS',  tag: null },
  { id: 5,  name: 'Swedish Fit',    cat: 'sport',   lat: 48.8480, lng: 2.3260, offer: '-30% abonnement mensuel',      saving: '~15€', dist: '600m',   bg: '#059669', initial: 'SF',  tag: 'Top' },
  { id: 6,  name: 'Subway',         cat: 'resto',   lat: 48.8680, lng: 2.3550, offer: '1 cookie offert',              saving: '~2€',  dist: '600m',   bg: '#009A44', initial: 'SUB', tag: null },
  { id: 7,  name: "O'Tacos",        cat: 'resto',   lat: 48.8740, lng: 2.3280, offer: '-10% sur ta commande',         saving: '~3€',  dist: '350m',   bg: '#FF6B00', initial: 'OT',  tag: 'Populaire' },
  { id: 8,  name: 'Team Break',     cat: 'loisirs', lat: 48.8534, lng: 2.3200, offer: '-15% sur les séances',         saving: '~8€',  dist: '1.2km',  bg: '#DC2626', initial: 'TB',  tag: 'Nouveau' },
  { id: 9,  name: 'Beauty Success', cat: 'beauty',  lat: 48.8620, lng: 2.3100, offer: '-20% sur tous les soins',      saving: '~15€', dist: '800m',   bg: '#DB2777', initial: 'BS',  tag: 'Populaire' },
  { id: 10, name: 'Jour',           cat: 'resto',   lat: 48.8590, lng: 2.3470, offer: '-15% salades & bowls',         saving: '~4€',  dist: '450m',   bg: '#16A34A', initial: 'J',   tag: null },
  { id: 11, name: 'Disneyland',     cat: 'loisirs', lat: 48.8672, lng: 2.7833, offer: '-10% billets entrée',          saving: '~10€', dist: '45 min', bg: '#1D4ED8', initial: 'DP',  tag: 'Top' },
];
