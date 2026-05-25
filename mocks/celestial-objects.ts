import type { ObservationObject } from "@/lib/types";

const mockCelestialObjects: ObservationObject[] = [
  { id: "obj-010", name: "M31 Andromeda Galaxy", catalogLabel: "NGC 224", objectType: "galaxy" },
  { id: "obj-011", name: "M42 Orion Nebula", catalogLabel: "NGC 1976", objectType: "nebula" },
  { id: "obj-012", name: "M45 Pleiades", catalogLabel: "Messier 45", objectType: "cluster" },
  { id: "obj-013", name: "M13 Hercules Cluster", catalogLabel: "NGC 6205", objectType: "cluster" },
  { id: "obj-014", name: "M57 Ring Nebula", catalogLabel: "NGC 6720", objectType: "nebula" },
  { id: "obj-015", name: "Saturn", catalogLabel: "Solar System", objectType: "planet" },
  { id: "obj-016", name: "Jupiter", catalogLabel: "Solar System", objectType: "planet" },
  { id: "obj-017", name: "Albireo", catalogLabel: "Beta Cygni", objectType: "double-star" },
];

export function getMockCelestialObjects(): ObservationObject[] {
  return mockCelestialObjects;
}
