import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      phone: "",
      otp: "",
      isLoggedIn: false,

      setPhone: (phone) => set({ phone }),
      setOTP: (otp) => set({ otp }),
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          phone: "",
          otp: "",
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
