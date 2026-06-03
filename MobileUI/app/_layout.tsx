import { Stack } from "expo-router";
import { useProfileStore } from "@/store";
import { ThemeModeProvider } from "@/theme";
import "react-native-reanimated";
import "@/lib/sentry";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const isOnboarded = useProfileStore((state) => state.isOnboarded);

  return (
    <ThemeModeProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
          redirect={!isOnboarded}
        />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false }}
          redirect={isOnboarded}
        />
        <Stack.Screen name="relocation" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeModeProvider>
  );
}
