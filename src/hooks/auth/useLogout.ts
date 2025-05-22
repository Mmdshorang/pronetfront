
"use client";

import { useUserInfoStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";


export const useLogout = () => {
  const router = useRouter();
  const clearUser = useUserInfoStore((state) => state.clearUser);

  const logout = () => {
    clearUser();
    localStorage.removeItem("User-storage"); 
    router.push("/login"); 
  };

  return logout;
};
