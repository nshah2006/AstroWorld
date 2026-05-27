export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherCondition {
  cloudCoverPercent: number;
  seeingScale: 1 | 2 | 3 | 4 | 5;
  transparencyScale: 1 | 2 | 3 | 4 | 5;
  temperatureC: number;
  humidityPercent: number;
}

export interface EquipmentItem {
  id: string;
  brand: string;
  model: string;
  category: "telescope" | "eyepiece" | "mount" | "camera" | "filter" | "accessory";
  notes?: string;
}

export interface UserStats {
  totalSessions: number;
  followingCount: number;
  observedObjectCount: number;
}

export interface User {
  id: string;
  displayName: string;
  handle: string;
  approximateLocation: string;
  avatarInitials: string;
  bio: string;
  stats: UserStats;
  equipment: EquipmentItem[];
}

export interface ObservationObject {
  id: string;
  name: string;
  catalogLabel: string;
  objectType: "planet" | "galaxy" | "nebula" | "cluster" | "moon" | "double-star";
}

export interface ObservationSession {
  id: string;
  userId: string;
  dateIso: string;
  locationName: string;
  location: Coordinates;
  weather: WeatherCondition;
  observedObjects: ObservationObject[];
  equipmentUsed: EquipmentItem[];
  notes: string;
  photoPlaceholders: string[];
}

export interface Post {
  id: string;
  author: Pick<User, "id" | "displayName" | "avatarInitials">;
  gearUsed: string[];
  body: string;
  imageUrl?: string;
  reactionCount: number;
  commentCount: number;
  createdAtIso: string;
}

export interface PostReply {
  id: string;
  postId: string;
  authorId: string;
  authorDisplayName: string;
  authorAvatarInitials: string;
  body: string;
  createdAtIso: string;
}

export interface SellerSummary {
  id: string;
  displayName: string;
  rating: number;
  sessionCount: number;
  approximateLocation: string;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  priceUsd: number;
  condition: "new" | "like-new" | "good" | "fair";
  category: "telescope" | "eyepiece" | "mount" | "camera" | "accessory";
  distanceKm: number;
  description: string;
  specs: string[];
  seller: SellerSummary;
  photos: string[];
}

export interface MarketplaceMessage {
  id: string;
  listingId: string;
  senderId: string;
  senderDisplayName: string;
  body: string;
  sentAtIso: string;
}

export interface SkyObjectHighlight {
  id: string;
  name: string;
  bestViewingWindow: string;
  reasonToView: string;
}

export interface TonightSky {
  id: string;
  generatedAtIso: string;
  observerLocationName: string;
  moonPhase: "new" | "waxing crescent" | "first quarter" | "waxing gibbous" | "full" | "waning gibbous" | "last quarter" | "waning crescent";
  conditions: WeatherCondition;
  topObjects: SkyObjectHighlight[];
}
