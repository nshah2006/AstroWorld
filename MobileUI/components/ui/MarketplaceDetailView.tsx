import { ScrollView, View, type ViewProps } from "react-native";

import type { MarketplaceListing } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ThemedText } from "@/components/ui/ThemedText";

export interface MarketplaceDetailViewProps extends ViewProps {
  listing: MarketplaceListing;
  isSaved: boolean;
  onToggleSaved: () => void;
  onOpenMessages: () => void;
}

export function MarketplaceDetailView({
  listing,
  isSaved,
  onToggleSaved,
  onOpenMessages,
  className,
  ...props
}: MarketplaceDetailViewProps & { className?: string }) {
  return (
    <ScrollView className={["flex-1", className ?? ""].join(" ").trim()} contentContainerClassName="gap-space-3 pb-space-6" {...props}>
      <Card className="gap-space-3">
        <ThemedText size="lg" weight="semibold">
          {listing.title}
        </ThemedText>
        <View className="h-space-12 items-center justify-center rounded-radius-md border border-border bg-bg">
          <ThemedText size="sm" tone="muted">
            {listing.photos.length} photo placeholder(s)
          </ThemedText>
        </View>
        <View className="flex-row items-center justify-between">
          <Tag label={listing.category} tone="lavender" />
          <ThemedText size="lg" weight="semibold">
            ${listing.priceUsd}
          </ThemedText>
        </View>
        <ThemedText tone="muted">{listing.description}</ThemedText>
      </Card>

      <Card className="gap-space-2">
        <ThemedText weight="semibold">Specs</ThemedText>
        {listing.specs.map((specLine) => (
          <ThemedText key={specLine} size="sm" tone="muted">
            • {specLine}
          </ThemedText>
        ))}
        <ThemedText size="sm" tone="muted">
          Condition: {listing.condition}
        </ThemedText>
      </Card>

      <Card className="gap-space-2">
        <ThemedText weight="semibold">Seller summary</ThemedText>
        <ThemedText size="sm">{listing.seller.displayName}</ThemedText>
        <ThemedText size="sm" tone="muted">
          Sessions: {listing.seller.sessionCount}
        </ThemedText>
        <ThemedText size="sm" tone="muted">
          Rating: {listing.seller.rating}
        </ThemedText>
      </Card>

      <View className="gap-space-3">
        <Button label="Message seller" onPress={onOpenMessages} />
        <Button label={isSaved ? "Saved" : "Save listing"} variant="secondary" onPress={onToggleSaved} />
      </View>
    </ScrollView>
  );
}
