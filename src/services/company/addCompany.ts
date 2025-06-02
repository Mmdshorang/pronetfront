
import { getApiUrl } from "@/common/apiUrls";
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { CompanyAdd, CompanyAddResponse } from "@/types/server/company";
import axios from "axios";
export const CompanyAddRequest = async (
  data: CompanyAdd
): Promise<CompanyAddResponse> => {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "logo" && value) {
      fd.append("logo", value); // File
    } else {
      fd.append(key, value as string);
    }
  });


    const response = await axios.post(getApiUrl("v1", "companyCreate"), fd, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    const result = response.data;
    if (result?.status === StatusCodes.Success) {
      showSnackbar(result?.message, "success");
    } else {
      showSnackbar(result?.message || "خطای ناشناخته", "error");
    }
    return result;

 

}



  
