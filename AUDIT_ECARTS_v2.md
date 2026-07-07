# AUDIT_ECARTS_v2.md — FREEZE App vs Claude Design (FREEZE_6.zip)

> Méthode : lecture des fichiers JSX du design source (`/tmp/design-v6/`) + lecture de chaque implémentation RN → comparaison élément par élément.
> Auteur : Claude (audit pur, aucun code modifié)
> Date : 2026-07-07

---

## Légende

| Symbole | Signification |
|---------|---------------|
| ✅ | Conforme au design |
| ⚠️ | Écart mineur / approximation acceptable |
| ❌ | Écart significatif — correction requise |
| 🚧 | Écran/composant absent de l'implémentation RN |

---

## 0. Système de design (tokens)

**Source design :** `freeze-components-v2.jsx` — objet `C` + structure de polices

| Jeton | Design source | `theme.ts` | Statut |
|-------|--------------|-----------|--------|
| bg | `#F4F6FF` | ✅ `#F4F6FF` | ✅ |
| s1 | `#FFFFFF` | ✅ | ✅ |
| s2 | `#EEF0FC` | ✅ | ✅ |
| s3 | `#E4E7F8` | ✅ | ✅ |
| navy | `#1A1D8F` | ✅ | ✅ |
| blue | `#2B52F0` | ✅ | ✅ |
| blueXL | `#EEF1FE` | ✅ | ✅ |
| green | `#00C46E` | ✅ | ✅ |
| greenBg | `#E7FAF1` | ✅ | ✅ |
| greenD | `#009A55` | ✅ | ✅ |
| red | `#E53E3E` | ✅ | ✅ |
| text | `#0B0D2A` | ✅ | ✅ |
| t2 | `#6167A0` | ✅ | ✅ |
| t3 | `#9BA1CB` | ✅ | ✅ |
| border | `rgba(26,29,143,0.09)` | ✅ | ✅ |
| borderM | `rgba(26,29,143,0.16)` | ✅ | ✅ |
| shadow | `0 2px 16px rgba(26,29,143,0.08)` | `shadows.card` ≈ ✅ | ✅ |
| `fonts.black` | `fontWeight:900` (CSS) | `PlusJakartaSans_800ExtraBold` | ⚠️ Plus Jakarta Sans n'a pas de 900 — 800 est le max. Acceptable. |

**Problème transversal — fontFamily :**
❌ Nombreux écrans utilisent `fontWeight: '900'` ou `fontWeight: '800'` inline au lieu de `fontFamily: fonts.extraBold`. Sur Android avec des polices custom, `fontWeight` n'a aucun effet ; seul `fontFamily` avec le bon nom de fonte fonctionne.

Fichiers concernés (non exhaustif) :
- `ProfilScreen.tsx` : `fontWeight: '900'` (greeting, statValue)
- `ParrainageScreen.tsx` : `fontWeight: '900'` (heroCode)
- `SettingsScreen.tsx` : `fontWeight: '700'`
- `HistoryScreen.tsx`, `SavingsScreen.tsx`, etc.

**Action corrective :** Remplacer tous les `fontWeight` inline par `fontFamily: fonts.<poids>` via une passe globale.

---

## 1. Navigation

**Source design :** onglets inférieurs visibles dans `freeze-app-shell.jsx` + icons `Ico.home/map/gift/person`

| Onglet | Design | Implémentation RN | Statut |
|--------|--------|-------------------|--------|
| Tab 1 | Offres (grid icon) | `OffresScreen` + grid icon | ✅ |
| Tab 2 | Carte / Map (pin icon) | `MapScreen` + pin icon | ✅ |
| Tab 3 | Parrainage (gift icon) | `ParrainageScreen` + gift icon | ✅ |
| Tab 4 | Profil (person icon) | `ProfilScreen` + person icon | ✅ |

❌ **`CarteScreen.tsx`** (`src/screens/home/CarteScreen.tsx`) existe dans le repo mais n'est plus câblé dans la navigation. C'est un écran orphelin. Il duplique partiellement ce que ProfilScreen fait. À supprimer ou à intégrer comme fullscreen overlay depuis ProfilScreen.

