import { Pressable, ScrollView, View, type ViewProps } from "react-native";

import type { Post } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Tag } from "@/components/ui/Tag";
import { ThemedText } from "@/components/ui/ThemedText";

export interface CommunityFeedProps extends ViewProps {
  posts: Post[];
  equipmentFilter: string;
  onEquipmentFilterChange: (value: string) => void;
  onOpenPost: (postId: string) => void;
  onOpenAuthor: (authorId: string) => void;
}

export function CommunityFeed({
  posts,
  equipmentFilter,
  onEquipmentFilterChange,
  onOpenPost,
  onOpenAuthor,
  className,
  ...props
}: CommunityFeedProps & { className?: string }) {
  return (
    <View className={["flex-1 gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <Input
        label="Filter by equipment model"
        value={equipmentFilter}
        onChangeText={onEquipmentFilterChange}
        placeholder="e.g. ASI533, NexStar, Delos"
      />
      <ScrollView className="flex-1" contentContainerClassName="gap-space-3 pb-space-6">
        {posts.map((post) => (
          <Pressable key={post.id} onPress={() => onOpenPost(post.id)}>
            <Card className="gap-space-3">
              <Pressable onPress={() => onOpenAuthor(post.author.id)}>
                <View className="flex-row items-center gap-space-2">
                  <Avatar initials={post.author.avatarInitials} size="sm" />
                  <View>
                    <ThemedText weight="semibold">{post.author.displayName}</ThemedText>
                    <ThemedText size="xs" tone="muted">
                      {post.reactionCount} reactions • {post.commentCount} comments
                    </ThemedText>
                  </View>
                </View>
              </Pressable>
              <ThemedText tone="muted">{post.body}</ThemedText>
              {post.imageUrl ? (
                <View className="h-space-12 items-center justify-center rounded-radius-md border border-border bg-bg">
                  <ThemedText size="sm" tone="muted">
                    Image placeholder
                  </ThemedText>
                </View>
              ) : null}
              <View className="flex-row flex-wrap gap-space-2">
                {post.gearUsed.slice(0, 2).map((gear) => (
                  <Tag key={gear} label={gear} />
                ))}
              </View>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
