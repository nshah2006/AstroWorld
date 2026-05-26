import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import type { PostReply } from "@/lib/types";
import { PostDetailView, Screen, ThemedText } from "@/components/ui";
import { getMockCurrentUser, getMockPostById, getMockRepliesByPostId } from "@/mocks";

export default function PostDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ postId?: string }>();
  const postId = params.postId ?? "";
  const post = getMockPostById(postId);
  const baseReplies = useMemo(() => getMockRepliesByPostId(postId), [postId]);
  const [localReplies, setLocalReplies] = useState<PostReply[]>([]);
  const [replyInput, setReplyInput] = useState("");

  if (!post) {
    return (
      <Screen>
        <ThemedText>Post not found.</ThemedText>
      </Screen>
    );
  }

  const currentUser = getMockCurrentUser();
  const replies = [...baseReplies, ...localReplies];

  const handleAddReply = () => {
    const trimmedReply = replyInput.trim();
    if (!trimmedReply) {
      return;
    }

    const newReply: PostReply = {
      id: `reply-local-${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorDisplayName: currentUser.displayName,
      authorAvatarInitials: currentUser.avatarInitials,
      body: trimmedReply,
      createdAtIso: new Date().toISOString(),
    };

    setLocalReplies((currentReplies) => [...currentReplies, newReply]);
    setReplyInput("");
  };

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        Post detail
      </ThemedText>
      <PostDetailView
        post={post}
        replies={replies}
        replyInput={replyInput}
        onReplyInputChange={setReplyInput}
        onAddReply={handleAddReply}
        onOpenAuthor={(authorId) => router.push(`/(tabs)/community/user/${authorId}`)}
      />
    </Screen>
  );
}
