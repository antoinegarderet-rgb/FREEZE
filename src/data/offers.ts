export type OfferCategory = 'all' | 'resto' | 'bars' | 'sport' | 'beauty' | 'loisirs' | 'shopping' | 'online';

export interface Category {
  id: OfferCategory;
  label: string;
  emoji: string;
  color: string;
}

export interface Offer {
  id: number;
  name: string;
  cat: OfferCategory;
  offer: string;
  saving: string;
  distance: string | null;
  tag: 'Populaire' | 'Top' | 'Nouveau' | 'Online' | null;
  bg: string;
  bg2: string;
  initial: string;
  emoji: string;
  code?: string;
  address?: string;
  logo: number | null;
  locationCount?: number;
}

export const CATEGORIES: Category[] = [
  { id: 'all',      label: 'Tout',     emoji: '⚡', color: '#1A1D8F' },
  { id: 'resto',    label: 'Restos',   emoji: '🍔', color: '#DA291C' },
  { id: 'bars',     label: 'Bars',     emoji: '🍸', color: '#7C3AED' },
  { id: 'sport',    label: 'Sport',    emoji: '💪', color: '#059669' },
  { id: 'beauty',   label: 'Beauté',   emoji: '✨', color: '#DB2777' },
  { id: 'loisirs',  label: 'Loisirs',  emoji: '🎭', color: '#D97706' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️', color: '#0891B2' },
  { id: 'online',   label: 'Online',   emoji: '🌐', color: '#7C3AED' },
];

export const OFFERS: Offer[] = [
  { id: 1,  name: "McDonald's",          cat: 'resto',    offer: '-20% sur ta commande',               saving: '~3€/visite',  distance: '250m',   tag: 'Populaire', bg: '#DA291C', bg2: '#B71C1C', initial: 'M',    emoji: '🍔', logo: require('../../assets/partners/mcdonalds.png'),    locationCount: 12 },
  { id: 2,  name: 'Burger King',         cat: 'resto',    offer: '-15% sur tout le menu',              saving: '~4€/visite',  distance: '400m',   tag: 'Top',       bg: '#E8640A', bg2: '#C2500A', initial: 'BK',   emoji: '🍔', logo: require('../../assets/partners/burger-king.png'),  locationCount: 8  },
  { id: 3,  name: 'Subway',              cat: 'resto',    offer: '1 cookie offert pour toute commande',saving: '~2€',         distance: '600m',   tag: null,        bg: '#009A44', bg2: '#007A36', initial: 'SUB',  emoji: '🥖', logo: require('../../assets/partners/subway.png'),       locationCount: 15 },
  { id: 4,  name: "O'Tacos",             cat: 'resto',    offer: '-10% sur ta commande',               saving: '~3€',         distance: '350m',   tag: 'Populaire', bg: '#FF6B00', bg2: '#CC5500', initial: 'OT',   emoji: '🌮', logo: require('../../assets/partners/otacos.png'),       locationCount: 6  },
  { id: 5,  name: 'Chicken Street',      cat: 'resto',    offer: '-15% sur tout le menu',              saving: '~4€',         distance: '500m',   tag: 'Nouveau',   bg: '#1A1A1A', bg2: '#000000', initial: 'CS',   emoji: '🍗', logo: null,                                              locationCount: 3  },
  { id: 6,  name: 'Yogurt Factory',      cat: 'resto',    offer: '1 topping offert',                   saving: '~2€',         distance: '300m',   tag: null,        bg: '#E31E24', bg2: '#B71C1C', initial: 'YF',   emoji: '🍦', logo: null,                                              locationCount: 2  },
  { id: 7,  name: 'Jour',                cat: 'resto',    offer: '-15% salades & bowls',               saving: '~4€',         distance: '450m',   tag: 'Populaire', bg: '#0A4A2E', bg2: '#063320', initial: 'J',    emoji: '🥗', logo: null,                                              locationCount: 4  },
  { id: 8,  name: 'Matsuri',             cat: 'resto',    offer: '-15% sushis & rolls',                saving: '~5€',         distance: '900m',   tag: null,        bg: '#111111', bg2: '#000000', initial: 'M',    emoji: '🍣', logo: require('../../assets/partners/matsuri.png'),      locationCount: 5  },
  { id: 9,  name: 'Food Tea',            cat: 'resto',    offer: '1 boisson offerte dès 8€',           saving: '~4€',         distance: '300m',   tag: null,        bg: '#064E3B', bg2: '#043728', initial: 'FT',   emoji: '🧋', logo: require('../../assets/partners/food-tea.png'),     locationCount: 1  },
  { id: 10, name: 'La Piadineria',       cat: 'resto',    offer: '-10% sur tout',                      saving: '~3€',         distance: '700m',   tag: null,        bg: '#8B1A1A', bg2: '#5C1010', initial: 'LP',   emoji: '🫓', logo: null,                                              locationCount: 3  },
  { id: 11, name: 'Bagelcorner',         cat: 'resto',    offer: '-15% sur tous les bagels',           saving: '~3€',         distance: '550m',   tag: 'Nouveau',   bg: '#111111', bg2: '#000000', initial: 'BC',   emoji: '🥯', logo: require('../../assets/partners/bagelcorner.png'),  locationCount: 7  },
  { id: 12, name: 'Yoze Studio',         cat: 'beauty',   offer: '-25% sur tous les soins',            saving: '~20€',        distance: '1.2km',  tag: 'Populaire', bg: '#5B21F0', bg2: '#4A1ACA', initial: 'Y',    emoji: '💅', logo: require('../../assets/partners/yoze.png'),         locationCount: 2  },
  { id: 13, name: 'Beauty Success',      cat: 'beauty',   offer: '-20% sur tous les soins',            saving: '~15€',        distance: '800m',   tag: 'Populaire', bg: '#DB2777', bg2: '#BE185D', initial: 'BS',   emoji: '✨', logo: require('../../assets/partners/beauty-success.png'), locationCount: 9 },
  { id: 14, name: 'Point Soleil',        cat: 'beauty',   offer: '-20% sur les séances UV',            saving: '~8€',         distance: '1.1km',  tag: null,        bg: '#3E3022', bg2: '#2A2015', initial: 'PS',   emoji: '☀️', logo: null,                                              locationCount: 4  },
  { id: 15, name: 'Cercles de la Forme', cat: 'sport',    offer: '-30% abonnement mensuel',            saving: '~15€/mois',   distance: '600m',   tag: 'Top',       bg: '#D81B60', bg2: '#AD1457', initial: 'CF',   emoji: '💪', logo: require('../../assets/partners/cercles-forme.png'), locationCount: 3  },
  { id: 16, name: 'Disneyland Paris',    cat: 'loisirs',  offer: '-10% sur les billets',               saving: '~10€',        distance: '45 min', tag: 'Top',       bg: '#1D4ED8', bg2: '#1E3A8A', initial: 'DP',   emoji: '🏰', logo: require('../../assets/partners/disneyland.png'),   locationCount: 1  },
  { id: 17, name: 'Majestic Passy',      cat: 'loisirs',  offer: '-20% sur les séances',               saving: '~5€',         distance: '1.4km',  tag: null,        bg: '#1A1A1A', bg2: '#000000', initial: 'MP',   emoji: '🎬', logo: null,                                              locationCount: 1  },
  { id: 18, name: 'Student Break',       cat: 'loisirs',  offer: '-15% sur toutes les activités',      saving: '~8€',         distance: '800m',   tag: 'Nouveau',   bg: '#1565C0', bg2: '#0D47A1', initial: 'SB',   emoji: '🎯', logo: null,                                              locationCount: 2  },
  { id: 19, name: 'Lecercle',            cat: 'loisirs',  offer: '-10% sur les séances',               saving: '~5€',         distance: '2km',    tag: null,        bg: '#1A1A1A', bg2: '#000000', initial: 'LC',   emoji: '🎭', logo: require('../../assets/partners/lecercle.png'),     locationCount: 1  },
  { id: 20, name: 'Les 2 Alpes',         cat: 'loisirs',  offer: '-15% sur les forfaits ski',          saving: '~20€',        distance: '5h',     tag: 'Top',       bg: '#D32F2F', bg2: '#B71C1C', initial: '2A',   emoji: '⛷️', logo: null,                                              locationCount: 1  },
  { id: 21, name: 'Falstaff',            cat: 'bars',     offer: 'Happy hour prolongé de 1h',          saving: '~8€/soirée',  distance: '700m',   tag: null,        bg: '#1A3A5C', bg2: '#0F2440', initial: 'F',    emoji: '🍺', logo: require('../../assets/partners/falstaff.png'),     locationCount: 1  },
  { id: 22, name: 'Côme',               cat: 'bars',     offer: '1 verre offert pour 2 achetés',      saving: '~7€',         distance: '900m',   tag: 'Nouveau',   bg: '#3B3460', bg2: '#252040', initial: 'C',    emoji: '🍷', logo: require('../../assets/partners/come.png'),         locationCount: 1  },
  { id: 23, name: 'Smile World',         cat: 'shopping', offer: '-15% sur tout',                      saving: '~12€',        distance: '1.5km',  tag: null,        bg: '#E8A000', bg2: '#C47A00', initial: 'SW',   emoji: '🛍️', logo: null,                                              locationCount: 2  },
  { id: 24, name: 'ASOS',               cat: 'online',   offer: '-20% sur tout le site',              saving: '~15€',        distance: null,     tag: 'Online',    bg: '#111827', bg2: '#030712', initial: 'ASOS', emoji: '👗', code: 'FREEZE20', logo: null },
  { id: 25, name: 'Gymshark',           cat: 'online',   offer: '-15% sur tout le site',              saving: '~18€',        distance: null,     tag: 'Online',    bg: '#18181B', bg2: '#09090B', initial: 'GS',   emoji: '🏋️', code: 'FREEZE15', logo: null },
];
