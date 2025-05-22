"use client";
import { useMutation } from "@tanstack/react-query";
import { loginRequest, RegisterRequest } from "@/services/auth/auth";
import { AxiosError } from "axios";
import useSnackbarStore from "@/stores/snackbarStore";
import { AuthResponse, LoginData, RegisterData } from "@/types/server/auth";
import { useUserInfoStore } from "@/stores/userStore";
import {useRouter} from "next/navigation";
export const useRegisterRequest = () => {
  const { show } = useSnackbarStore();
  const mutation = useMutation<AuthResponse, AxiosError, RegisterData>({
    mutationFn: (data) => RegisterRequest(data),

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
