# AUDIT ÉCARTS — FREEZE v6
> Généré le 2026-07-06. Format : ✓ = conforme, ✗ = écart à corriger, ⚠ = à clarifier.

---

## C01 · WelcomeScreen (auth/WelcomeScreen.tsx)
- ✓ Gradient fond `#0E1166 → navy → blue`
- ✓ Logo FREEZE blanc centré
- ✓ Titre "La carte avantages des -30 ans" avec accent couleur
- ✗ `fontWeight` inline partout au lieu de `fontFamily: fonts.xxx` — doit utiliser les tokens du thème
- ✗ Anneau des logos partenaires : actuellement scrollview statique, doit être un carousel animé ou ring tournant (selon C01 du design)
- ✗ Bouton "Je crée mon compte" : fond blanc, texte navy — vérifier radius 16px et height 56px
- ✗ Bouton "J'ai déjà un compte" : lien texte simple, pas de fond — à vérifier

## C02 · LoginScreen (auth/LoginScreen.tsx)
- ✓ Fond `colors.bg`, formulaire scrollable
- ✓ Titre "Salut, content de te revoir 👋"
- ✓ Champs email + password avec icône
- ✓ Lien "Mot de passe oublié ?"
- ✗ `fontWeight` inline partout — doit utiliser `fontFamily: fonts.extraBold / fonts.medium`
- ✗ Champs input : manque le composant `InputField` réutilisable (border-radius, focus state, shadow subtile)
- ✗ Bouton submit : fond `colors.navy`, height 56px, radius 16px — à vérifier dimensions exactes
- ✗ Pas de lien vers C03 depuis le bas ("Pas encore de compte ? S'inscrire")

## C03 · SignupScreen (auth/SignupScreen.tsx)
- ✓ Fond `colors.bg`, formulaire scrollable
- ✓ Champs prénom, nom, email, téléphone, date de naissance
- ✗ `fontWeight` inline — doit utiliser tokens
- ✗ Champ date de naissance : actuellement TextInput libre, devrait être un date picker ou format mask
- ✗ Manque la case à cocher CGU avec lien vers le doc légal
- ✗ Manque le texte intro "Rejoins les X membres..." avec le chiffre en accent navy

## C04 · EmailVerifyScreen (auth/EmailVerifyScreen.tsx)
- ✓ Icône 📧 dans cercle
- ✓ Titre "Vérifie ton email"
- ✓ Email affiché en gras dans la description
- ✓ Bouton "Renvoyer l'email"
- ✓ Lien "Me connecter"
- ✗ `fontWeight` inline — doit utiliser tokens
- ✗ Fond blanc (`colors.bg`) au lieu du gradient léger bleu attendu (à vérifier dans design)

## C05 · ForgotPasswordScreen (auth/ForgotPasswordScreen.tsx)
- ✓ Champ email
- ✓ Bouton submit
- ✓ Lien retour login
- ✗ `fontWeight` inline — tokens manquants
- ✗ Manque le retour de succès : "Email envoyé !" avec état visuel distinct après submit

## C06 · ResetPasswordScreen (auth/ResetPasswordScreen.tsx)
- ✓ Champ nouveau mot de passe
- ✓ Jauge de force du mot de passe (3 barres colorées)
- ✗ `fontWeight` inline — tokens manquants
- ✗ Bouton "Confirmer" : vérifier qu'il n'est actif que si password valide (longueur ≥ 8)

## C07 · PaywallScreen (paywall/PaywallScreen.tsx)
- ✓ Hero gradient navy → navyD → `#000832`
- ✓ FreezeCard affichée dans le hero
- ✓ Sélecteur plan Annuel / Mensuel
- ✓ Badge "-17%" sur le plan annuel
- ✓ Liste des avantages avec icônes
- ✓ FAQ accordéon
- ✗ `fontWeight` inline — tokens manquants
- ✗ Prix "25€" et "2,50€" : taille 36px+ en design v6, actuellement trop petit
- ✗ Bouton CTA "Je m'abonne" : doit être sticky en bas de l'écran (position fixe), pas dans le scroll
- ✗ Manque badge "⚡ Le plus populaire" mis en avant sur la carte annuelle
- ✗ Lien "Voir les conditions" sous les plans absent

## C08 · SubscribedScreen (paywall/SubscribedScreen.tsx)
- ✓ Gradient navy fond
- ✓ FreezeCard affichée
- ✓ Stats (partenaires, économie, parrainage)
- ✓ CTA "Découvrir les offres 🚀"
- ✗ `fontWeight` inline — tokens manquants
- ✗ Titre "Bienvenue dans FREEZE !" : doit être 32px noir, actuellement 28px
- ✗ Animation d'entrée manquante : les éléments devraient entrer avec un `FadeIn` + `SlideUp`

