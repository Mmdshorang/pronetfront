
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { CreateRatingRequest } from "@/types/model/type";
import axios from "axios";

export const addRatingRequest = async (data:CreateRatingRequest) => {
  try {
 
    const response = await axios.post("ratings",data);

    console.log(response);

    const result = response.data;
    if (result?.status === StatusCodes.Success) {
      showSnackbar(result?.message, "success");
    } else {
      showSnackbar(result?.message, "error");
    }

    return result;
  } catch (error) {
    console.error(error);
    showSnackbar("خطا در ارسال درخواست", "error");
    throw error;  // رها کردن خطا برای مدیریت در جایی دیگر
  }
};
