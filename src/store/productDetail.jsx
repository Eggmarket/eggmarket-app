import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useProductDetail = create(
  persist(
    (set, get) => ({
      product: {},
      addProduct: (payload) => set({ product: payload }),
    }),
    {
      name: "product",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useReceipt = create(
  persist(
    (set, get) => ({
      receipt: [],
      addReceipt: (payload) => {
        const currentReceipts = get().receipt;
        if (!currentReceipts.includes(payload)) {
          set({ receipt: [...currentReceipts, payload] });
        }
      },
      removeAllReceipt: () => set({ receipt: [] }),
    }),
    {
      name: "receipt",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
