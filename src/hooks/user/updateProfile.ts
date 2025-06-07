"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useSnackbarStore from "@/stores/snackbarStore";
import { updateProfileRequest } from "@/services/user/updaeProfile";
import { UpdatedUserResponse, UserUpdate } from "@/types/server/user";
import { useUserInfoStore } from "@/stores/userStore";
export const useUpdateProfileRequest = () => {
  const { show } = useSnackbarStore();
    const updateUserInfo2 = useUserInfoStore((state) => state.updateUserInfo2);
  const mutation = useMutation<UpdatedUserResponse, AxiosError, UserUpdate >({
    mutationFn: (data) => updateProfileRequest(data),
   onSuccess:(data)=>{
      updateUserInfo2(data.data)

       show(data.message, "success");
   },
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};
