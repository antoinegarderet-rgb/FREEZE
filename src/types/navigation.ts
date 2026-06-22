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
