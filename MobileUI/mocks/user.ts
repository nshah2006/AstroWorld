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

const mockUsers: User[] = [
  mockUser,
  {
    id: "user-002",
    displayName: "Ari Patel",
    handle: "@ari",
    approximateLocation: "Chicago, IL",
    avatarInitials: "AP",
    bio: "Widefield astrophotography and city-friendly processing workflows.",
    stats: {
      totalSessions: 67,
      followingCount: 54,
      observedObjectCount: 149,
    },
    equipment: [
      {
        id: "eq-201",
        brand: "Sky-Watcher",
        model: "Evolux 82ED",
        category: "telescope",
      },
      {
        id: "eq-202",
        brand: "ZWO",
        model: "ASI533MC Pro",
        category: "camera",
      },
    ],
  },
  {
    id: "user-003",
    displayName: "Lena Cho",
    handle: "@lena",
    approximateLocation: "Skokie, IL",
    avatarInitials: "LC",
    bio: "Visual observer focused on doubles, lunar detail, and outreach nights.",
    stats: {
      totalSessions: 39,
      followingCount: 28,
      observedObjectCount: 92,
    },
    equipment: [
      {
        id: "eq-301",
        brand: "Canon",
        model: "EOS Ra",
        category: "camera",
      },
      {
        id: "eq-302",
        brand: "Sky-Watcher",
        model: "Star Adventurer GTi",
        category: "mount",
      },
    ],
  },
];

export function getMockCurrentUser(): User {
  return mockUser;
}

export function getMockUsers(): User[] {
  return mockUsers;
}

export function getMockUserById(userId: string): User | undefined {
  return mockUsers.find((user) => user.id === userId);
}
