import type { MarketplaceListing, MarketplaceMessage } from "@/lib/types";

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
    specs: ["Apochromatic refractor", "73mm aperture", "430mm focal length"],
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
    specs: ["Payload 12kg", "Integrated iPolar support", "Dual-axis drive"],
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
    specs: ["82-degree apparent field", "1.25in barrel", "Nitrogen purged"],
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

const mockMarketplaceMessagesByListingId: Record<string, MarketplaceMessage[]> = {
  "listing-001": [
    {
      id: "message-001",
      listingId: "listing-001",
      senderId: "seller-001",
      senderDisplayName: "Mia Thompson",
      body: "Hi! Still available and happy to share additional photos.",
      sentAtIso: "2026-05-25T00:41:00.000Z",
    },
    {
      id: "message-002",
      listingId: "listing-001",
      senderId: "user-001",
      senderDisplayName: "Nirmal Shah",
      body: "Thanks, can you confirm whether the flattener ring has any play?",
      sentAtIso: "2026-05-25T00:46:00.000Z",
    },
  ],
  "listing-002": [
    {
      id: "message-003",
      listingId: "listing-002",
      senderId: "seller-002",
      senderDisplayName: "Diego Ramirez",
      body: "Mount tracks well at moderate payloads. Open to local handoff this weekend.",
      sentAtIso: "2026-05-24T20:10:00.000Z",
    },
  ],
  "listing-003": [
    {
      id: "message-004",
      listingId: "listing-003",
      senderId: "seller-003",
      senderDisplayName: "Priya Mehta",
      body: "Eyepiece optics are clear, just cosmetic wear on the barrel finish.",
      sentAtIso: "2026-05-24T15:33:00.000Z",
    },
  ],
};

export function getMockMarketplaceListings(): MarketplaceListing[] {
  return mockMarketplaceListings;
}

export function getMockMarketplaceListingById(listingId: string): MarketplaceListing | undefined {
  return mockMarketplaceListings.find((listing) => listing.id === listingId);
}

export function getMockMarketplaceMessagesByListingId(listingId: string): MarketplaceMessage[] {
  return mockMarketplaceMessagesByListingId[listingId] ?? [];
}
