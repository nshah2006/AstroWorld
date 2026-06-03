import { create } from "zustand";

import type { Coordinates, StargazingSite } from "@/lib/types";
import { getMockStargazingSites } from "@/mocks";

export interface SitesStore {
  savedSites: StargazingSite[];
  selectedSiteId: string | null;
  setSelectedSiteId: (siteId: string | null) => void;
  addSite: (siteName: string, location: Coordinates, lightPollutionRating: StargazingSite["lightPollutionRating"]) => void;
}

export const useSitesStore = create<SitesStore>((set) => ({
  savedSites: getMockStargazingSites(),
  selectedSiteId: null,
  setSelectedSiteId: (siteId) =>
    set(() => ({
      selectedSiteId: siteId,
    })),
  addSite: (siteName, location, lightPollutionRating) =>
    set((state) => ({
      savedSites: [
        ...state.savedSites,
        {
          id: `site-local-${Date.now()}`,
          name: siteName,
          location,
          lightPollutionRating,
        },
      ],
    })),
}));
