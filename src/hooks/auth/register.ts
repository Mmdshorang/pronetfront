"use client";

import { useMutation } from "@tanstack/react-query";

import { RegisterRequest } from "@/services/auth/auth";
import { Registermodel } from "@/types/server/auth";

import { AxiosError } from "axios";
import { Resault } from "@/types/server/resaultClass";
import { showSnackbar } from "@/stores/snackbarStore";


const useRegisterRequest = () => {
  const mutation = useMutation<Resault, AxiosError, Registermodel>({
    mutationFn: (data) => RegisterRequest(data),

    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });

  return mutation;
};

export default useRegisterRequest;
