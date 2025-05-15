import { getApiUrl } from "@/common/apiUrls";
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { ProductDto } from "@/types/server/productsType";
import axios from "axios";

export const getBestSellGoodRequest = async (): Promise<ProductDto[]> => {
console.log(getApiUrl("v1", "GetBestSellGood"))

  const response = await axios.get(getApiUrl("v1", "GetBestSellGood"));
console.log(response)
  const result = response.data?.ResaultClass;
  if (result?.StatusCode !== StatusCodes.Success) {
    showSnackbar(result?.StatusMessage || "خطایی رخ داده", "error");
  }
  console.log(response.data);
  return response.data?.productmodels || [];
};
