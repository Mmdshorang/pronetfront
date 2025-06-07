import { Achievement } from './../../types/server/user';

import { getApiUrl } from "@/common/apiUrls";
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { OKResponse } from '@/types/server/auth';
import { UpdatedUserResponse, UserUpdate } from "@/types/server/user";
import axios from "axios";
export const updateProfileRequest = async (
  data: UserUpdate
): Promise<UpdatedUserResponse> => {
 
    const formData = new FormData();
    if(data.profile_photo)
    formData.append("profile_photo", data.profile_photo);
    if (data?.name) formData.append("name", data?.name);
    if (data?.email) formData.append("email", data?.email);
    if (data?.bio) formData.append("bio", data?.bio);
    if (data?.phone) formData.append("phone", data?.phone);
    if (data?.linkedin_url) formData.append("linkedin_url", data?.linkedin_url);
    if (data?.github_url) formData.append("github_url", data?.github_url);
    if (data?.city) formData.append("city", data?.city);
    if (data?.country) formData.append("country", data?.country);
console.log(formData)
  try {
    const response = await axios.post(getApiUrl("v1", "user"), formData);

    const result = response.data;
console.log(result)

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


export const addAchievementsRequest = async (data:CreateRatingRequest) => {
  try {
 
    const response = await axios.post("Achievement",data);

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
export const deleteAchievementsRequest = async (id: number): Promise<OKResponse> => {
  try {
 
    const response = await axios.post( `Achievement/${id}`);

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


export const addskillssRequest = async (data:CreateRatingRequest) => {
  try {
 
    const response = await axios.post("Achievement",data);

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
export const deleteskillssRequest = async (id: number): Promise<OKResponse> => {
  try {
 
    const response = await axios.post( `Achievement/${id}`);

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



export const addworkhistoryRequest = async (data:CreateRatingRequest) => {
  try {
 
    const response = await axios.post("profile/work-history",data);

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
export const deleteworkhistoryRequest = async (id: number): Promise<OKResponse> => {
  try {
 
    const response = await axios.post( `profile/work-history/${id}`);

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