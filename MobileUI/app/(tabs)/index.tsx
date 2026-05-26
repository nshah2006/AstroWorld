import { RegionFeedPreview, Screen, StatsRow, ThemedText, TonightSkyCard } from "@/components/ui";
import { getMockPosts, getMockTonightSky, getMockCurrentUser } from "@/mocks";

export default function TabOneScreen() {
  const tonightSky = getMockTonightSky();
  const posts = getMockPosts();
  const currentUser = getMockCurrentUser();

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        Home
      </ThemedText>
      <TonightSkyCard tonightSky={tonightSky} onPlanSession={() => {}} onRelocate={() => {}} />
      <StatsRow
        sessions={currentUser.stats.totalSessions}
        following={currentUser.stats.followingCount}
        objects={currentUser.stats.observedObjectCount}
      />
      <RegionFeedPreview posts={posts} />
    </Screen>
  );
}
