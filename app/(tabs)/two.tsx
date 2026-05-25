import { Screen, ThemedText } from "@/components/ui";

export default function TabTwoScreen() {
  return (
    <Screen>
      <ThemedText size="lg" weight="semibold">
        Secondary Preview Tab
      </ThemedText>
      <ThemedText tone="muted" className="mt-space-2">
        Kept lightweight until Prompt 3 navigation shell.
      </ThemedText>
    </Screen>
  );
}
