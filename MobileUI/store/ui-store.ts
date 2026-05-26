import { create } from "zustand";

export interface ActiveFilters {
  equipmentModel: string | null;
  marketplaceCategory: string | null;
  maxDistanceKm: number | null;
}

export interface UIStore {
  isRedLightModeEnabled: boolean;
  activeFilters: ActiveFilters;
  toggleRedLightMode: () => void;
  setEquipmentModelFilter: (equipmentModel: string | null) => void;
  setMarketplaceCategoryFilter: (marketplaceCategory: string | null) => void;
  setMaxDistanceFilter: (distanceKm: number | null) => void;
  resetFilters: () => void;
}

const initialFilters: ActiveFilters = {
  equipmentModel: null,
  marketplaceCategory: null,
  maxDistanceKm: null,
};

export const useUIStore = create<UIStore>((set) => ({
  isRedLightModeEnabled: false,
  activeFilters: initialFilters,
  toggleRedLightMode: () =>
    set((state) => ({
      isRedLightModeEnabled: !state.isRedLightModeEnabled,
    })),
  setEquipmentModelFilter: (equipmentModel) =>
    set((state) => ({
      activeFilters: {
        ...state.activeFilters,
        equipmentModel,
      },
    })),
  setMarketplaceCategoryFilter: (marketplaceCategory) =>
    set((state) => ({
      activeFilters: {
        ...state.activeFilters,
        marketplaceCategory,
      },
    })),
  setMaxDistanceFilter: (distanceKm) =>
    set((state) => ({
      activeFilters: {
        ...state.activeFilters,
        maxDistanceKm: distanceKm,
      },
    })),
  resetFilters: () =>
    set(() => ({
      activeFilters: initialFilters,
    })),
}));
