import { useLocalSearchParams, useRouter } from "expo-router";

import { MarketplaceDetailView, Screen, ThemedText } from "@/components/ui";
import { getMockMarketplaceListingById } from "@/mocks";
import { useUIStore } from "@/store";

export default function MarketplaceListingDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ listingId?: string }>();
  const listingId = params.listingId ?? "";
  const listing = getMockMarketplaceListingById(listingId);
  const savedListingIds = useUIStore((state) => state.savedListingIds);
  const toggleSavedListing = useUIStore((state) => state.toggleSavedListing);

  if (!listing) {
    return (
      <Screen>
        <ThemedText>Listing not found.</ThemedText>
      </Screen>
    );
  }

  const isSaved = savedListingIds.includes(listing.id);

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        Listing detail
      </ThemedText>
      <MarketplaceDetailView
        listing={listing}
        isSaved={isSaved}
        onToggleSaved={() => toggleSavedListing(listing.id)}
        onOpenMessages={() => router.push(`/(tabs)/marketplace/messages/${listing.id}`)}
      />
    </Screen>
  );
}
