import { View, type ViewProps } from "react-native";

import type { UserStats } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { ThemedText } from "@/components/ui/ThemedText";

export interface ProfileStatsRowProps extends ViewProps {
  stats: UserStats;
}

export function ProfileStatsRow({ stats, className, ...props }: ProfileStatsRowProps & { className?: string }) {
  return (
    <Card className={["gap-space-2", className ?? ""].join(" ").trim()} {...props}>
      <View className="flex-row justify-between">
        <View className="items-center">
          <ThemedText size="lg" weight="semibold">
            {stats.totalSessions}
          </ThemedText>
          <ThemedText size="sm" tone="muted">
            Sessions
          </ThemedText>
        </View>
        <View className="items-center">
          <ThemedText size="lg" weight="semibold">
            {stats.followingCount}
          </ThemedText>
          <ThemedText size="sm" tone="muted">
            Following
          </ThemedText>
        </View>
        <View className="items-center">
          <ThemedText size="lg" weight="semibold">
            {stats.observedObjectCount}
          </ThemedText>
          <ThemedText size="sm" tone="muted">
            Objects
          </ThemedText>
        </View>
      </View>
    </Card>
  );
}
