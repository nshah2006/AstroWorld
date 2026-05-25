import type { User } from "@/lib/types";

const mockUser: User = {
  id: "user-001",
  displayName: "Nirmal Shah",
  handle: "@nirmal",
  approximateLocation: "Evanston, IL",
  avatarInitials: "NS",
  bio: "Weekend stargazer focused on lunar and deep-sky sessions.",
  stats: {
    totalSessions: 48,
    followingCount: 31,
    observedObjectCount: 126,
  },
  equipment: [
    {
      id: "eq-001",
      brand: "Celestron",
      model: "NexStar 8SE",
      category: "telescope",
      notes: "Primary SCT for suburban nights.",
    },
    {
      id: "eq-002",
      brand: "Sky-Watcher",
      model: "HEQ5 Pro",
      category: "mount",
    },
    {
      id: "eq-003",
      brand: "Tele Vue",
      model: "Delos 10mm",
      category: "eyepiece",
    },
    {
      id: "eq-004",
      brand: "ZWO",
      model: "ASI585MC",
      category: "camera",
    },
    {
      id: "eq-005",
      brand: "Baader",
      model: "Moon & Skyglow Filter",
      category: "filter",
    },
  ],
};

export function getMockCurrentUser(): User {
  return mockUser;
}
