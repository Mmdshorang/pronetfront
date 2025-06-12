"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useSnackbarStore from "@/stores/snackbarStore";
import { UserListResponse, UserProfileDataResponse } from "@/types/model/type";
import { getUserByIdRequest, getUsersRequest } from "@/services/user/getusers";
import useUserStore from "@/stores/employStore";
export const useEmployRequest = () => {
  const { show } = useSnackbarStore();

  const setUsers=useUserStore((state)=>state.setUsers)
  const mutation = useMutation<UserListResponse, AxiosError >({
    mutationFn: () => getUsersRequest(),
   onSuccess:(data)=>{
    show(data.message, "success");
     setUsers(data.data??{users:[],total:0,current_page:1,per_page:10})
     return data.data;
   },
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};


export const useUserGetByIDRequest = () => {
  const { show } = useSnackbarStore();


  const mutation = useMutation<
  UserProfileDataResponse,
    AxiosError,
    number // 👈 page number as argument
  >({
    mutationFn: (id) => getUserByIdRequest(id),
    onError: (error) => {
      show(error.message, "error");
    },
  });

  return mutation;
};


  