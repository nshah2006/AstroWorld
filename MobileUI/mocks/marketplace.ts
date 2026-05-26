import type { MarketplaceListing } from "@/lib/types";

const mockMarketplaceListings: MarketplaceListing[] = [
  {
    id: "listing-001",
    title: "William Optics Zenithstar 73 with field flattener",
    priceUsd: 640,
    condition: "like-new",
    category: "telescope",
    distanceKm: 8.5,
    description:
      "Used for six imaging sessions. Includes original case, dovetail, and adjustable flattener.",
    seller: {
      id: "seller-001",
      displayName: "Mia Thompson",
      rating: 4.8,
      sessionCount: 112,
      approximateLocation: "Rogers Park, Chicago",
    },
    photos: ["listing-001-photo-1", "listing-001-photo-2"],
  },
  {
    id: "listing-002",
    title: "iOptron CEM26 mount head + hard case",
    priceUsd: 975,
    condition: "good",
    category: "mount",
    distanceKm: 14.2,
    description:
      "Reliable tracking at 400mm. Cosmetic scuffs on saddle, full mechanical service completed this spring.",
    seller: {
      id: "seller-002",
      displayName: "Diego Ramirez",
      rating: 4.6,
      sessionCount: 87,
      approximateLocation: "Wilmette, IL",
    },
    photos: ["listing-002-photo-1", "listing-002-photo-2", "listing-002-photo-3"],
  },
  {
    id: "listing-003",
    title: "Explore Scientific 82deg 14mm eyepiece",
    priceUsd: 125,
    condition: "fair",
    category: "eyepiece",
    distanceKm: 5.9,
    description:
      "Optics are clean, outer barrel has minor wear. Great budget wide-field option for mid focal lengths.",
    seller: {
      id: "seller-003",
      displayName: "Priya Mehta",
      rating: 4.9,
      sessionCount: 54,
      approximateLocation: "Evanston, IL",
    },
    photos: ["listing-003-photo-1"],
  },
];

export function getMockMarketplaceListings(): MarketplaceListing[] {
  return mockMarketplaceListings;
}

export function getMockMarketplaceListingById(listingId: string): MarketplaceListing | undefined {
  return mockMarketplaceListings.find((listing) => listing.id === listingId);
}
