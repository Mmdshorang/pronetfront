"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useSnackbarStore from "@/stores/snackbarStore";
import { getCompaniesResponse, getCompanyByIdResponse } from "@/types/server/company";
import { GetCompanyByIDRequest, GetCompanyRequest } from "@/services/company/getCompany";
import useCompanyStore from "@/stores/companyStore";

export const useCompanyGetRequest = () => {
  const { show } = useSnackbarStore();

  const mutation = useMutation<
    getCompaniesResponse,
    AxiosError,
    number // 👈 page number as argument
  >({
    mutationFn: (page) => GetCompanyRequest(page),

    onSuccess: (data) => {
      if (data.status === "success") {
        useCompanyStore.getState().setCompanies(data.data);
      }
    },

    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};


export const useCompanyGetByIDRequest = () => {
  const { show } = useSnackbarStore();


  const mutation = useMutation<
  getCompanyByIdResponse,
    AxiosError,
    number // 👈 page number as argument
  >({
    mutationFn: (id) => GetCompanyByIDRequest(id),
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};


  