❌ **Onboarding 5 slides** — entièrement absent du projet RN (ni dans navigation, ni en fichier). Présent dans `freeze-screens-a-v2.jsx` (slides Bienvenue / Partenaires / Comment ça marche / Économies / Parrainage). Ce flow devrait s'afficher après inscription, avant OffresScreen.

✅ Navigation stack : Scanner / PostScan ne sont plus en `presentation: 'modal'`, ils utilisent `slide_from_right`. Conforme à la correction Sprint 1.

---

## 2. Composant FreezeCard

**Source design :** `freeze-components-v2.jsx` — `function FreezeCard({ name, small, expired })`

| Élément | Design | RN (`FreezeCard.tsx`) | Statut |
|---------|--------|----------------------|--------|
| Dimensions | 320×196px (large) / 190×118px (small) | ✅ identiques | ✅ |
| Gradient fond | `#1A1D8F → #2B3FD4 (45%) → #3B52E8 (135deg)` | ✅ `['#1A1D8F','#2B3FD4','#3B52E8']` | ✅ |
| Dot pattern | opacity 0.12, dot 1px, step 14px | ✅ identique | ✅ |
| Shimmer | CSS `shimmer 3s ease-in-out infinite` (full-card-width gradient, 30%→50%→70%) | ⚠️ bande 45%×cardW qui translate — effet similaire, légèrement différent en largeur | ⚠️ |
| Glow blob | bas-droit, 150px, rgba(59,82,232,0.35), blur 28px | ✅ position/couleur OK, RN `borderRadius:75` (cercle) sans blur (RN ne supporte pas CSS blur) | ⚠️ |
| FreezeLogo | height 32 white | ✅ | ✅ |
| Badge MEMBRE ACTIF | green + pulsing dot + text "MEMBRE ACTIF" | ✅ pulsing dot (scale 1→1.7) + solidDot + text | ✅ |
| Name box | white 97% opacity, borderRadius 12, centré, navy text, 19px | ✅ | ✅ |
| Clock live | bottom-right, monospace 11px, opacity 0.7 | ✅ | ✅ |
| Clock label | "Live · FREEZE" 9px opacity 0.5 | ✅ | ✅ |

**Bilan FreezeCard :** ✅ Conforme dans l'ensemble. Deux approximations acceptables (shimmer, blur blob).

---

## 3. C01 — WelcomeScreen

**Source design :** `freeze-screens-auth.jsx` — `WelcomeScreen`

Design : gradient fond `#0B0D2A → #1A1D8F → #2B52F0` (165deg), logo FreezeLogo white 62px, titre "La carte avantages des -30 ans", sous-titre, anneaux de logos partenaires, CTA "Créer mon compte" (gradient navy→blue) + "J'ai déjà un compte" (translucent border).

| Élément | Design | RN | Statut |
|---------|--------|-----|--------|
| Gradient | `165deg, #0B0D2A, #1A1D8F, #2B52F0` | `['#0E1166', navy, blue]` | ⚠️ couleur initiale légèrement différente (`#0E1166` vs `#0B0D2A`) |
| Logo | height 62 white | ✅ | ✅ |
| Titre | "La carte avantages des -30 ans" | ✅ | ✅ |
| Logos partenaires ring | images + overlapping | ✅ | ✅ |
| Glow blobs | top-right + bottom-left circles flou | ✅ présents (`glowTopRight`, `glowBottomLeft`) | ✅ |
| CTA primaire | gradient navy→blue "Créer mon compte" | ✅ | ✅ |
| CTA secondaire | "J'ai déjà un compte" | ✅ | ✅ |

**Bilan C01 :** ✅ Conforme.

---

## 4. C02 — LoginScreen

**Source design :** `freeze-screens-auth.jsx` — `LoginScreen`

Design : fond bg, back button, titre "Bon retour 👋", email + password fields avec show/hide, "Mot de passe oublié ?" link, CTA "Se connecter" gradient, lien "Pas encore de compte ?".

| Élément | Statut |
|---------|--------|
| Structure générale | ✅ |
| Champs email/password avec show/hide | ✅ présent |
| "Mot de passe oublié ?" | ✅ navigation ForgotPassword |
| Back button (circle 38px) | ⚠️ RN utilise `←` text, design utilise chevron SVG |
| fontFamily inline | ❌ utilise `fontWeight` (problème transversal) |

**Bilan C02 :** ✅ Globalement conforme, écarts mineurs.

---

