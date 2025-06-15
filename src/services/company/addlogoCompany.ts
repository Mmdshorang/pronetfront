import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { OKResponse } from "@/types/server/auth";
import axios from "axios";

export const addLogoRequest = async (
  file: File | null
): Promise<OKResponse> => {
  console.log(file);
  const formData = new FormData();
  if (file) formData.append("logo", file);

  console.log(formData);
  try {
    const response = await axios.post("company/logo", formData);

    const result = response.data;
    console.log(result);

    if (result?.status === StatusCodes.Success) {
      showSnackbar(result?.message, "success");
    } else {
      showSnackbar(result?.message, "error");
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};