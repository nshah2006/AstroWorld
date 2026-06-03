import { useState } from "react";
import type { MapPressEvent } from "react-native-maps";

import type { Coordinates, StargazingSite } from "@/lib/types";
import { Screen, SitesMapView, ThemedText } from "@/components/ui";
import { useSitesStore } from "@/store";

export default function RelocationScreen() {
  const sites = useSitesStore((state) => state.savedSites);
  const selectedSiteId = useSitesStore((state) => state.selectedSiteId);
  const setSelectedSiteId = useSitesStore((state) => state.setSelectedSiteId);
  const addSite = useSitesStore((state) => state.addSite);

  const [pendingSiteLocation, setPendingSiteLocation] = useState<Coordinates | null>(null);
  const [pendingSiteName, setPendingSiteName] = useState("");
  const [pendingSiteRating, setPendingSiteRating] = useState("3");

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setPendingSiteLocation({ latitude, longitude });
  };

  const handleSavePendingSite = () => {
    if (!pendingSiteLocation || pendingSiteName.trim().length === 0) {
      return;
    }

    const parsedRating = Number(pendingSiteRating);
    const rating: StargazingSite["lightPollutionRating"] =
      parsedRating >= 1 && parsedRating <= 5 ? (parsedRating as StargazingSite["lightPollutionRating"]) : 3;

    addSite(pendingSiteName.trim(), pendingSiteLocation, rating);
    setPendingSiteName("");
    setPendingSiteLocation(null);
    setPendingSiteRating("3");
  };

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        My Sites
      </ThemedText>
      <SitesMapView
        sites={sites}
        selectedSiteId={selectedSiteId}
        pendingSiteLocation={pendingSiteLocation}
        pendingSiteName={pendingSiteName}
        pendingSiteRating={pendingSiteRating}
        onSelectSite={setSelectedSiteId}
        onMapPress={handleMapPress}
        onPendingSiteNameChange={setPendingSiteName}
        onPendingSiteRatingChange={setPendingSiteRating}
        onSavePendingSite={handleSavePendingSite}
      />
    </Screen>
  );
}