## 5. C03 — SignupScreen

**Source design :** `freeze-screens-auth.jsx` — `SignupScreen`

Design : prénom, nom, email, password + age checkbox "Je certifie avoir moins de 30 ans", CTA gradient, mention "En créant un compte tu acceptes nos CGU et Politique de confidentialité".

| Élément | Statut |
|---------|--------|
| Champs prénom/nom/email/password | ✅ |
| Checkbox âge <30 ans | ✅ présent |
| CGU mention | ✅ |
| fontFamily inline | ❌ problème transversal |

**Bilan C03 :** ✅ Globalement conforme.

---

## 6. C04 — EmailVerifyScreen

**Source design :** `freeze-screens-auth.jsx` — `EmailVerifyScreen`

Design : icône email 80px circle (navy gradient), titre "Vérifie tes emails", texte "Un lien de vérification a été envoyé à {email}", 6 champs OTP, CTA "Confirmer le code", "Renvoyer le code" link.

| Élément | Statut |
|---------|--------|
| 6 champs OTP | ✅ présent |
| Email affiché | ✅ |
| Resend link | ✅ |

**Bilan C04 :** ✅ Conforme.

---

## 7. C05/C06 — ForgotPassword / ResetPassword

**Source design :** `freeze-screens-auth.jsx`

Design : C05 = email input + CTA "Envoyer le lien" + confirmation state avec icône enveloppe. C06 = 2 champs password + CTA.

| Écran | Statut |
|-------|--------|
| C05 ForgotPasswordScreen | ✅ conforme |
| C06 ResetPasswordScreen | ✅ conforme |

---

## 8. C09 — OffresScreen + OfferCard

**Source design :** `freeze-screens-a-v2.jsx` + `freeze-components-v2.jsx`

### OffresScreen

| Élément | Design | RN | Statut |
|---------|--------|-----|--------|
| Header : FreezeLogo + bell + search | FreezeLogo, bell icon, search icon | ✅ présent | ✅ |
| Category pills | `CATEGORIES` (all/resto/bars/sport/beauty/loisirs/shopping/online), pills colorés (couleur par catégorie active) | ✅ présent | ✅ |
| Bannière paywall dismissable | Amber ribbon "Tu regardes sans accès ! Débloque FREEZE 🔒" si non-premium | ❌ ABSENT | ❌ |
| Partner strip marquee | Logos défilant horizontalement | ✅ présent | ✅ |
| Grille 2 colonnes | OfferCards 2 colonnes avec `FlatList numColumns={2}` | ✅ | ✅ |
| Pill couleur active | Design: `background: cat.color` (couleur du badge de la catégorie) | ⚠️ RN: `colors.navy` pour toutes les catégories actives | ⚠️ |

### OfferCard (composant)

❌ **ÉCART MAJEUR — PartnerHero manquant**

Design (`freeze-components-v2.jsx`) :
```
Carte blanche → PartnerHero (fond dégradé couleur partenaire, hauteur 106px) en haut
→ Contenu blanc en dessous (nom, texte offre, saving pill, distance)
Tag pill + fav button positionnés sur le hero
tagColors = { Nouveau: blue, Populaire: green, Top: amber, Online: purple }
```

RN actuel (`OfferCard.tsx`) :
```
Entièrement blanc — PartnerLogo (56px) + tag pill en haut
Contenu (nom, offre, saving, distance) en dessous
TAG_COLORS = { Populaire: navy, Top: purple, Nouveau: green, Online: '#0891B2' }
```

| Élément | Design | RN | Statut |
|---------|--------|-----|--------|
| PartnerHero (gradient coloré 106px en haut) | ✅ présent | ❌ absent | ❌ |
| Tag couleurs | Nouveau=`#2B52F0`, Populaire=`#00C46E`, Top=`#F59E0B` | Populaire=navy, Top=purple, Nouveau=green | ❌ |
| Fav button | position absolute sur hero, bas-droit | ✅ présent mais en haut-droit sur zone logoArea | ⚠️ |
| Saving pill | `greenBg` background ✅ | ✅ | ✅ |

**Note :** L'utilisateur avait demandé verbalement "C09 white card design". Le design source montre clairement un hero coloré. Conflit entre instruction verbale et source de vérité. **En mode "copie fidèle du design", il faut restaurer le PartnerHero.**

