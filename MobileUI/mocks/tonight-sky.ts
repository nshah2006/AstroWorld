import type { TonightSky } from "@/lib/types";

const mockTonightSky: TonightSky = {
  id: "tonight-sky-001",
  generatedAtIso: "2026-05-24T23:00:00.000Z",
  observerLocationName: "Evanston, IL",
  moonPhase: "first quarter",
  conditions: {
    cloudCoverPercent: 22,
    seeingScale: 3,
    transparencyScale: 4,
    temperatureC: 12,
    humidityPercent: 58,
  },
  topObjects: [
    {
      id: "highlight-001",
      name: "M3 Globular Cluster",
      bestViewingWindow: "10:10 PM - 1:40 AM",
      reasonToView: "High altitude early with good contrast despite quarter moon.",
    },
    {
      id: "highlight-002",
      name: "Cor Caroli",
      bestViewingWindow: "9:45 PM - 12:30 AM",
      reasonToView: "Stable seeing forecast makes the color split easier to resolve.",
    },
    {
      id: "highlight-003",
      name: "M51 Whirlpool Galaxy",
      bestViewingWindow: "11:20 PM - 2:10 AM",
      reasonToView: "Low cloud band clears after midnight over the northwestern horizon.",
    },
  ],
};

export function getMockTonightSky(): TonightSky {
  return mockTonightSky;
}
