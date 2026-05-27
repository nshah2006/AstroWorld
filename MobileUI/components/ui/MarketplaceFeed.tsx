import { Pressable, ScrollView, View, type ViewProps } from "react-native";

import type { MarketplaceListing } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Tag } from "@/components/ui/Tag";
import { ThemedText } from "@/components/ui/ThemedText";

export interface MarketplaceFeedProps extends ViewProps {
  listings: MarketplaceListing[];
  selectedCategory: string;
  maxPrice: string;
  maxDistance: string;
  onSelectCategory: (category: string) => void;
  onMaxPriceChange: (value: string) => void;
  onMaxDistanceChange: (value: string) => void;
  onOpenListing: (listingId: string) => void;
  onOpenMessageThread: (listingId: string) => void;
}

const marketplaceCategories = ["all", "telescope", "eyepiece", "mount", "camera", "accessory"] as const;

export function MarketplaceFeed({
  listings,
  selectedCategory,
  maxPrice,
  maxDistance,
  onSelectCategory,
  onMaxPriceChange,
  onMaxDistanceChange,
  onOpenListing,
  onOpenMessageThread,
  className,
  ...props
}: MarketplaceFeedProps & { className?: string }) {
  return (
    <View className={["flex-1 gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <Card className="gap-space-3">
        <ThemedText weight="semibold">Filters</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-space-2">
          {marketplaceCategories.map((category) => (
            <Pressable key={category} onPress={() => onSelectCategory(category)}>
              <Tag label={category} tone={selectedCategory === category ? "teal" : "muted"} />
            </Pressable>
          ))}
        </ScrollView>
        <Input label="Max price (USD)" value={maxPrice} onChangeText={onMaxPriceChange} keyboardType="numeric" />
        <Input
          label="Max distance (km)"
          value={maxDistance}
          onChangeText={onMaxDistanceChange}
          keyboardType="numeric"
        />
      </Card>

      <ScrollView className="flex-1" contentContainerClassName="gap-space-3 pb-space-6">
        {listings.map((listing) => (
          <Pressable key={listing.id} onPress={() => onOpenListing(listing.id)}>
            <Card className="gap-space-2">
              <ThemedText weight="semibold">{listing.title}</ThemedText>
              <View className="flex-row items-center justify-between">
                <Tag label={listing.category} tone="lavender" />
                <ThemedText>${listing.priceUsd}</ThemedText>
              </View>
              <ThemedText size="sm" tone="muted">
                {listing.distanceKm} km • {listing.condition}
              </ThemedText>
              <Pressable onPress={() => onOpenMessageThread(listing.id)}>
                <ThemedText size="sm" tone="teal">
                  Message seller
                </ThemedText>
              </Pressable>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
