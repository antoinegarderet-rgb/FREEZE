export type AnalyticsEvent =
  | 'signup'
  | 'scan'
  | 'subscribe'
  | 'refer'
  | 'login';

let posthogClient: { capture: (event: string, props?: Record<string, unknown>) => void } | null =
  null;

export function initAnalytics(): void {
  const apiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
  if (!apiKey) return;
  // PostHog client is initialized lazily to keep Sprint 1 dependency-free;
  // wired up fully once the posthog-react-native package is added in Sprint 7.
  posthogClient = null;
}

export function track(event: AnalyticsEvent, props?: Record<string, unknown>): void {
  if (!posthogClient) return;
  posthogClient.capture(event, props);
}
