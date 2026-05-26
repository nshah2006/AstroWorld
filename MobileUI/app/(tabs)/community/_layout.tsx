import { Stack } from "expo-router";

export default function CommunityStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="post/[postId]" />
      <Stack.Screen name="user/[userId]" />
    </Stack>
  );
}
