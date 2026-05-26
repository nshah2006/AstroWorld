import type { TonightSky } from "@/lib/types";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ThemedText } from "@/components/ui/ThemedText";
import { View, type ViewProps } from "react-native";

export interface TonightSkyCardProps extends ViewProps {
  tonightSky: TonightSky;
  onPlanSession?: () => void;
  onRelocate?: () => void;
}

export function TonightSkyCard({
  tonightSky,
  onPlanSession,
  onRelocate,
  className,
  ...props
}: TonightSkyCardProps & { className?: string }) {
  const clearPercent = 100 - tonightSky.conditions.cloudCoverPercent;
  const topObject = tonightSky.topObjects[0];

  return (
    <Card className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <ThemedText size="lg" weight="semibold">
        Tonight&apos;s Sky
      </ThemedText>
      <ThemedText tone="muted" size="sm">
        {tonightSky.observerLocationName}
      </ThemedText>

      <View className="gap-space-2">
        <ThemedText>Clear: {clearPercent}%</ThemedText>
        <ThemedText>Moon: {tonightSky.moonPhase}</ThemedText>
        <ThemedText>Top object: {topObject ? topObject.name : "None selected"}</ThemedText>
      </View>

      <View className="flex-row gap-space-3">
        <View className="flex-1">
          <Button label="Plan session" onPress={onPlanSession} />
        </View>
        <View className="flex-1">
          <Button label="Relocate" variant="secondary" onPress={onRelocate} />
        </View>
      </View>
    </Card>
  );
}
