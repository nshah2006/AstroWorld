import { View, type ViewProps } from "react-native";
import MapView, { Marker, type MapPressEvent } from "react-native-maps";

import type { Coordinates, StargazingSite } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ThemedText } from "@/components/ui/ThemedText";

export interface SitesMapViewProps extends ViewProps {
  sites: StargazingSite[];
  selectedSiteId: string | null;
  pendingSiteLocation: Coordinates | null;
  pendingSiteName: string;
  pendingSiteRating: string;
  onSelectSite: (siteId: string) => void;
  onMapPress: (event: MapPressEvent) => void;
  onPendingSiteNameChange: (value: string) => void;
  onPendingSiteRatingChange: (value: string) => void;
  onSavePendingSite: () => void;
}

const defaultRegion = {
  latitude: 42.06,
  longitude: -87.68,
  latitudeDelta: 0.22,
  longitudeDelta: 0.22,
};

export function SitesMapView({
  sites,
  selectedSiteId,
  pendingSiteLocation,
  pendingSiteName,
  pendingSiteRating,
  onSelectSite,
  onMapPress,
  onPendingSiteNameChange,
  onPendingSiteRatingChange,
  onSavePendingSite,
  className,
  ...props
}: SitesMapViewProps & { className?: string }) {
  const selectedSite = sites.find((site) => site.id === selectedSiteId) ?? null;

  return (
    <View className={["flex-1 gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <View className="h-[340px] overflow-hidden rounded-radius-lg border border-border">
        <MapView className="h-full w-full" initialRegion={defaultRegion} onPress={onMapPress}>
          {sites.map((site) => (
            <Marker
              key={site.id}
              coordinate={site.location}
              title={site.name}
              description={`Light pollution ${site.lightPollutionRating}/5`}
              onPress={() => onSelectSite(site.id)}
            />
          ))}
          {pendingSiteLocation ? <Marker coordinate={pendingSiteLocation} pinColor="#ff6b6b" /> : null}
        </MapView>
      </View>

      {selectedSite ? (
        <Card className="gap-space-2">
          <ThemedText weight="semibold">{selectedSite.name}</ThemedText>
          <ThemedText size="sm" tone="muted">
            Light pollution: {selectedSite.lightPollutionRating}/5
          </ThemedText>
          {selectedSite.notes ? (
            <ThemedText size="sm" tone="muted">
              {selectedSite.notes}
            </ThemedText>
          ) : null}
        </Card>
      ) : null}

      <Card className="gap-space-3">
        <ThemedText weight="semibold">Save new site</ThemedText>
        <ThemedText size="sm" tone="muted">
          Tap the map to drop a marker, then save the site.
        </ThemedText>
        <Input label="Site name" value={pendingSiteName} onChangeText={onPendingSiteNameChange} />
        <Input
          label="Light pollution (1-5)"
          value={pendingSiteRating}
          onChangeText={onPendingSiteRatingChange}
          keyboardType="numeric"
        />
        <Button label="Save site" onPress={onSavePendingSite} disabled={!pendingSiteLocation || pendingSiteName.trim().length === 0} />
      </Card>
    </View>
  );
}
