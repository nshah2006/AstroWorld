import { useMemo, useState } from "react";

import {
  AddEquipmentPanel,
  EquipmentListCard,
  ProfileHeaderCard,
  ProfileStatsRow,
  Screen,
  SessionPhotoGrid,
  ThemedText,
} from "@/components/ui";
import { searchMockEquipmentCatalog, getMockSessions } from "@/mocks";
import { useProfileStore } from "@/store";

export default function ProfileScreen() {
  const currentUser = useProfileStore((state) => state.currentUser);
  const addEquipmentToProfile = useProfileStore((state) => state.addEquipmentToProfile);
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
