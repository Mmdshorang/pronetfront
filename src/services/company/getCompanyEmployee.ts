import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { CompanyAddUserInput, CompanyAddUserResponse, CompanyEmployeesResponse, CompanyUpdateInput, CompanyUpdateResponse } from "@/types/server/company";
import axios from "axios";

export const CompanyEmployeesRequest = async (
  id: number = 1
): Promise<CompanyEmployeesResponse> => {
  const response = await axios.post(`/companies/${id}/employees`);
  console.log(response);
  const result = response.data;
  if (result?.status === StatusCodes.Success) {
    showSnackbar(result?.message, "success");
  } else {
    showSnackbar(result?.message, "error");
  }
  return response.data;
};

export const UpdateCompanyRequest = async (
  data:CompanyUpdateInput,
  id:number
): Promise<CompanyUpdateResponse> => {
  const response = await axios.put(`/companies/${id}`,data);
  console.log(response);
  const result = response.data;
  if (result?.status === StatusCodes.Success) {
    showSnackbar(result?.message, "success");
  } else {
    showSnackbar(result?.message, "error");
  }
  return response.data;
};
export const AddCompanyEmployeesRequest = async (
  id: number = 0,
  data:CompanyAddUserInput
): Promise<CompanyAddUserResponse> => {
  const response = await axios.post(`/companies/${id}/users`,data);
  console.log(response);
  const result = response.data;
  if (result?.status === StatusCodes.Success) {
    showSnackbar(result?.message, "success");
  } else {
    showSnackbar(result?.message, "error");
  }
  return response.data;
};

export const DeleteCompanyEmployeesRequest = async (
  companyId: number = 0,
  userId:number
): Promise<CompanyEmployeesResponse> => {
  const response = await axios.post(`/companies/${companyId}/users/${userId}`);
  console.log(response);
  const result = response.data;
  if (result?.status === StatusCodes.Success) {
    showSnackbar(result?.message, "success");
  } else {
    showSnackbar(result?.message, "error");
  }
  return response.data;
};
