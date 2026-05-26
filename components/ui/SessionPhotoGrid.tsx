import { View, type ViewProps } from "react-native";

import { Card } from "@/components/ui/Card";
import { ThemedText } from "@/components/ui/ThemedText";

export interface SessionPhotoGridProps extends ViewProps {
  photos: string[];
}

export function SessionPhotoGrid({ photos, className, ...props }: SessionPhotoGridProps & { className?: string }) {
  return (
    <Card className={["gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <ThemedText size="lg" weight="semibold">
        Session gallery
      </ThemedText>
      <View className="flex-row flex-wrap gap-space-2">
        {photos.map((photoPlaceholderId) => (
          <View
            key={photoPlaceholderId}
            className="h-space-12 w-[31%] items-center justify-center rounded-radius-md border border-border bg-bg"
          >
            <ThemedText size="xs" tone="muted" align="center">
              Photo
            </ThemedText>
          </View>
        ))}
      </View>
    </Card>
  );
}
