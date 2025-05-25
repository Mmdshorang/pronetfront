import { getApiUrl } from "@/common/apiUrls";
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { CompanyAdd, CompanyAddResponse } from "@/types/server/company";
import axios from "axios";
export const CompanyAddRequest = async (
    data: CompanyAdd
  ): Promise<CompanyAddResponse> => {
    // const formData = qs.stringify({
    //   email: data.email,
    //   password: data.password
    // });
    console.log(data)
    const response = await axios.post(getApiUrl("v1", "companies"), data);
    console.log(response);
    const result = response.data;
    if (result?.status === StatusCodes.Success) {
      showSnackbar(result?.message, "success");
    } else {
      showSnackbar(result?.message, "error");
    }
    console.log(result)
    return response.data;
  };


  
