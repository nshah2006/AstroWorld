import { View, type ViewProps } from "react-native";

import type { Post } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ThemedText } from "@/components/ui/ThemedText";

export interface RegionFeedPreviewProps extends ViewProps {
  posts: Post[];
}

export function RegionFeedPreview({ posts, className, ...props }: RegionFeedPreviewProps & { className?: string }) {
  return (
    <Card className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <ThemedText size="lg" weight="semibold">
        From your region
      </ThemedText>
      {posts.slice(0, 3).map((post) => (
        <View key={post.id} className="gap-space-2 rounded-radius-md border border-border p-space-3">
          <View className="flex-row items-center gap-space-2">
            <Avatar initials={post.author.avatarInitials} size="sm" />
            <View className="flex-1">
              <ThemedText size="sm" weight="semibold">
                {post.author.displayName}
              </ThemedText>
              <ThemedText size="xs" tone="muted">
                {post.reactionCount} reactions • {post.commentCount} comments
              </ThemedText>
            </View>
          </View>
          <ThemedText size="sm" tone="muted">
            {post.body}
          </ThemedText>
          <View className="flex-row gap-space-2">
            {post.gearUsed.slice(0, 2).map((gearLabel) => (
              <Tag key={gearLabel} label={gearLabel} />
            ))}
          </View>
        </View>
      ))}
    </Card>
  );
}
