import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserLoginType } from "../types/loginType";


interface UserInfoStore {
  isLoggedIn: boolean;
  user: UserLoginType |null;
  addUser: (user: UserLoginType, token?: string) => void;
  clearUser: () => void;
}

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      addUser: (user) =>
        set(() => ({
          isLoggedIn: true,
          user,
        })),
      clearUser: () => {
        localStorage.clear();
        sessionStorage.clear();

        set(() => ({
          user: null,
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
