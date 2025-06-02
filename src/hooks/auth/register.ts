"use client";
import { useMutation } from "@tanstack/react-query";
import { loginRequest, RegisterRequest } from "@/services/auth/auth";
import { AxiosError } from "axios";
import useSnackbarStore from "@/stores/snackbarStore";
import { AuthResponse, LoginData, RegisterData } from "@/types/server/auth";
import { useUserInfoStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
export const useRegisterRequest = () => {
  const { show } = useSnackbarStore();
  const router =useRouter()
  const mutation = useMutation<AuthResponse, AxiosError, RegisterData>({
    mutationFn: (data) => RegisterRequest(data),
    onSuccess: (data) => {
      if(data.status === "success") {
        show(data.message, "success");
        router.push("/")
      }
    },
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};

export const useLoginRequest = () => {
  const { show } = useSnackbarStore();
  const { addUser } = useUserInfoStore();
  const router = useRouter();
  const mutation = useMutation<AuthResponse, AxiosError, LoginData>({
    mutationFn: (data) => loginRequest(data),

    onSuccess: (data) => {
      
      if (data.status === "success") {
        addUser(data.data.user, data.data.token);
        router.push("/");
      }
    },
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};

export const useLoginAdminRequest = () => {
  const { show } = useSnackbarStore();
  const { addUser } = useUserInfoStore();
  const router = useRouter();
  const mutation = useMutation<AuthResponse, AxiosError, LoginData>({
    mutationFn: (data) => loginRequest(data),
    onSuccess: (data) => {
      if (data.status === "success") {
        if (data.data.user.role === "admin") {
          addUser(data.data.user, data.data.token);
          router.replace("/admin/home");
        } else {
          show("شما ادمین نیستید", "error");

        }

      }
    },
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};
