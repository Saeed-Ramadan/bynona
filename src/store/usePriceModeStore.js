import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePriceModeStore = create()(
  persist(
    (set) => ({
      priceMode: "retail", // "retail" or "wholesale"
      setPriceMode: (mode) => set({ priceMode: mode }),
      togglePriceMode: () =>
        set((state) => ({
          priceMode: state.priceMode === "retail" ? "wholesale" : "retail",
        })),
    }),
    {
      name: "price-mode-storage",
    },
  ),
);
