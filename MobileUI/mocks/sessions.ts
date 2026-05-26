import type { ObservationSession } from "@/lib/types";
import { getMockCurrentUser } from "@/mocks/user";

const user = getMockCurrentUser();

const mockSessions: ObservationSession[] = [
  {
    id: "session-001",
    userId: user.id,
    dateIso: "2026-05-21T02:30:00.000Z",
    locationName: "Gillson Park Lakeshore",
    location: {
      latitude: 42.0609,
      longitude: -87.6762,
    },
    weather: {
      cloudCoverPercent: 18,
      seeingScale: 4,
      transparencyScale: 3,
      temperatureC: 11,
      humidityPercent: 62,
    },
    observedObjects: [
      {
        id: "obj-001",
        name: "M13 Hercules Cluster",
        catalogLabel: "NGC 6205",
        objectType: "cluster",
      },
      {
        id: "obj-002",
        name: "M57 Ring Nebula",
        catalogLabel: "NGC 6720",
        objectType: "nebula",
      },
    ],
    equipmentUsed: [user.equipment[0], user.equipment[2], user.equipment[4]],
    notes:
      "Transparency improved after 11:00 PM. M57 showed clear annular shape with 10mm eyepiece and steady seeing.",
    photoPlaceholders: ["session-001-photo-1", "session-001-photo-2"],
  },
  {
    id: "session-002",
    userId: user.id,
    dateIso: "2026-05-18T03:00:00.000Z",
    locationName: "Skokie Lagoons East Meadow",
    location: {
      latitude: 42.1295,
      longitude: -87.7412,
    },
    weather: {
      cloudCoverPercent: 8,
      seeingScale: 3,
      transparencyScale: 4,
      temperatureC: 9,
      humidityPercent: 55,
    },
    observedObjects: [
      {
        id: "obj-003",
        name: "Jupiter",
        catalogLabel: "Solar System",
        objectType: "planet",
      },
      {
        id: "obj-004",
        name: "Albireo",
        catalogLabel: "Beta Cygni",
        objectType: "double-star",
      },
    ],
    equipmentUsed: [user.equipment[0], user.equipment[1], user.equipment[2]],
    notes:
      "Good contrast night. Jupiter bands were visible and Albireo color split was obvious for first-time observers.",
    photoPlaceholders: ["session-002-photo-1"],
  },
];

export function getMockSessions(): ObservationSession[] {
  return mockSessions;
}

export function getMockSessionById(sessionId: string): ObservationSession | undefined {
  return mockSessions.find((session) => session.id === sessionId);
}
