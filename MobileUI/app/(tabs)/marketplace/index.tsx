import { useMemo, useState } from "react";
import { useRouter } from "expo-router";

import { MarketplaceFeed, Screen, ThemedText } from "@/components/ui";
import { getMockMarketplaceListings } from "@/mocks";
import { useUIStore } from "@/store";

export default function MarketplaceScreen() {
  const router = useRouter();
  const listings = getMockMarketplaceListings();
  const activeFilters = useUIStore((state) => state.activeFilters);
  const setMarketplaceCategoryFilter = useUIStore((state) => state.setMarketplaceCategoryFilter);
  const setMaxDistanceFilter = useUIStore((state) => state.setMaxDistanceFilter);
  const [maxPriceInput, setMaxPriceInput] = useState("");

  const filteredListings = useMemo(() => {
    const parsedMaxPrice = Number(maxPriceInput);
    const hasMaxPrice = !Number.isNaN(parsedMaxPrice) && parsedMaxPrice > 0;

    return listings.filter((listing) => {
      const categoryMatches =
        !activeFilters.marketplaceCategory || activeFilters.marketplaceCategory === "all"
          ? true
          : listing.category === activeFilters.marketplaceCategory;
      const priceMatches = hasMaxPrice ? listing.priceUsd <= parsedMaxPrice : true;
      const distanceMatches = activeFilters.maxDistanceKm ? listing.distanceKm <= activeFilters.maxDistanceKm : true;
      return categoryMatches && priceMatches && distanceMatches;
    });
  }, [activeFilters.marketplaceCategory, activeFilters.maxDistanceKm, listings, maxPriceInput]);

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        Marketplace
      </ThemedText>
      <MarketplaceFeed
        listings={filteredListings}
        selectedCategory={activeFilters.marketplaceCategory ?? "all"}
        maxPrice={maxPriceInput}
        maxDistance={activeFilters.maxDistanceKm ? String(activeFilters.maxDistanceKm) : ""}
        onSelectCategory={(category) => setMarketplaceCategoryFilter(category)}
        onMaxPriceChange={setMaxPriceInput}
        onMaxDistanceChange={(value) => {
          const parsedDistance = Number(value);
          setMaxDistanceFilter(Number.isNaN(parsedDistance) ? null : parsedDistance);
        }}
        onOpenListing={(listingId) => router.push(`/(tabs)/marketplace/${listingId}`)}
        onOpenMessageThread={(listingId) => router.push(`/(tabs)/marketplace/messages/${listingId}`)}
      />
    </Screen>
  );
}
