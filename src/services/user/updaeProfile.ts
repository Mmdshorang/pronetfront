import {  WorkHistoryInput, WorkHistorySuccessResponse } from './../../types/server/user';


import { getApiUrl } from "@/common/apiUrls";
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import { OKResponse } from '@/types/server/auth';
import { Achievement, AchievementResponse, Skill, UpdatedUserResponse, UserUpdate } from "@/types/server/user";
import axios from "axios";
export const updateProfileRequest = async (
  data: UserUpdate
): Promise<UpdatedUserResponse> => {
 
    const formData = new FormData();
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
export const updateProfileImageRequest = async (
  file:File | null
): Promise<OKResponse> => {
 console.log(file)
    const formData = new FormData();
        if(file)
        formData.append("profile_photo", file);

console.log(formData)
  try {
    const response = await axios.post('upload-profile-photo', formData);

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

export const addAchievementsRequest = async (data:Achievement): Promise<AchievementResponse> => {
  try {
 
    const response = await axios.post("achievements",data);

    console.log(response);

    const result = response.data;
    if (result?.status === StatusCodes.Success) {
      showSnackbar(result?.message, "success");
      return result;
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
 
    const response = await axios.post( `achievements/${id}`);

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


export const addskillssRequest = async (name:string): Promise<Skill[]>  => {
  try {
    const formData = new FormData();
    if (name) formData.append("name", name);
    const response = await axios.post("skills",formData);

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
 
    const response = await axios.post( `skills/${id}`);

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



export const addworkhistoryRequest = async (data:WorkHistoryInput): Promise<WorkHistorySuccessResponse> => {
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



// ورودی برای افزودن یا ویرایش، دقیقاً مطابق با ساختار فرم


// --- توابع API ---

/**
 * افزودن سابقه شغلی جدید
 */
export const addWorkHistoryRequest = async (data: WorkHistoryInput): Promise<WorkHistorySuccessResponse> => {
  try {
    // URL صحیح: /api/profile/work-history
    const response = await axios.post<WorkHistorySuccessResponse>("work-history", data);
    showSnackbar(response.data.message, "success");
    return response.data;
  } catch (error) {
    console.error("Error adding work history:", error);
    showSnackbar("خطا در افزودن سابقه شغلی", "error");
    throw error;
  }
};

/**
 * ویرایش سابقه شغلی موجود
 */
export const updateWorkHistoryRequest = async (id: number, data: WorkHistoryInput): Promise<WorkHistorySuccessResponse> => {
  try {
    // متد PUT برای ویرایش
    // URL صحیح: /api/profile/work-history/{id}
    const response = await axios.put<WorkHistorySuccessResponse>(`work-history/${id}`, data);
    showSnackbar(response.data.message, "success");
    return response.data;
  } catch (error) {
    console.error("Error updating work history:", error);
    showSnackbar("خطا در ویرایش سابقه شغلی", "error");
    throw error;
  }
};


/**
 * حذف سابقه شغلی
 */
export const deleteWorkHistoryRequest = async (id: number): Promise<OKResponse> => {
  try {
    // متد صحیح برای حذف، DELETE است
    // URL صحیح: /api/profile/work-history/{id}
    const response = await axios.delete<OKResponse>(`work-history/${id}`);
    showSnackbar(response.data.message, "success");
    return response.data;
  } catch (error) {
    console.error("Error deleting work history:", error);
    showSnackbar("خطا در حذف سابقه شغلی", "error");
    throw error;
  }
};