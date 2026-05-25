import { View } from "react-native";

import { Avatar, Button, Card, Input, Screen, Tag, ThemedText } from "@/components/ui";

export default function TabOneScreen() {
  return (
    <Screen>
      <View className="flex-1 gap-space-4">
        <ThemedText size="xl" weight="semibold">
          UI Preview
        </ThemedText>
        <ThemedText tone="muted">
          Prompt 2 temporary preview for Aurora tokens and primitives.
        </ThemedText>

        <Card>
          <View className="mb-space-3 flex-row items-center gap-space-3">
            <Avatar initials="NS" />
            <View>
              <ThemedText weight="semibold">Nirmal Shah</ThemedText>
              <ThemedText size="sm" tone="muted">
                Backyard session planner
              </ThemedText>
            </View>
          </View>

          <View className="mb-space-3 flex-row gap-space-2">
            <Tag label="Clear Skies" tone="teal" />
            <Tag label="First Quarter" tone="lavender" />
            <Tag label="Urban" />
          </View>

          <Input label="Session title" placeholder="Tonight at Riverside Point" />
          <View className="mt-space-4 flex-row gap-space-3">
            <View className="flex-1">
              <Button label="Plan Session" />
            </View>
            <View className="flex-1">
              <Button label="Secondary" variant="secondary" />
            </View>
          </View>
        </Card>
      </View>
    </Screen>
  );
}
