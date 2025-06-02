
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { CompanyEmployeesResponse } from "@/types/server/company";
import axios from "axios";

  export const CompanyEmployeesRequest = async (id: number = 1): Promise<CompanyEmployeesResponse> => {
    
    const response = await axios.post(`/companies/${id}/employees`);
    console.log(response)
    const result = response.data;
    if (result?.status === StatusCodes.Success) {
        showSnackbar(result?.message, "success");
      } else {
        showSnackbar(result?.message, "error");
      }
    return response.data;
  };
  