import { useMemo, useState } from "react";

import {
  AddEquipmentPanel,
  Button,
  EquipmentListCard,
  ProfileHeaderCard,
  ProfileStatsRow,
  Screen,
  SessionPhotoGrid,
  ThemedText,
} from "@/components/ui";
import { searchMockEquipmentCatalog, getMockSessions } from "@/mocks";
import { useProfileStore, useUIStore } from "@/store";

export default function ProfileScreen() {
  const currentUser = useProfileStore((state) => state.currentUser);
  const addEquipmentToProfile = useProfileStore((state) => state.addEquipmentToProfile);
  const isRedLightModeEnabled = useUIStore((state) => state.isRedLightModeEnabled);
  const toggleRedLightMode = useUIStore((state) => state.toggleRedLightMode);
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState("");

  const sessionPhotos = useMemo(
    () =>
      getMockSessions()
        .filter((session) => session.userId === currentUser.id)
        .flatMap((session) => session.photoPlaceholders),
    [currentUser.id],
  );
  const equipmentSearchResults = useMemo(
    () =>
      searchMockEquipmentCatalog(equipmentSearchQuery).filter(
        (equipmentItem) => !currentUser.equipment.some((ownedItem) => ownedItem.id === equipmentItem.id),
      ),
    [currentUser.equipment, equipmentSearchQuery],
  );

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        Profile
      </ThemedText>
      <ProfileHeaderCard user={currentUser} isOwnProfile />
      <ThemedText size="sm" tone="muted">
        Toggle night-vision-safe red-light mode
      </ThemedText>
      <Button
        label={isRedLightModeEnabled ? "Disable red-light mode" : "Enable red-light mode"}
        onPress={toggleRedLightMode}
        variant="secondary"
      />
      {__DEV__ ? (
        <Button
          label="Trigger test error"
          variant="secondary"
          onPress={() => {
            throw new Error("Sentry test error from Profile screen");
          }}
        />
      ) : null}
      <ProfileStatsRow stats={currentUser.stats} />
      <EquipmentListCard equipment={currentUser.equipment} />
      <AddEquipmentPanel
        query={equipmentSearchQuery}
        searchResults={equipmentSearchResults}
        onQueryChange={setEquipmentSearchQuery}
        onAddEquipment={addEquipmentToProfile}
      />
      <SessionPhotoGrid photos={sessionPhotos} />
    </Screen>
  );
}
