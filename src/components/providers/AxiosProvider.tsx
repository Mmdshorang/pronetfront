import React from "react";
import axios from "axios";
import { useSnackbar } from "../common/SnackbarContext";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AxiosProvider: React.FC<Props> = ({ children }) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        showSnackbar(error.response?.data?.message || "خطا در ارتباط با سرور", "error");
        return Promise.reject(error);
      }
    );
  }, [navigate, showSnackbar]);

  return <>{children}</>;
};

export default AxiosProvider;
