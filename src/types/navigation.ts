export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  EmailVerify: { email: string };
  ForgotPassword: undefined;
  ResetPassword: { accessToken?: string } | undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Offres: undefined;
  Carte: undefined;
  Parrainage: undefined;
  Profil: undefined;
};

export type MainStackParamList = {
  Tabs: undefined;
  OfferDetail: { offerId: number };
  Scanner: { scanContext: 'generic' | 'permanent' | 'discovery'; prevScreen: string };
  PostScan: { scanContext?: 'permanent' | 'discovery'; partner?: string; offer?: string; alreadyUsed?: boolean; discovery?: boolean };
  Savings: undefined;
  History: undefined;
  Favoris: undefined;
  Settings: undefined;
  AccountInfo: undefined;
  Subscription: undefined;
  CancelSubscription: undefined;
  FAQ: undefined;
  Contact: undefined;
  MyData: undefined;
  LegalDoc: { title: string; kind: 'mentions' | 'cgu' | 'privacy' };
  PayoutsHistory: undefined;
  PayoutDetail: undefined;
  RIBForm: undefined;
  ParrainageConditions: undefined;
  Paywall: undefined;
  Subscribed: undefined;
};
