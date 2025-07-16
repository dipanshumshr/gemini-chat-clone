import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    set => ({
      theme: "light",
      toggleTheme: () => {
        set(state => {
          const next = state.theme === "light" ? "dark" : "light";
          localStorage.theme = next;
          return { theme: next };
        });
      }
    }),
    {
      name: "theme-storage"
    }
  )
);

export default useThemeStore;
