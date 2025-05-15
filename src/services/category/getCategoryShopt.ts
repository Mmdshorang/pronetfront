import { getApiUrl } from "@/common/apiUrls";
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { categorymodel } from "@/types/server/category";
import axios from "axios";

export const getCategoryShopRequest = async (): Promise<categorymodel[]> => {
  const response = await axios.get(getApiUrl("v1", "GetCategoryShop"));

  const result = response.data?.ResaultClass;
  if (result?.StatusCode !== StatusCodes.Success) {
    showSnackbar(result?.StatusMessage || "خطایی رخ داده", "error");
  }
  return response.data?.categorymodels || [];
};
