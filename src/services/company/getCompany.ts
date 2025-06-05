
import { showSnackbar } from "@/stores/snackbarStore";
import { StatusCodes } from "@/types/model/generic";
import {  CompanyShowResponse, getCompaniesResponse } from "@/types/server/company";
import axios from "axios";

  export const GetCompanyRequest = async (page: number = 1): Promise<getCompaniesResponse> => {
    
    const response = await axios.post(`/get-companies?page=${page}`);
    console.log(response)
    const result = response.data;
console.log(result)
    if (result?.status === StatusCodes.Success) {
        showSnackbar(result?.message, "success");
      } else {
        showSnackbar(result?.message, "error");
      }
    return response.data;
  };
  
  export const GetCompanyByIDRequest = async (id: number): Promise<CompanyShowResponse> => {
    try {
      const response = await axios.post(`/companies/${id}`);
      const result = response.data;
  
      if (result?.status === StatusCodes.Success) {
        showSnackbar(result?.message, "success");
      } else {
        showSnackbar(result?.message, "error");
      }
  
      return result;
    } catch (error) {
      console.error("Error fetching company:", error);
      showSnackbar("Failed to fetch company data", "error");
      throw error; // یا می‌توانید هر نوع خطای دلخواه خود را پرتاب کنید.
    }
  };
  
  

   export const deleteCompaniesRequest = async (id: number): Promise<CompanyShowResponse> => {
    try {
      const response = await axios.delete(`/companies/${id}`);
      const result = response.data;
  
      if (result?.status === StatusCodes.Success) {
        showSnackbar(result?.message, "success");
      } else {
        showSnackbar(result?.message, "error");
      }
  
      return result;
    } catch (error) {
      console.error("Error fetching company:", error);
      showSnackbar("Failed to fetch company data", "error");
      throw error; // یا می‌توانید هر نوع خطای دلخواه خود را پرتاب کنید.
    }
  };
  
  