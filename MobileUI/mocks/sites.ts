import type { StargazingSite } from "@/lib/types";

const mockStargazingSites: StargazingSite[] = [
  {
    id: "site-001",
    name: "Gillson Park North Pier",
    location: { latitude: 42.0641, longitude: -87.6787 },
    lightPollutionRating: 4,
    notes: "Open horizon over the lake, moderate city glow behind.",
  },
  {
    id: "site-002",
    name: "Skokie Lagoons East Meadow",
    location: { latitude: 42.1289, longitude: -87.7431 },
    lightPollutionRating: 3,
    notes: "Good tree cover from nearby street lighting.",
  },
  {
    id: "site-003",
    name: "Northerly Island Point",
    location: { latitude: 41.8623, longitude: -87.6078 },
    lightPollutionRating: 5,
    notes: "Convenient access, but strongest light pollution of saved sites.",
  },
];

export function getMockStargazingSites(): StargazingSite[] {
  return mockStargazingSites;
}