---

## 9. C10 — OfferDetailScreen

**Source design :** `freeze-screens-a-v2.jsx` — `OfferDetailScreen`

Design : hero coloré (gradient partenaire, hauteur 220px) avec logo 80px + nom + tag + distance + back + fav. En dessous : saving card, offre card (texte + how-to), "Obtenir l'offre" CTA (bleu), section infos, section signalement.

| Élément | Design | RN | Statut |
|---------|--------|-----|--------|
| Hero coloré gradient | ✅ | ✅ `LinearGradient [offer.bg, offer.bg2]` | ✅ |
| Logo badge sur hero | ✅ | ✅ `PartnerLogo size=80` | ✅ |
| Nom partenaire sur hero | ✅ | ✅ | ✅ |
| Emoji catégorie chip | `🍔 Restaurant` blur pill top-left | ❌ absent | ❌ |
| Tag + distance | ✅ | ✅ | ✅ |
| Saving card | "~X€/visite" vert | ✅ présent | ✅ |
| CTA "Obtenir l'offre" | gradient navy→blue, pleine largeur | ✅ present | ✅ |
| Section "Signaler un problème" | lien discret en bas | ❌ absent | ❌ |
| Online: code promo | code `FREEZE20` copiable | ❌ vérifier | ⚠️ |

**Bilan C10 :** ⚠️ Majorité conforme. Manque emoji catégorie sur hero, section signalement.

---

## 10. C11 — MapScreen

**Source design :** `freeze-screens-b-v2.jsx` — `MapScreen` (utilise Leaflet en web)

Design web (Leaflet) : fond carte OpenStreetMap, pins colorés par catégorie, bottom sheet sur tap d'un pin (slide up 0.3s), filter chips overlay en haut (catégories), bouton bascule liste/carte.

RN : `react-native-maps` + web fallback liste.

| Élément | Design | RN | Statut |
|---------|--------|-----|--------|
| Carte géographique Paris | Leaflet (web) | `react-native-maps` (native) ✅ | ✅ |
| Pins colorés par catégorie | ✅ | ✅ `CAT_PIN_COLOR` | ✅ |
| Filter chips overlay | ✅ absolument positionnés en haut | ✅ | ✅ |
| Bottom sheet sur tap pin | `animation: slideUp 0.3s` | ✅ `Animated.spring` | ✅ |
| Web fallback | — | ✅ `MapScreen.web.tsx` liste scrollable | ✅ |
| Bouton liste/carte toggle | ✅ design | ✅ RN | ✅ |

**Bilan C11 :** ✅ Conforme dans l'esprit. Différence technologique acceptée (Leaflet → react-native-maps).

---

## 11. C12 — ScannerScreen

**Source design :** `freeze-screens-b-v2.jsx` — `ScannerScreen`

Design : fond `#0A0C14` (quasi-noir), viewfinder 260×260px avec coins animés, scan line animée (translateY loop), "Pointer vers le QR du partenaire" texte blanc centré, torch button en bas.

| Élément | Statut |
|---------|--------|
| Fond `#0A0C14` | ⚠️ à vérifier dans `ScannerScreen.tsx` |
| Viewfinder 260×260 avec coins | ⚠️ à vérifier |
| Scan line animée | ⚠️ à vérifier |

**Action :** Lire `ScannerScreen.tsx` et comparer avec le design lors du sprint de correction.

---

## 12. C13 — PostScanScreen

**Source design :** `freeze-screens-v3-1.jsx` — `PostScanScreen`

