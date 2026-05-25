import { create } from "zustand";

import type { ObservationObject, WeatherCondition, EquipmentItem } from "@/lib/types";

export interface SessionDraft {
  weather: WeatherCondition | null;
  observedObjects: ObservationObject[];
  equipmentUsed: EquipmentItem[];
  notes: string;
  shareToCommunity: boolean;
}

export interface SessionDraftStore {
  draft: SessionDraft;
  setWeather: (weather: WeatherCondition) => void;
  addObservedObject: (observationObject: ObservationObject) => void;
  removeObservedObject: (objectId: string) => void;
  addEquipment: (equipmentItem: EquipmentItem) => void;
  removeEquipment: (equipmentId: string) => void;
  setNotes: (notes: string) => void;
  setShareToCommunity: (shareToCommunity: boolean) => void;
  clearDraft: () => void;
}

const initialDraft: SessionDraft = {
  weather: null,
  observedObjects: [],
  equipmentUsed: [],
  notes: "",
  shareToCommunity: false,
};

export const useSessionDraftStore = create<SessionDraftStore>((set) => ({
  draft: initialDraft,
  setWeather: (weather) =>
    set((state) => ({
      draft: {
        ...state.draft,
        weather,
      },
    })),
  addObservedObject: (observationObject) =>
    set((state) => {
      const exists = state.draft.observedObjects.some((existingObject) => existingObject.id === observationObject.id);
      if (exists) {
        return state;
      }

      return {
        draft: {
          ...state.draft,
          observedObjects: [...state.draft.observedObjects, observationObject],
        },
      };
    }),
  removeObservedObject: (objectId) =>
    set((state) => ({
      draft: {
        ...state.draft,
        observedObjects: state.draft.observedObjects.filter((observationObject) => observationObject.id !== objectId),
      },
    })),
  addEquipment: (equipmentItem) =>
    set((state) => {
      const exists = state.draft.equipmentUsed.some((existingEquipment) => existingEquipment.id === equipmentItem.id);
      if (exists) {
        return state;
      }

      return {
        draft: {
          ...state.draft,
          equipmentUsed: [...state.draft.equipmentUsed, equipmentItem],
        },
      };
    }),
  removeEquipment: (equipmentId) =>
    set((state) => ({
      draft: {
        ...state.draft,
        equipmentUsed: state.draft.equipmentUsed.filter((equipmentItem) => equipmentItem.id !== equipmentId),
      },
    })),
  setNotes: (notes) =>
    set((state) => ({
      draft: {
        ...state.draft,
        notes,
      },
    })),
  setShareToCommunity: (shareToCommunity) =>
    set((state) => ({
      draft: {
        ...state.draft,
        shareToCommunity,
      },
    })),
  clearDraft: () =>
    set(() => ({
      draft: initialDraft,
    })),
}));
