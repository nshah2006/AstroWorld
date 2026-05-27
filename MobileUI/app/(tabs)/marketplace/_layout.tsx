import { Stack } from "expo-router";

export default function MarketplaceStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[listingId]" />
      <Stack.Screen name="messages/[listingId]" />
    </Stack>
  );
}
