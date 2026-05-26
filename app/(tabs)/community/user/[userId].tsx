import { useLocalSearchParams } from "expo-router";

import { BasicProfileView, Screen, ThemedText } from "@/components/ui";
import { getMockUserById } from "@/mocks";

export default function CommunityUserProfileScreen() {
  const params = useLocalSearchParams<{ userId?: string }>();
  const userId = params.userId ?? "";
  const user = getMockUserById(userId);

  if (!user) {
    return (
      <Screen>
        <ThemedText>User not found.</ThemedText>
      </Screen>
    );
  }

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        Profile
      </ThemedText>
      <BasicProfileView user={user} />
    </Screen>
  );
}
