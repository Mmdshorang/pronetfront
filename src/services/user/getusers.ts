
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import axios from "axios";

export const getUsersRequest = async () => {
  try {
 
    const response = await axios.post("getusers");

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
