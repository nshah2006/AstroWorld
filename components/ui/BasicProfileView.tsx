import { View, type ViewProps } from "react-native";

import type { User } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ThemedText } from "@/components/ui/ThemedText";

export interface BasicProfileViewProps extends ViewProps {
  user: User;
}

export function BasicProfileView({ user, className, ...props }: BasicProfileViewProps & { className?: string }) {
  return (
    <View className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <Card className="gap-space-3">
        <View className="flex-row items-center gap-space-3">
          <Avatar initials={user.avatarInitials} size="lg" />
          <View className="flex-1">
            <ThemedText size="lg" weight="semibold">
              {user.displayName}
            </ThemedText>
            <ThemedText size="sm" tone="muted">
              {user.handle} • {user.approximateLocation}
            </ThemedText>
          </View>
        </View>
        <ThemedText tone="muted">{user.bio}</ThemedText>
        <Button label="Follow" />
      </Card>
    </View>
  );
}
