import type { EquipmentItem } from "@/lib/types";

const mockEquipmentCatalog: EquipmentItem[] = [
  { id: "cat-001", brand: "Celestron", model: "EdgeHD 8", category: "telescope" },
  { id: "cat-002", brand: "Sky-Watcher", model: "Esprit 100ED", category: "telescope" },
  { id: "cat-003", brand: "William Optics", model: "Zenithstar 73", category: "telescope" },
  { id: "cat-004", brand: "ZWO", model: "ASI533MC Pro", category: "camera" },
  { id: "cat-005", brand: "ZWO", model: "ASI2600MM Pro", category: "camera" },
  { id: "cat-006", brand: "Tele Vue", model: "Nagler 13mm", category: "eyepiece" },
  { id: "cat-007", brand: "Explore Scientific", model: "82deg 14mm", category: "eyepiece" },
  { id: "cat-008", brand: "Sky-Watcher", model: "EQ6-R Pro", category: "mount" },
  { id: "cat-009", brand: "iOptron", model: "CEM26", category: "mount" },
  { id: "cat-010", brand: "Baader", model: "UHC-S Filter", category: "filter" },
  { id: "cat-011", brand: "Optolong", model: "L-Extreme", category: "filter" },
  { id: "cat-012", brand: "Pegasus", model: "Powerbox Advance", category: "accessory" },
];

export function getMockEquipmentCatalog(): EquipmentItem[] {
  return mockEquipmentCatalog;
}

export function searchMockEquipmentCatalog(query: string): EquipmentItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return mockEquipmentCatalog;
  }

  return mockEquipmentCatalog.filter((equipmentItem) => {
    const brandMatches = equipmentItem.brand.toLowerCase().includes(normalizedQuery);
    const modelMatches = equipmentItem.model.toLowerCase().includes(normalizedQuery);
    return brandMatches || modelMatches;
  });
}
