// app/providers/AxiosProvider.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useSnackbarStore from "@/stores/snackbarStore";
import { useUserInfoStore } from "@/stores/userStore";

// import { useUserInfoStore } from "@/stores/loginStore";


interface Props {
  children: React.ReactNode;
}

const AxiosProvider = ({ children }: Props) => {
  const [baseURL, setBaseURL] = useState<string | null>(null);
   const token = useUserInfoStore((state) => state.token);
  const router = useRouter();

  const { show } = useSnackbarStore();
  const handleUnauthorized = useCallback(() => {
    // useUserInfoStore.getState().clearUser();
    show("توکن نامعتبر است. لطفا دوباره وارد شوید.", "error");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, [router, show]);

  const handleError = useCallback(
    (error: AxiosError) => {
      console.log(error);
      if (!error.response) {
        show("شما آفلاین هستید. اتصال خود را بررسی کنید.", "error");
      }
    },
    [show]
  );

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((data) => {
        setBaseURL(data.apiUrl);
      })
      .catch(() => {
        show("خطا در بارگذاری تنظیمات سرور", "error");
      });
  }, [show]);

  useEffect(() => {
    if (!baseURL) return;

    axios.defaults.baseURL = `${baseURL}/api/`;

    if (token && token.trim()) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        const statusCode = response.data?.Resault?.StatusCode;
        if (statusCode === 401) {
          handleUnauthorized();
        }
        return response;
      },
      (error) => {
        handleError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [baseURL, handleError, handleUnauthorized]);
//add token in useEffect
  if (!baseURL) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AxiosProvider;
