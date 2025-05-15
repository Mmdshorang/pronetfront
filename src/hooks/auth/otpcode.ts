"use client";

import { useMutation } from "@tanstack/react-query";

import { FirstRegisterRequest } from "@/services/auth/auth";
import { Registermodel } from "@/types/server/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { StatusCodes } from "@/types/model/generic";
import useSnackbarStore from "@/stores/snackbarStore";
import { useUserStore } from "@/stores/userStore";
import { UserModel } from "@/types/server/user";
const useOtpCodeRequest = () => {
  const router = useRouter();
  const { show } = useSnackbarStore();
  const { setUser } = useUserStore();
  const mutation = useMutation<UserModel, AxiosError, Registermodel>({
    mutationFn: (data) => FirstRegisterRequest(data),
    onSuccess: (data) => {
      if (data.Resault.StatusCode === StatusCodes.Success) {
        setUser(data.Registermodel);
        router.push("/");
      }
    },
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};

export default useOtpCodeRequest;
