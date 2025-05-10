// src/api/userApi.ts
import axios from 'axios';
import type { CreateUserPayload, PaginatedResponse, UpdateUserPayload, UserType } from '../types/loginType';



export const fetchUsers = async (page: number = 1) => {
  const res = await axios.get<PaginatedResponse<UserType>>(`/users?page=${page}`);
  return res.data;
};

export const createUser = async (data: CreateUserPayload) => {
  console.log(data)
  const res = await axios.post<UserType>('/users', data);
  console.log(res)
  return res.data;
};

export const updateUser = async ({ id, data }: { id: number; data: UpdateUserPayload }) => {
  const res = await axios.put<UserType>(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await axios.delete(`/users/${id}`);
  return res.data;
};
