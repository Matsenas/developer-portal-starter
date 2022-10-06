export enum Pages {
  OVERVIEW = "/",
  ACCOUNT_SECURITY = "/account-security",
  API_KEY = "/api-key",
  BILLING = "/billing",
  CONTRACTS = "/contracts",
  FILES = "/files",
  LOGS = "/logs",
  NFTS = "/nfts",
  SUBSCRIPTION = "/subscription",
  SETUP_PASSWORD = "/setup-password",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  SIGN_UP_NEW_USER = "/sign-up-new-user",
  FORGOT_PASSWORD = "/forgot-password",
}

export const privatePages: string[] = [
  Pages.ACCOUNT_SECURITY,
  Pages.API_KEY,
  Pages.BILLING,
  Pages.CONTRACTS,
  Pages.FILES,
  Pages.LOGS,
  Pages.NFTS,
  Pages.SUBSCRIPTION,
  Pages.OVERVIEW,
];

export const publicPages: string[] = [
  Pages.SETUP_PASSWORD,
  Pages.SIGN_IN,
  Pages.SIGN_UP,
  Pages.SIGN_UP_NEW_USER,
  Pages.FORGOT_PASSWORD,
];
