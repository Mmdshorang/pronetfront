import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "../types";

interface UserInfoStore {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  addUser: (user: User, token: string) => void;
  clearUser: () => void;
}

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      token: null,

      addUser: (user, token) =>
        set(() => ({
          isLoggedIn: true,
          user,
          token,
        })),
      clearUser: () => {
        localStorage.clear();
        sessionStorage.clear();

        set(() => ({
          user: null,
          token: null,
          isLoggedIn: false,
        }));
      },
    }),
    {
      name: "userInfo",
      storage: createJSONStorage(() => sessionStorage),
      version: 0,
    }
  )
);
