import { View, type ViewProps } from "react-native";

import type { User } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ThemedText } from "@/components/ui/ThemedText";

export interface ProfileHeaderCardProps extends ViewProps {
  user: User;
  isOwnProfile: boolean;
  onFollow?: () => void;
}

export function ProfileHeaderCard({
  user,
  isOwnProfile,
  onFollow,
  className,
  ...props
}: ProfileHeaderCardProps & { className?: string }) {
  return (
    <Card className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
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
      {isOwnProfile ? (
        <ThemedText size="sm" tone="muted">
          Your profile (editable)
        </ThemedText>
      ) : (
        <Button label="Follow" onPress={onFollow} />
      )}
    </Card>
  );
}
