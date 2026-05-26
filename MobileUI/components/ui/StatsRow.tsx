import { View, type ViewProps } from "react-native";

import { Card } from "@/components/ui/Card";
import { ThemedText } from "@/components/ui/ThemedText";

export interface StatsRowProps extends ViewProps {
  sessions: number;
  following: number;
  objects: number;
}

export function StatsRow({
  sessions,
  following,
  objects,
  className,
  ...props
}: StatsRowProps & { className?: string }) {
  return (
    <Card className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <View className="flex-row justify-between">
        <View className="items-center">
          <ThemedText size="lg" weight="semibold">
            {sessions}
          </ThemedText>
          <ThemedText size="sm" tone="muted">
            Sessions
          </ThemedText>
        </View>
        <View className="items-center">
          <ThemedText size="lg" weight="semibold">
            {following}
          </ThemedText>
          <ThemedText size="sm" tone="muted">
            Following
          </ThemedText>
        </View>
        <View className="items-center">
          <ThemedText size="lg" weight="semibold">
            {objects}
          </ThemedText>
          <ThemedText size="sm" tone="muted">
            Objects
          </ThemedText>
        </View>
      </View>
    </Card>
  );
}
