// Design tokens FREEZE v3 — source unique de vérité, ne pas modifier sans validation design
import { Platform, TextStyle } from 'react-native';

// ─── Palette ──────────────────────────────────────────────────────────────────
export const colors = {
  // Bleus signature
  navy:    '#1A1D8F',
  navyD:   '#12156A',
  blue:    '#2B52F0',
  blueL:   '#4D6EF5',
  blueXL:  '#EEF1FE',

  // Surfaces
  bg:      '#F4F6FF',
  s1:      '#FFFFFF',
  s2:      '#EEF0FC',
  s3:      '#E4E7F8',

  // Sémantiques
  green:   '#00C46E',
  greenBg: '#E7FAF1',
  greenD:  '#009A55',
  red:     '#E53E3E',
  redBg:   '#FEF2F2',
  amber:   '#F59E0B',
  amberBg: '#FFFBEB',
  purple:  '#7C3AED',

  // Texte
  text:    '#0B0D2A',
  t2:      '#6167A0',
  t3:      '#9BA1CB',

  // Bordures
  border:  'rgba(26,29,143,0.09)',
  borderM: 'rgba(26,29,143,0.16)',

  // Fixes
  white:   '#FFFFFF',
  card:    '#FFFFFF',
  overlay: 'rgba(11,13,42,0.5)',
} as const;

// ─── Typographie — Plus Jakarta Sans ─────────────────────────────────────────
// Noms de famille à passer dans fontFamily
export const fonts = {
  regular:    'PlusJakartaSans_400Regular',
  medium:     'PlusJakartaSans_500Medium',
  semiBold:   'PlusJakartaSans_600SemiBold',
  bold:       'PlusJakartaSans_700Bold',
  extraBold:  'PlusJakartaSans_800ExtraBold',
  black:      'PlusJakartaSans_800ExtraBold',
} as const;

// Styles typographiques nommés (à utiliser en StyleSheet)
export const textStyles = {
  displayXL: { fontFamily: fonts.black,     fontSize: 40, lineHeight: 46 } satisfies TextStyle,
  displayL:  { fontFamily: fonts.black,     fontSize: 30, lineHeight: 36 } satisfies TextStyle,
  title:     { fontFamily: fonts.extraBold, fontSize: 22, lineHeight: 28 } satisfies TextStyle,
  subtitle:  { fontFamily: fonts.extraBold, fontSize: 17, lineHeight: 22 } satisfies TextStyle,
  body:      { fontFamily: fonts.medium,    fontSize: 14, lineHeight: 20 } satisfies TextStyle,
  bodyBold:  { fontFamily: fonts.bold,      fontSize: 14, lineHeight: 20 } satisfies TextStyle,
  caption:   { fontFamily: fonts.semiBold,  fontSize: 11, lineHeight: 14 } satisfies TextStyle,
  label:     { fontFamily: fonts.bold,      fontSize: 12, lineHeight: 16, letterSpacing: 0.3 } satisfies TextStyle,
} as const;

// ─── Rayons ───────────────────────────────────────────────────────────────────
export const radii = {
  xs:   6,
  sm:   10,
  md:   16,
  lg:   24,
  card: 28,
  pill: 999,
} as const;

// ─── Ombres ───────────────────────────────────────────────────────────────────
export const shadows = {
  card: Platform.select({
    ios: {
      shadowColor:   '#0B0D2A',
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius:  16,
    },
    android: { elevation: 4 },
  }),
  strong: Platform.select({
    ios: {
      shadowColor:   '#0B0D2A',
      shadowOffset:  { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius:  32,
    },
    android: { elevation: 12 },
  }),
  navy: Platform.select({
    ios: {
      shadowColor:   '#1A1D8F',
      shadowOffset:  { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius:  24,
    },
    android: { elevation: 10 },
  }),
} as const;

// ─── Spacing (multiples de 4) ────────────────────────────────────────────────
export const spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  xxxl: 32,
} as const;
