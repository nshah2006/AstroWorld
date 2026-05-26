import { ScrollView, View, type ViewProps } from "react-native";

import type { Post, PostReply } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ThemedText } from "@/components/ui/ThemedText";

export interface PostDetailViewProps extends ViewProps {
  post: Post;
  replies: PostReply[];
  replyInput: string;
  onReplyInputChange: (value: string) => void;
  onAddReply: () => void;
  onOpenAuthor: (authorId: string) => void;
}

export function PostDetailView({
  post,
  replies,
  replyInput,
  onReplyInputChange,
  onAddReply,
  onOpenAuthor,
  className,
  ...props
}: PostDetailViewProps & { className?: string }) {
  return (
    <View className={["flex-1", className ?? ""].join(" ").trim()} {...props}>
      <ScrollView contentContainerClassName="gap-space-3 pb-space-6">
        <Card className="gap-space-3">
          <View className="flex-row items-center gap-space-2">
            <Avatar initials={post.author.avatarInitials} size="sm" />
            <View>
              <ThemedText weight="semibold" onPress={() => onOpenAuthor(post.author.id)}>
                {post.author.displayName}
              </ThemedText>
              <ThemedText size="xs" tone="muted">
                {post.reactionCount} reactions • {post.commentCount} comments
              </ThemedText>
            </View>
          </View>
          <ThemedText tone="muted">{post.body}</ThemedText>
          {post.imageUrl ? (
            <View className="h-space-12 items-center justify-center rounded-radius-md border border-border bg-bg">
              <ThemedText size="sm" tone="muted">
                Image placeholder
              </ThemedText>
            </View>
          ) : null}
        </Card>

        <Card className="gap-space-3">
          <ThemedText weight="semibold">Replies</ThemedText>
          {replies.map((reply) => (
            <View key={reply.id} className="gap-space-1 rounded-radius-md border border-border p-space-3">
              <ThemedText size="sm" weight="semibold">
                {reply.authorDisplayName}
              </ThemedText>
              <ThemedText size="sm" tone="muted">
                {reply.body}
              </ThemedText>
            </View>
          ))}
          <Input label="Write a reply" value={replyInput} onChangeText={onReplyInputChange} />
          <Button label="Post reply" onPress={onAddReply} disabled={replyInput.trim().length === 0} />
        </Card>
      </ScrollView>
    </View>
  );
}