| Élément | Design | RN (`PostScanScreen.tsx`) | Statut |
|---------|--------|--------------------------|--------|
| Gradient fond | `165deg, navy→blue` | ✅ `['#1A1D8F','#2B52F0']` (angle différent) | ⚠️ |
| Dot pattern overlay | `opacity:0.08`, radial-gradient, `22px 22px` | ❌ ABSENT | ❌ |
| Glow blobs ambiance | 2 cercles flous (top-right + bottom-left) | ❌ ABSENT (RN ne supporte pas CSS blur facilement) | ❌ |
| Bouton × close | `40×40`, `borderRadius:13` (rounded rect), backdrop blur | ✅ présent / ⚠️ `borderRadius:18` (cercle) | ⚠️ |
| Check circle | `80×80`, fond blanc, check vert 44px | ✅ identique | ✅ |
| Animation check | pop spring `postScanPop` | ✅ `Animated.spring` | ✅ |
| "Scan validé" | `fontWeight:900`, 32px, white | ✅ `fonts.black, 32px` | ✅ |
| "chez {partner}" | `fontSize:16, opacity:0.7` | ✅ | ✅ |
| **"Montre ton écran au commerçant"** | Ligne bold blanche sous partner | ❌ ABSENT | ❌ |
| Offer glass card | `rgba(255,255,255,0.10)`, border `rgba(255,255,255,0.18)`, radius 20 | ✅ `rgba(255,255,255,0.10)`, radius 20, border 0.15 | ✅ |
| Live clock | `monospace, 56px, fontWeight:700, white` | ✅ `fontFamily:'monospace', fontSize:56` | ✅ |
| Dot pulsant vert + "Live · FREEZE" | Point vert `#00C46E` pulsant + label 11px | ❌ label sans point pulsant | ❌ |
| "OK 👍" button | `#fff` fond, navy text, 18px, borderRadius:16 | ✅ | ✅ |
| Variante `alreadyUsed` | ❌ texte RN + gradient différent | ✅ implémenté | ✅ |
| Variante `discovery` | Bannière amber | ✅ présent | ✅ |

**Bilan C13 :** ⚠️ Structure correcte. 3 corrections requises : dot pattern, texte "Montre ton écran", dot pulsant.

---

## 13. ProfilScreen (C en design)

**ATTENTION — 2 versions dans le design :**
- `freeze-screens-c-v2.jsx` → `ProfilScreen` (version avec CarteScreen intégrée, badges, historique inline)
- `freeze-screens-profile-v3.jsx` → `ProfilV3` (version simplifiée mais plus moderne)

**La version à implémenter est `ProfilV3`** (fichier `profile-v3`, composant le plus récent et complet).

### ProfilV3 (version premium `isPremium=true`)

