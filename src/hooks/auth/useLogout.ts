
"use client";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";


export const useLogout = () => {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = () => {
    clearUser();
    localStorage.removeItem("User-storage"); 
    router.push("/login"); 
  };

  return logout;
};
