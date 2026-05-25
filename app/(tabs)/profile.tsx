import { View } from "react-native";

import { Button, Card, Screen, ThemedText } from "@/components/ui";
import { useProfileStore, useSessionDraftStore, useUIStore } from "@/store";

export default function ProfileScreen() {
  const currentUser = useProfileStore((state) => state.currentUser);
  const refreshCurrentUserFromMocks = useProfileStore((state) => state.refreshCurrentUserFromMocks);
  const isRedLightModeEnabled = useUIStore((state) => state.isRedLightModeEnabled);
  const toggleRedLightMode = useUIStore((state) => state.toggleRedLightMode);
  const notes = useSessionDraftStore((state) => state.draft.notes);
  const setNotes = useSessionDraftStore((state) => state.setNotes);
  const clearDraft = useSessionDraftStore((state) => state.clearDraft);

  return (
    <Screen>
      <View className="gap-space-4">
        <ThemedText size="lg" weight="semibold">
          Profile
        </ThemedText>
        <Card>
          <ThemedText weight="semibold">Store Test Controls</ThemedText>
          <ThemedText tone="muted" size="sm" className="mt-space-2">
            Current user: {currentUser.displayName}
          </ThemedText>
          <ThemedText tone="muted" size="sm">
            Red-light mode: {isRedLightModeEnabled ? "On" : "Off"}
          </ThemedText>
          <ThemedText tone="muted" size="sm">
            Draft notes: {notes.length > 0 ? notes : "Empty"}
          </ThemedText>

          <View className="mt-space-4 gap-space-3">
            <Button label="Toggle Red-Light Mode" onPress={toggleRedLightMode} />
            <Button
              label="Set Draft Note"
              variant="secondary"
              onPress={() => setNotes("Testing session draft state update")}
            />
            <Button label="Clear Draft" variant="secondary" onPress={clearDraft} />
            <Button label="Refresh User From Mocks" variant="secondary" onPress={refreshCurrentUserFromMocks} />
          </View>
        </Card>
      </View>
    </Screen>
  );
}
