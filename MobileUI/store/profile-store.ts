import { create } from "zustand";

import type { EquipmentItem, User } from "@/lib/types";
import { getMockCurrentUser } from "@/mocks";

export interface ProfileStore {
  currentUser: User;
  isOnboarded: boolean;
  addEquipmentToProfile: (equipmentItem: EquipmentItem) => void;
  removeEquipmentFromProfile: (equipmentId: string) => void;
  refreshCurrentUserFromMocks: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  currentUser: getMockCurrentUser(),
  isOnboarded: false,
  addEquipmentToProfile: (equipmentItem) =>
    set((state) => {
      const alreadyExists = state.currentUser.equipment.some(
        (existingEquipment) => existingEquipment.id === equipmentItem.id,
      );
      if (alreadyExists) {
        return state;
      }

      return {
        currentUser: {
          ...state.currentUser,
          equipment: [...state.currentUser.equipment, equipmentItem],
        },
      };
    }),
  removeEquipmentFromProfile: (equipmentId) =>
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        equipment: state.currentUser.equipment.filter((equipmentItem) => equipmentItem.id !== equipmentId),
      },
    })),
  refreshCurrentUserFromMocks: () =>
    set(() => ({
      currentUser: getMockCurrentUser(),
    })),
  completeOnboarding: () =>
    set(() => ({
      isOnboarded: true,
    })),
  resetOnboarding: () =>
    set(() => ({
      isOnboarded: false,
    })),
}));
