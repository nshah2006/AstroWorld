import { View, type ViewProps } from "react-native";

import type { User } from "@/lib/types";
import { ProfileHeaderCard } from "@/components/ui/ProfileHeaderCard";
import { ProfileStatsRow } from "@/components/ui/ProfileStatsRow";

export interface BasicProfileViewProps extends ViewProps {
  user: User;
  isOwnProfile?: boolean;
}

export function BasicProfileView({
  user,
  isOwnProfile = false,
  className,
  ...props
}: BasicProfileViewProps & { className?: string }) {
  return (
    <View className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <ProfileHeaderCard user={user} isOwnProfile={isOwnProfile} />
      <ProfileStatsRow stats={user.stats} />
    </View>
  );
}
