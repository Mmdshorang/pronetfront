"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useSnackbarStore from "@/stores/snackbarStore";
import { SearchResponse } from "@/types/server/user";
import { searchRequest } from "@/services/user/search";

export const useSearchRequest = () => {
  const { show } = useSnackbarStore();
  
  const mutation = useMutation<SearchResponse, AxiosError, string>({
    mutationFn: (query) => searchRequest(query),  // استفاده از تابعی که جستجو را انجام می‌دهد

    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};
