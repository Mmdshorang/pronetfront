import { getApiUrl } from "@/common/apiUrls";
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { AuthResponse, LoginData, RegisterData } from "@/types/server/auth";
import axios from "axios";
import qs from "qs";

export const loginRequest = async (
  data: LoginData
): Promise<AuthResponse> => {
  const formData = qs.stringify({
    email: data.email,
    password: data.password
  });
  console.log(formData)
  const response = await axios.post(getApiUrl("v1", "login"), formData);
  console.log(response);
  const result = response.data;
  
  if (result?.status === StatusCodes.Success) {
    showSnackbar(result?.message, "success");
  } else {
    showSnackbar(result?.message, "error");
  }

  return response.data;
};
export const RegisterRequest = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const formData = qs.stringify({
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
    city: data.city??null,
    country: data.country??null

  });
console.log(formData)
  const response = await axios.post(getApiUrl("v1", "register"), formData);
console.log(response)
  const result = response.data;
  console.log(result)
  if (result?.status === StatusCodes.Success) {
    showSnackbar(result?.message, "success");
  } else {
      if (result.errors) {
        if(result.errors?.email){
          showSnackbar(result.errors?.email, "error");
        }else if(result.errors?.password){
          showSnackbar(result.errors?.password, "error");
        }
      } else {
    showSnackbar("خطایی رخ داده", "error");
      }
  }
  return response.data;
};
