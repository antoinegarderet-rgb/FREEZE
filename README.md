# FREEZE — App mobile

Carte d'avantages pour les -30 ans à Paris. React Native (Expo) + Supabase + Stripe.

## Stack

- Expo (managed) + TypeScript strict
- @react-navigation (stack + bottom tabs)
- Supabase (Auth + Postgres + Storage + Realtime + Edge Functions)
- Stripe Checkout via navigateur (pas d'Apple IAP)
- react-native-maps (Paris)
- expo-camera + react-native-qrcode-svg (QR)

## Setup

```bash
npm install
cp .env.example .env   # renseigner les clés Supabase / PostHog
npm run start
```

## Supabase

Les migrations sont dans `supabase/migrations/`, à appliquer dans l'ordre :

1. `0001_schema.sql` — tables
2. `0002_rls.sql` — Row Level Security
3. `0003_triggers.sql` — triggers (compteurs, validation offres, solde affilié)

`supabase/seed.sql` contient des données de démo (3 users, 15 partenaires
parisiens, offres, scans, ventes d'affiliation).

```bash
supabase db reset   # applique migrations + seed sur l'instance locale
```

## Structure

```
src/
├── components/ui/          # Composants atomiques réutilisables
├── components/navigation/  # Stacks et tabs
├── screens/                # Écrans groupés par domaine
├── lib/                    # Supabase client, deep links, analytics
├── hooks/
├── contexts/                # AuthContext, ToastContext
├── types/                  # Types DB + navigation
└── constants/               # Design tokens, magic strings centralisées
supabase/
├── migrations/
├── functions/               # Edge Functions (Sprint 3+)
└── seed.sql
```

## État du build

**Sprint 1 — Fondations (livré) :**
- Setup Expo + TypeScript strict + ESLint
- Schéma Supabase complet + RLS + triggers + seed
- Auth : Welcome, Login, Signup (avec code parrain), EmailVerify,
  ForgotPassword, ResetPassword
- Navigation : Auth stack ↔ Main tabs selon session Supabase
- Deep link scheme `freeze://`

**À venir (Sprint 2+) :** liste/détail offres, carte, paiement Stripe, scan QR,
parrainage, espace partenaire, polish, beta.

Voir le brief produit complet pour le détail des sprints 2 à 8.
