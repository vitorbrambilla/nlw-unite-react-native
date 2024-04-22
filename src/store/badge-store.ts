import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type BadgeStore = {
  id: string;
  name: string;
  email: string;
  eventTitle: string;
  checkInURL: string;
  image?: string;
};

type StateProps = {
  data: BadgeStore | null;
  save: (data: BadgeStore) => void;
  remove: () => void;
  updateAvatar: (uri: string) => void;
};

export const useBadgeStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,

      save: (data: BadgeStore) => set(() => ({ data })),
      remove: () => set(() => ({ data: null })),
      updateAvatar: (uri: string) =>
        set((state) => ({
          data: state.data ? { ...state.data, image: uri } : state.data,
        })),
    }),
    { name: "badge-store", storage: createJSONStorage(() => AsyncStorage) }
  )
);