## C09 · OffresScreen (home/OffresScreen.tsx)
- ✓ **CORRIGÉ** : Header logo + pill "Actif" vert + bouton recherche
- ✓ **CORRIGÉ** : Cards fond blanc avec OfferCard redesigné
- ✓ Chips filtres par catégorie
- ✓ Marquee logos partenaires
- ✗ `fontWeight` inline dans OffresScreen — tokens manquants
- ✗ Manque le **bandeau paywall** pour les utilisateurs free : ribbon "🔒 Premium" sur les cards verrouillées + CTA "Débloque toutes les offres" en sticky bas
- ✗ Le nombre "25 partenaires" est statique hardcodé — doit être dynamique depuis `filtered.length`
  (→ DÉJÀ CORRECT, c'est `filtered.length` — ✓)
- ✗ Manque le scanner floating action button (FAB) "Scanner" en bas à droite qui navigue vers C12

## C10 · OfferDetailScreen (home/OfferDetailScreen.tsx)
- ✓ Hero avec logo partenaire + nom + tag + distance
- ✓ Card "L'offre FREEZE" avec emoji + texte offre
- ✓ Code promo pour offres online
- ✓ Bouton "Scanner cette offre"
- ✗ Hero utilise `LinearGradient` avec les couleurs brutes du partenaire (bg/bg2) — le design v6 utilise un hero fond blanc avec juste le logo dans un cercle coloré, pas un gradient plein écran
- ✗ `fontWeight` inline — tokens manquants
- ✗ Carte des conditions manque les horaires d'ouverture et l'adresse complète
- ✗ Manque le bouton "Mettre en favori" dans le header (cœur en haut à droite)
  (→ `isFav` state existe mais l'icône cœur est peut-être dans le header ? à vérifier)

## C11 · MapScreen (home/MapScreen.tsx)
- ✓ **CORRIGÉ** : `react-native-maps` plein écran
- ✓ **CORRIGÉ** : Centré Paris `(48.8566, 2.3522)`
- ✓ **CORRIGÉ** : Pins colorés par catégorie
- ✓ **CORRIGÉ** : Bottom sheet au tap sur pin avec CTA "Voir l'offre"
- ✓ **CORRIGÉ** : Filtres chips en overlay + toggle Liste/Carte
- ✗ Coordonnées des partenaires sont approximatives et hardcodées — devront venir de la base (OK pour v0)
- ✗ Bottom sheet non dismissable au swipe vers le bas (uniquement via tap sur la carte) — à améliorer

## C12 · ScannerScreen (scanner/ScannerScreen.tsx)
- ✓ Caméra plein écran `CameraView`
- ✓ Overlay sombre avec fenêtre de scan
- ✓ Coins de cadrage blancs (SVG)
- ✓ Ligne de scan animée (translateY loop)
- ✓ Bouton back
- ✗ Fond de l'écran sous la caméra : noir — design v6 montre un fond `#0B0D2A` (navy très sombre)
- ✗ Manque le texte d'instruction sous le cadre : "Place le QR code dans le cadre"
- ✗ Manque l'icône de torche (flash) en bas pour activer la lampe
- ✗ `scanContext` n'est pas utilisé visuellement : en mode `discovery`, le titre devrait être "Ton 1er scan est offert 🎁"

## C13 · PostScanScreen (scanner/PostScanScreen.tsx)
- ✓ **CORRIGÉ** : Gradient `#1A1D8F → #2B52F0` fond
- ✓ **CORRIGÉ** : Check animé bounce dans cercle blanc
- ✓ **CORRIGÉ** : Titre "Scan validé"
- ✓ **CORRIGÉ** : Sous-titre "chez **McDonald's**" en gras
- ✓ **CORRIGÉ** : Card glassmorphism "OFFRE DISPONIBLE"
- ✓ **CORRIGÉ** : Horloge live 56px monospace
- ✓ **CORRIGÉ** : "Live · FREEZE" sous l'horloge
- ✓ **CORRIGÉ** : Bouton "OK 👍" blanc/navy
- ✓ **CORRIGÉ** : Variante `discovery` avec bandeau ambre
- ✓ **CORRIGÉ** : Variante `alreadyUsed` avec croix rouge
- ✗ Bouton close (×) en haut à droite : actuellement `navigation.goBack()` — devrait naviguer vers Tabs (pas back car c'est le dernier écran du flow)

## C14-C17 · Écrans intermédiaires (non identifiés dans le code)
- ✗ **MANQUANTS** : Si le design v6 contient des écrans entre C13 et C18 (ex: onboarding post-inscription, écran de vérification d'âge, écran de bienvenue premium), ils ne sont pas implémentés. À confirmer avec le design.

## C18 · ParrainageScreen (parrainage/ParrainageScreen.tsx)
- ✓ Header "Parrainage" + sous-titre
- ✓ Card hero gradient navy avec code parrain
- ✓ Boutons Copier / Partager / QR dans la hero card
- ✓ Stats (inscrits, validés, gagnés)
- ✓ Liste des filleuls avec statuts
- ✓ Section "Comment ça marche" accordéon
- ✗ `fontWeight` inline — tokens manquants
- ✗ Lien vers `PayoutsHistory` absent depuis l'écran principal (manque un bouton "Voir mes versements")
- ✗ Le bouton "Retirer mes gains" (vers RIBForm) n'est visible que si solde > 0 — logique non implémentée
- ✗ Bouton QR dans la hero card : `▣` emoji au lieu d'une vraie icône SVG QR

## C19 · PayoutsHistoryScreen (parrainage/PayoutsHistoryScreen.tsx)
- ✓ Liste des versements avec montant, date, nb filleuls, statut
- ✓ Navigation vers PayoutDetail
- ✗ `fontWeight` inline — tokens manquants
- ✗ Manque le total cumulé en haut ("Total versé : 24€")

## C20 · RIBFormScreen (parrainage/RIBFormScreen.tsx)
- ✓ Champs IBAN, BIC, titulaire
- ✓ Bouton désactivé si champs vides
- ✗ `fontWeight` inline — tokens manquants
- ✗ Manque la validation format IBAN (commence par "FR", longueur)
- ✗ Manque l'icône cadenas + texte "Connexion sécurisée" en bas de formulaire (rassurance)

## C21 · ProfilScreen (profile/ProfilScreen.tsx)
- ✓ Header "Salut {prénom} 👋" + bouton settings
- ✓ FreezeCard avec nom réel
- ✓ Stats (économisés, offres utilisées, multiplicateur)
- ✓ Message vert "Ta carte est rentabilisée 12×"
- ✓ Blocs raccourcis (Historique, Économies, Favoris)
- ✗ `fontWeight` inline — tokens manquants
- ✗ Stats hardcodées (127€, 38 offres, 12×) — devront venir de la base
- ✗ Manque le bandeau **"FREE"** pour les utilisateurs non-abonnés : affiche CTA vers Paywall à la place de la FreezeCard active
- ✗ La FreezeCard est légèrement inclinée (`cardTilt`) — à vérifier si le design v6 montre une rotation ou une présentation flat

## C22 · SavingsScreen (profile/SavingsScreen.tsx)
- ✓ Total économisé mis en avant
- ✓ Stats nb offres + multiplicateur
- ✓ Liste historique
- ✗ `fontWeight` inline — tokens manquants
- ✗ Données hardcodées (127€, 38 offres) — OK pour MVP mais à noter

## C23 · HistoryScreen (profile/HistoryScreen.tsx)
- ✓ Liste des offres utilisées avec date + économie
- ✗ `fontWeight` inline — tokens manquants
- ✗ Données hardcodées — OK pour MVP

## C24 · FavorisScreen (profile/FavorisScreen.tsx)
- ✓ Grille d'offres (OfferCard blanches — CORRIGÉ)
- ✓ État vide avec message
- ✗ `fontWeight` inline — tokens manquants
- ✗ Les favoris ne persistent pas (state local) — devra utiliser Supabase

## C25 · SettingsScreen (settings/SettingsScreen.tsx)
- ✓ Sections groupées (Compte, Légal, Support)
- ✓ Navigation vers tous les sous-écrans
- ✓ Bouton déconnexion
- ✗ `fontWeight` inline — tokens manquants
- ✗ Manque l'avatar/initiales de l'utilisateur en haut avec nom + email
- ✗ Manque le numéro de version de l'app en bas (ex: "FREEZE v1.0.0")

## C26 · AccountInfoScreen (settings/AccountInfoScreen.tsx)
- ✓ Liste des champs (prénom, nom, email, date de naissance)
- ✗ `profile?.phone` utilisé pour le champ "Email" — bug : doit utiliser `profile?.email` ou le champ correct du schema Supabase
- ✗ `fontWeight` inline — tokens manquants
- ✗ Manque le bouton "Modifier" qui ouvre un formulaire d'édition ou renvoie vers le support

## C27 · SubscriptionScreen (settings/SubscriptionScreen.tsx)
- ✓ Chip "Abonnement actif" vert
- ✓ Nom plan + prix
- ✓ Date de renouvellement + mode paiement
- ✓ Bouton "Annuler"
- ✗ `fontWeight` inline — tokens manquants
- ✗ Données hardcodées ("31 août 2025", "Carte bancaire") — devront venir de Stripe

## C28 · FAQScreen (settings/FAQScreen.tsx)
- (Non lu en détail mais vraisemblablement une liste accordéon)
- ✗ `fontWeight` inline probable — tokens manquants
- ✗ À vérifier : questions/réponses calées sur le design v6

## C29 · ContactScreen (settings/ContactScreen.tsx)
- ✗ `fontWeight` inline probable
- ✗ À vérifier : formulaire vs lien email direct

## C30 · MyDataScreen (settings/MyDataScreen.tsx)
- ✗ `fontWeight` inline probable
- ✗ À vérifier : bouton "Supprimer mon compte" avec confirmation modal

## C31 · LegalDocScreen (settings/LegalDocScreen.tsx)
- ✗ À vérifier : rendu du texte légal, scroll, header avec titre dynamique

## C32-C34 · Autres écrans client (non identifiés)
- ✗ **INCERTAIN** : Si le design v6 contient des écrans C32-C34 (ex: notifications, plan d'upgrade, carte expirée), ils ne sont pas implémentés. À confirmer.

---

## P01-P08 · Portail Partenaire — ENTIÈREMENT MANQUANT

⚠️ **AUCUN des 8 écrans partenaires n'existe dans le code.**

- ✗ **P01** · Login partenaire (email + mot de passe, branding différent)
- ✗ **P02** · Dashboard partenaire (stats scans du jour/mois, CA estimé)
- ✗ **P03** · Scanner QR (lecture du QR code de l'utilisateur, validation du scan)
- ✗ **P04** · Confirmation scan (résultat : validé / déjà utilisé / expiré)
- ✗ **P05** · Historique des scans (liste des passages avec date/heure)
- ✗ **P06** · Poster digital (génération PDF A4/A3 avec QR code du partenaire)
- ✗ **P07** · Partage poster (bottom sheet choix : télécharger / envoyer par email)
- ✗ **P08** · Contrat partenaire (affichage PDF du contrat + signature électronique simplifiée)

---

## Problème transversal #1 — fontFamily non utilisé

**Impact : tous les écrans (C01-C34)**

Tous les fichiers existants utilisent `fontWeight: '800'` / `fontWeight: '700'` au lieu de `fontFamily: fonts.extraBold` / `fontFamily: fonts.bold` depuis `@/constants/theme`. Sur Android, `fontWeight` ne fonctionne pas sur une police custom — seul `fontFamily` est respecté. La quasi-totalité des écrans affiche actuellement la mauvaise typographie sur Android.

## Problème transversal #2 — isPremium non branché

**Impact : C09 (Offres), C21 (Profil), C07 (Paywall trigger)**

L'`AuthContext` n'expose pas encore `isPremium` (dérivé du statut d'abonnement Supabase). Sans ce flag :
- Les offres ne sont pas verrouillées pour les users free
- Le Profil n'affiche pas le CTA upgrade
- Le Paywall ne se déclenche pas au bon moment

## Problème transversal #3 — Navigation "← flèche texte" vs icône SVG

**Impact : tous les sous-écrans**

Tous les boutons back utilisent `<Text>←</Text>` (caractère Unicode). Le design v6 utilise une icône SVG chevron gauche (16px, strokeWidth 2, couleur `colors.text`). À remplacer par un composant `BackButton` réutilisable.

---

## Résumé priorités

| Priorité | Écran(s) | Travail |
|---|---|---|
| 🔴 BLOQUANT | P01-P08 | Créer le portail partenaire from scratch |
| 🔴 BLOQUANT | Transversal | Remplacer `fontWeight` par `fontFamily` tokens |
| 🔴 BLOQUANT | C21, C09 | Brancher `isPremium` + gates |
| 🟠 IMPORTANT | C26 | Corriger `profile?.phone` → email |
| 🟠 IMPORTANT | C10 | Hero fond blanc au lieu de gradient coloré |
| 🟠 IMPORTANT | C09 | Scanner FAB floating en bas à droite |
| 🟠 IMPORTANT | C07 | Bouton CTA sticky bas |
| 🟡 NICE TO HAVE | C12 | Instruction text + torche + scanContext visuel |
| 🟡 NICE TO HAVE | Tous | BackButton composant SVG réutilisable |
| 🟡 NICE TO HAVE | C18 | Lien vers PayoutsHistory |
