import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";

const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN ?? "";

Sentry.init({
  dsn: sentryDsn || undefined,
  enabled: !__DEV__ || Boolean(sentryDsn),
  debug: __DEV__,
  tracesSampleRate: __DEV__ ? 1.0 : 0.2,
  environment: __DEV__ ? "development" : "production",
  release: Constants.expoConfig?.version ?? "unknown",
});
