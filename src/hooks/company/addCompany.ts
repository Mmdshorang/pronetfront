"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useSnackbarStore from "@/stores/snackbarStore";
import { CompanyAddRequest, companyaddUserRequest, companydeleteRequest } from "@/services/company/addCompany";
import { AddUserToCompanyResponse, CompanyAdd, CompanyMutationResponse } from "@/types/server/company";
import { AddUserInput } from "@/types/server/user";
import { OKResponse } from "@/types/server/auth";
export const useCompanyAddRequest = () => {
  const { show } = useSnackbarStore();
  const mutation = useMutation<CompanyMutationResponse, AxiosError, CompanyAdd >({
    mutationFn: (data) => CompanyAddRequest(data),

    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};
export const useDeleteCompanyUser = () => {
  return useMutation<OKResponse, Error, number>({
    mutationFn: (id: number) => companydeleteRequest(id),
  });
};

export const useAddUserToCompany = () => {
  return useMutation<AddUserToCompanyResponse, Error, { id: number; data: AddUserInput }>({
    mutationFn: ({ id, data }) => companyaddUserRequest(data, id),
  });
};