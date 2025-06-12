import {
  AddCompanyEmployeesRequest,
  CompanyEmployeesRequest,
  DeleteCompanyEmployeesRequest,
  UpdateCompanyRequest,
} from "@/services/company/getCompanyEmployee";
import useSnackbarStore from "@/stores/snackbarStore";
import {
  CompanyAddUserInput,
  CompanyAddUserResponse,
  CompanyEmployeesResponse,
  CompanyRemoveUserSuccessResponse,
  CompanyUpdateInput,
  CompanyUpdateResponse,
} from "@/types/server/company";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCompanyEmployeesGetByIDRequest = () => {
  const { show } = useSnackbarStore();

  const mutation = useMutation<CompanyEmployeesResponse, AxiosError, number>({
    mutationFn: (id) => CompanyEmployeesRequest(id),
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};

export const useUpdateCompanyRequest = () => {
  const { show } = useSnackbarStore();

  return useMutation<
    CompanyUpdateResponse,
    AxiosError,
    { id: number; data: CompanyUpdateInput }
  >({
    mutationFn: ({ id, data }) => UpdateCompanyRequest(data, id),
    onError: (error) => {
      show(error.message, "error");
    },
  });
};

export const useAddCompanyEmployeesRequest = () => {
  const { show } = useSnackbarStore();

  return useMutation<
    CompanyAddUserResponse,
    AxiosError,
    { id: number; data: CompanyAddUserInput }
  >({
    mutationFn: ({ id, data }) => AddCompanyEmployeesRequest(id, data),
    onError: (error) => {
      show(error.message, "error");
    },
  });
};

export const useDeleteCompanyEmployeesRequest = () => {
  const { show } = useSnackbarStore();

  return useMutation<
    CompanyRemoveUserSuccessResponse,
    AxiosError,
    { companyId: number; userId: number }
  >({
    mutationFn: ({ companyId, userId }) =>
      DeleteCompanyEmployeesRequest(companyId, userId),
    onError: (error) => {
      show(error.message, "error");
    },
  });
};
