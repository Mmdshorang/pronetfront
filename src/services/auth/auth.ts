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
  console.log(result)
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
    role: data.role,
    location: data.location

  });
console.log(formData)
  const response = await axios.post(getApiUrl("v1", "register"), formData);
console.log(response)
  const result = response.data.Resault;
  if (result?.StatusCode === StatusCodes.Success) {
    showSnackbar(result?.StatusMessage, "success");
  } else {
    console.log(result?.StatusMessage)
    showSnackbar(result?.StatusMessage, "error");
  }
  return response.data;
};
