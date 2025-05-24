"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useSnackbarStore from "@/stores/snackbarStore";
import { CompanyAddRequest } from "@/services/company/addCompany";
import { CompanyAdd, CompanyAddResponse } from "@/types/server/company";
export const useCompanyAddRequest = () => {
  const { show } = useSnackbarStore();
  const mutation = useMutation<CompanyAddResponse, AxiosError, CompanyAdd >({
    mutationFn: (data) => CompanyAddRequest(data),

    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};
