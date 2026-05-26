import { useMemo, useState } from "react";
import { useRouter } from "expo-router";

import { CommunityFeed, Screen, ThemedText } from "@/components/ui";
import { getMockPosts } from "@/mocks";

export default function CommunityFeedScreen() {
  const router = useRouter();
  const [equipmentFilter, setEquipmentFilter] = useState("");

  const posts = getMockPosts();
  const filteredPosts = useMemo(() => {
    const normalizedFilter = equipmentFilter.trim().toLowerCase();
    if (!normalizedFilter) {
      return posts;
    }

    return posts.filter((post) =>
      post.gearUsed.some((gearModel) => gearModel.toLowerCase().includes(normalizedFilter)),
    );
  }, [equipmentFilter, posts]);

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        Community
      </ThemedText>
      <CommunityFeed
        posts={filteredPosts}
        equipmentFilter={equipmentFilter}
        onEquipmentFilterChange={setEquipmentFilter}
        onOpenPost={(postId) => router.push(`/(tabs)/community/post/${postId}`)}
        onOpenAuthor={(authorId) => router.push(`/(tabs)/community/user/${authorId}`)}
      />
    </Screen>
  );
}
