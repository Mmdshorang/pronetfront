import { getApiUrl } from "@/common/apiUrls";
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { Resault } from "@/types/server/resaultClass";
import { Registermodel } from "@/types/server/auth";
import axios from "axios";
import qs from "qs";
import { UserModel } from "@/types/server/user";
export const RegisterRequest = async (
  data: Registermodel
): Promise<Resault> => {
  const formData = qs.stringify({
    ID: data.ID,
    Name: data.Name,
    Family: data.Family,
    Mobilenumber: data.Mobilenumber,
    Tel: data.Tel,
    Address: data.Address,
    PostalCode: data.PostalCode,
    Code: data.Code,
    Tokens: data.Tokens,
  });
  const response = await axios.post(getApiUrl("v1", "Logins"), formData);
  console.log(response);
  const result = response.data;
  if (result?.StatusCode === StatusCodes.Success) {
    showSnackbar(result?.StatusMessage, "success");
  } else {
    showSnackbar(result?.StatusMessage, "error");
  }
  console.log(result)
  return response.data;
};
export const FirstRegisterRequest = async (
  data: Registermodel
): Promise<UserModel> => {
  const formData = qs.stringify({
    ID: data.ID,
    Name: data.Name,
    Family: data.Family,
    Mobilenumber: data.Mobilenumber,
    Tel: data.Tel,
    Address: data.Address,
    PostalCode: data.PostalCode,
    Code: data.Code,
    Tokens: data.Tokens,
  });
console.log(formData)
  const response = await axios.post(getApiUrl("v1", "FirstRegister"), formData);
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
