import { create } from "zustand";

import type { EquipmentItem, User } from "@/lib/types";
import { getMockCurrentUser } from "@/mocks";

export interface ProfileStore {
  currentUser: User;
  addEquipmentToProfile: (equipmentItem: EquipmentItem) => void;
  removeEquipmentFromProfile: (equipmentId: string) => void;
  refreshCurrentUserFromMocks: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  currentUser: getMockCurrentUser(),
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
}));
