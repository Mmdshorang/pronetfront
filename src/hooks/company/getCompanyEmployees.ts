import { CompanyEmployeesRequest } from "@/services/company/getCompanyEmployee";
import useSnackbarStore from "@/stores/snackbarStore";
import { CompanyEmployeesResponse } from "@/types/server/company";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";



export const useCompanyEmployeesGetByIDRequest = () => {
    const { show } = useSnackbarStore();
  
  
    const mutation = useMutation<
    CompanyEmployeesResponse,
      AxiosError,
      number // 👈 page number as argument
    >({
      mutationFn: (id) => CompanyEmployeesRequest(id),
      onError: (error) => {
        show(error.message, "error");
      },
    });
  
    return mutation;
  };
  