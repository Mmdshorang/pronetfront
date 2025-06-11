

import { getApiUrl } from "@/common/apiUrls";
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { OKResponse } from "@/types/server/auth";
import { AddUserToCompanyResponse, CompanyAdd, CompanyMutationResponse, } from "@/types/server/company";
import { AddUserInput } from "@/types/server/user";
import axios from "axios";
export const CompanyAddRequest = async (
  data: CompanyAdd
): Promise<CompanyMutationResponse> => {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "logo" && value) {
      fd.append("logo", value); // File
    } else {
      fd.append(key, value as string);
    }
  });


    const response = await axios.post(getApiUrl("v1", "companyCreate"), fd);

    const result = response.data;
    if (result?.status === StatusCodes.Success) {
      showSnackbar(result?.message, "success");
    } else {
      showSnackbar(result?.message || "خطای ناشناخته", "error");
    }
    return result;

 

}



 export const companydeleteRequest = async (
  id:number
): Promise<OKResponse> => {
     const response = await axios.post(`/companies/${id}/users`);
    const result = response.data;
    if (result?.status === StatusCodes.Success) {
      showSnackbar(result?.message, "success");
    } else {
      showSnackbar(result?.message || "خطای ناشناخته", "error");
    }
    return result;

}

 
 export const companyaddUserRequest = async (
  data:AddUserInput,
  id:number
): Promise<AddUserToCompanyResponse> => {
     const response = await axios.post(`/companies/${id}/users`,data);
    const result = response.data;
    if (result?.status === StatusCodes.Success) {
      showSnackbar(result?.message, "success");
    } else {
      showSnackbar(result?.message || "خطای ناشناخته", "error");
    }
    return result;

}

 