"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useSnackbarStore from "@/stores/snackbarStore";
import { updateProfileRequest } from "@/services/user/updaeProfile";
import { UpdatedUserResponse, UserUpdate } from "@/types/server/user";
import { useUserInfoStore } from "@/stores/userStore";
export const useUpdateProfileRequest = () => {
  const { show } = useSnackbarStore();
    const updateUserInfo = useUserInfoStore((state) => state.updateUserInfo);
  const mutation = useMutation<UpdatedUserResponse, AxiosError, UserUpdate >({
    mutationFn: (data) => updateProfileRequest(data),
   onSuccess:(data)=>{
      updateUserInfo(data.data)
   },
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};