| Élément | Design `ProfilV3` | RN `ProfilScreen.tsx` | Statut |
|---------|-------------------|----------------------|--------|
| Header "Salut Antoine 👋" | ✅ `fontWeight:900, 24px` | ✅ present | ✅ |
| Sous-titre "Membre Premium · depuis 4 mois" | ✅ `fontSize:12, t2` | ❌ ABSENT | ❌ |
| Gear settings button | 40×40, borderRadius 13, s1, border | ✅ proche (radius 20 vs 13) | ⚠️ |
| FreezeCard incliné | `rotateY(-4deg) rotateX(2deg)` (perspective 3D) | ⚠️ `rotate(-2deg)` (2D seul) | ⚠️ |
| Stats row 3 cases | 3 items grid : `127€/économisés` (greenD), `12/offres` (text), `5,1×/rentabilisée` (navy) | ⚠️ présent mais `12×` vs `5,1×`, couleurs inline | ⚠️ |
| Dynamic msg card | Vert gradient + 🎉 + "Ta carte est rentabilisée 5,1×" + ligne détail | ✅ greenMessage présent | ✅ |
| "Mes offres utilisées" avec 3 items inline | Card cliquable avec 3 lignes d'historique + "Voir tout →" | ❌ RN = bouton bloc sans items inline | ❌ |
| Settings list 4 items | favoris / parrainage / espace pro / paramètres | ❌ manque "Espace Pro" | ❌ |
| Scanner CTA sous card | Absent de ProfilV3 (c'est dans `c-v2.jsx` ProfilScreen) | ❌ absent dans les 2 | — |

### ProfilV3 (version FREE `isPremium=false`)

❌ **Non implémentée en RN.** La version free a : card grisée verrouillée + pitch navy gradient (CTA paywall) + menu simplifié. RN affiche toujours la carte active même sans abonnement.

**Bilan ProfilScreen :** ❌ Plusieurs écarts. Sous-titre manquant, historique inline manquant, Espace Pro manquant, version FREE non gérée.

---

## 14. ParrainageScreen

**Source design :** `freeze-screens-parrainage.jsx`

| Élément | Design | RN | Statut |
|---------|--------|-----|--------|
| Titre "Parrainage" + sous-titre `4€ TTC` | ✅ | ✅ | ✅ |
| Hero code card (gradient navy→blue) | ✅ | ✅ `LinearGradient` | ✅ |
| Code `ANTO42` monospace 36px letterspacing 6px | ✅ | ✅ | ✅ |
| 3 boutons (Copier / Partager / Mon QR) | ✅ | ✅ | ✅ |
| Stats row 3 cases (inscrits/validés/gagnés) | ✅ | ✅ | ✅ |
| **Solde card** (vert gradient, montant €, virement info) | ✅ `{solde}€ · Prochain virement le 5 juin` | ❌ ABSENT | ❌ |
| **RIB prompt** (amber si pas de RIB) | ✅ | ❌ ABSENT | ❌ |
| Filleuls avec filter chips | Chips `all/pending/validated/paid/cancelled` | ⚠️ tabs `tous/validés/en attente` (statuts différents, pas de `paid/cancelled`) | ⚠️ |
| FilleulRow : avatar initiale gradient navy, status pill, montant | ✅ | ⚠️ implémentation simplifiée | ⚠️ |
| "Comment ça marche" collapsible | ✅ avec lien conditions | ✅ présent (format différent) | ⚠️ |
| QR modal parrainage | ✅ SVG QR 13×13 + download | ⚠️ QR button présent, modal à vérifier | ⚠️ |

**Bilan Parrainage :** ❌ Solde card et RIB prompt manquants (bloquant pour le flux de paiement).

---

## 15. PayoutsHistoryScreen / PayoutDetailScreen / RIBFormScreen / ParrainageConditionsScreen

**Source design :** `freeze-screens-parrainage.jsx`

| Écran | RN | Statut |
|-------|-----|--------|
| PayoutsHistoryScreen | ✅ présent (`PayoutsHistoryScreen.tsx`) | ✅ |
| PayoutDetailScreen | ✅ présent | ✅ |
| RIBFormScreen | ✅ présent (`RIBFormScreen.tsx`) | ✅ |
| ParrainageConditionsScreen | ✅ présent | ✅ |

⚠️ Ces écrans existent en RN mais le niveau de fidélité vis-à-vis du design n'a pas été vérifié en détail. À auditer lors des sprints de correction.

---

## 16. PaywallScreen

**Source design :** `freeze-screens-paywall.jsx`

| Élément | Design | RN (`PaywallScreen.tsx`) | Statut |
|---------|--------|--------------------------|--------|
| Header : back (←) + titre "Débloquer FREEZE" + "Plus tard" | ✅ | ✅ | ✅ |
| Partner banner (post-scan) | Optionnel si `partner` param | ❌ non géré (PaywallScreen ne reçoit pas `partner`) | ❌ |
| Hero texte gradient | "Débloque toutes les offres FREEZE" gradient bleu | ✅ | ✅ |
| FreezeCard inclinée avec halo | `rotateZ(-6deg) rotateY(8deg)` + `radial-gradient` halo | ⚠️ RN : carte sans inclinaison 3D dans Paywall | ⚠️ |
| Plan annuel | 25€/an, badge "-17% LE PLUS CHOISI" | ✅ | ✅ |
| Plan mensuel | 2,50€/mois | ✅ | ✅ |
| Benefits | 4 items design vs 5 items RN (textes différents) | ⚠️ | ⚠️ |
| FAQ accordion | ✅ | ✅ | ✅ |
| CTA sticky bas | "Débloquer FREEZE — 25€/an" gradient | ✅ | ✅ |

**Bilan Paywall :** ⚠️ Conforme dans l'ensemble. Carte non inclinée, partner banner manquant.

---

## 17. SubscribedScreen

**Source design :** `freeze-screens-paywall.jsx` — `SubscribedScreen`

Design : gradient `165deg #0B0D2A → navy → blue`, dot pattern, glow vert, check circle animé pulsant (120px), "Bienvenue dans la communauté FREEZE !", FreezeCard preview, "Découvrir les offres →" blanc.

| Élément | Statut |
|---------|--------|
| Gradient fond | ⚠️ à vérifier |
| Check circle 120px pulsant | ⚠️ à vérifier |
| FreezeCard preview | ✅ présent |
| Bouton blanc → Tabs | ✅ présent |

**Action :** Lire `SubscribedScreen.tsx` et comparer lors du sprint.

---

## 18. SettingsScreen

**Source design :** `freeze-screens-profile-v3.jsx` — `SettingsScreen`

Design : Avatar block en haut (56×56 initiale gradient + nom + email + "Modifier" pill), puis groupes : Compte / Abonnement / Notifications (3 toggles) / Confidentialité / Aide / À propos, logout rouge en bas.

| Élément | Design | RN | Statut |
|---------|--------|-----|--------|
| Avatar block (initiale gradient, nom, email, "Modifier") | ✅ | ❌ ABSENT (RN commence directement par les sections) | ❌ |
| Groupe Compte | Modifier infos + Modifier mot de passe | ⚠️ RN a "Mes informations" + "Mon abonnement" (pas mot de passe) | ⚠️ |
| Groupe Abonnement | Plan + Annuler | ❌ ABSENT (dans Compte en RN) | ❌ |
| Groupe Notifications (3 toggles) | ✅ push / économies / renouvellement | ❌ ABSENT en RN | ❌ |
| Groupe Confidentialité | 3 items + supprimer compte | ⚠️ présent sous "Légal" | ⚠️ |
| Groupe Aide | FAQ + Contact | ✅ sous "Support" | ✅ |
| Groupe À propos | Version + CGU + Mentions | ✅ sous "Légal" | ✅ |
| Logout rouge en bas | bouton `redBg` | ❌ ABSENT (signOut existe mais pas de bouton visible dans Settings) | ❌ |

**Bilan SettingsScreen :** ❌ Avatar block, groupe Abonnement séparé, toggles Notifications, et bouton logout manquants.

---

## 19. SavingsScreen / HistoryScreen / FavorisScreen

**Source design :** `freeze-screens-profile-v3.jsx`

| Écran | RN | Écart notable |
|-------|-----|---------------|
| SavingsScreen | ✅ présent | ⚠️ Design a un graphe en barres (sparkline mini) + hero 127€ 64px — à vérifier en détail |
| HistoryScreen | ✅ présent | ⚠️ Design a 6 filter chips (Tout/Restos/Bars/Sport/Beauté/Loisirs) — RN a des tabs différents |
| FavorisScreen | ✅ présent | ⚠️ Design non trouvé dans les JSX — probablement similaire à HistoryScreen |

---

## 20. EspaceProScreen (Portail Partenaire)

**Source design :** `freeze-screens-c-v2.jsx` → `EspaceProScreen` (gateway) + `freeze-screens-pro.jsx` → PartnerDashboard + `freeze-screens-v3-1.jsx` → `PartnerOnboard3`

| Écran | RN | Statut |
|-------|-----|--------|
| EspaceProScreen (gateway depuis Profil) | 🚧 ABSENT | 🚧 |
| PartnerLoginScreen | 🚧 ABSENT | 🚧 |
| PartnerDashboard | 🚧 ABSENT | 🚧 |
| PartnerOnboard3 (3 étapes) | 🚧 ABSENT | 🚧 |
| PartnerEditOffer | 🚧 ABSENT | 🚧 |

**Le portail partenaire (P01–P08) est entièrement absent de l'implémentation RN.** Ce module représente ~5 écrans non triviaux. Il n'est pas bloquant pour le lancement utilisateur mais doit être planifié.

---

## 21. ReportScreen / ReportSentScreen

**Source design :** `freeze-screens-v3-1.jsx`

Ces deux écrans (signalement partenaire) sont **absents** de l'implémentation RN et de la navigation stack.

🚧 Navigation routes à ajouter : `Report`, `ReportSent`

---

## 22. Onboarding (5 slides)

**Source design :** `freeze-screens-a-v2.jsx` — carousel 5 slides avec Swiper (ou index), dot indicators, CTA "Commencer" sur la dernière.

🚧 **Entièrement absent** de l'implémentation RN. À insérer dans le flux post-inscription, avant OffresScreen.

---

## 23. Composants UI partagés

| Composant | Design | RN | Statut |
|-----------|--------|-----|--------|
| `FreezeLogo` | PNG `freeze-logo-v3.png` + filter blanc | ✅ | ✅ |
| `PartnerLogo` | fond blanc, logo img, fallback initiales | ✅ | ✅ |
| `CategoryPill` | couleur active = `cat.color` (par catégorie) | ⚠️ RN utilise `colors.navy` pour toutes | ⚠️ |
| `OfferCard` | PartnerHero + contenu | ❌ voir §8 | ❌ |
| `FreezeCard` | ✅ | ✅ | ✅ |
| `Toast` | pill positionnée top:64, arrondie, 3 variants | ❌ absent | 🚧 |
| `ScanSuccessSheet` | bottom sheet avec check + saving | ❌ absent (PostScan full-screen à la place) | — |
| `ScanErrorModal` | modal centré | ❌ absent | 🚧 |

---

## Récapitulatif par priorité

### P0 — Bloquant UX / fidélité critique

| # | Écart | Fichier concerné |
|---|-------|-----------------|
| 1 | **OfferCard : PartnerHero coloré manquant** | `src/components/ui/OfferCard.tsx` |
| 2 | **OfferCard : tag colors incorrects** (`Populaire=navy` → `Populaire=green`, `Top=purple` → `Top=amber`) | `src/components/ui/OfferCard.tsx` |
| 3 | **ProfilScreen : sous-titre "Membre Premium · depuis 4 mois" manquant** | `src/screens/profile/ProfilScreen.tsx` |
| 4 | **ProfilScreen : historique inline 3 items manquant** | `src/screens/profile/ProfilScreen.tsx` |
| 5 | **ProfilScreen : Espace Pro block manquant** | `src/screens/profile/ProfilScreen.tsx` |
| 6 | **ParrainageScreen : Solde card manquante** | `src/screens/parrainage/ParrainageScreen.tsx` |
| 7 | **ParrainageScreen : RIB prompt manquant** | `src/screens/parrainage/ParrainageScreen.tsx` |
| 8 | **SettingsScreen : Avatar block manquant** | `src/screens/settings/SettingsScreen.tsx` |
| 9 | **SettingsScreen : Toggles Notifications absents** | `src/screens/settings/SettingsScreen.tsx` |
| 10 | **SettingsScreen : Logout button absent** | `src/screens/settings/SettingsScreen.tsx` |

### P1 — Écarts visuels importants

| # | Écart |
|---|-------|
| 11 | PostScanScreen : dot pattern background manquant |
| 12 | PostScanScreen : "Montre ton écran au commerçant" manquant |
| 13 | PostScanScreen : dot pulsant vert dans "Live · FREEZE" manquant |
| 14 | ProfilScreen : version FREE non gérée (carte grisée + pitch paywall) |
| 15 | OffresScreen : bannière paywall dismissable absente (si non-premium) |
| 16 | CategoryPill : couleur active = couleur catégorie (pas toujours navy) |
| 17 | Paywall : FreezeCard non inclinée 3D, partner banner absent |

### P2 — Écrans entiers manquants

| # | Écran |
|---|-------|
| 18 | Onboarding 5 slides (post-signup) |
| 19 | EspaceProScreen (gateway depuis Profil) |
| 20 | P01-P08 Portail Partenaire complet |
| 21 | ReportScreen + ReportSentScreen |
| 22 | ScanErrorModal |
| 23 | Toast component global |

### P3 — Corrections transversales

| # | Écart |
|---|-------|
| 24 | **fontFamily inline** : remplacer tous les `fontWeight` par `fontFamily: fonts.<poids>` sur Android (toutes les screens) |
| 25 | `CarteScreen.tsx` orphelin à supprimer ou repurposer |
| 26 | Vérification détaillée de ScannerScreen (fond `#0A0C14`, viewfinder, scan line) |

---

## Actions correctives (ordre suggéré pour sprint)

1. **Sprint Police** — Remplacement global `fontWeight` → `fontFamily` (passe unique grep/replace)
2. **Sprint OfferCard** — Restaurer PartnerHero + corriger tag colors
3. **Sprint PostScan** — 3 corrections rapides (dot pattern, "Montre écran", dot pulsant)
4. **Sprint ProfilScreen** — Sous-titre, historique inline, Espace Pro block
5. **Sprint Settings** — Avatar block, toggles notifications, logout
6. **Sprint Parrainage** — Solde card, RIB prompt
7. **Sprint Onboarding** — 5 slides (nouveau écran)
8. **Sprint Signalement** — ReportScreen + ReportSentScreen
9. **Sprint Pro Portal** — P01-P08 (planification séparée)

---

*Fin de l'audit. Aucun code n'a été modifié dans ce document.*
