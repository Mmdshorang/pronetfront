"use client";
import React, { useState } from "react";
import { createRegisterPayload } from "@/types/common/createRegisterPayload";
import useRegisterRequest from "@/hooks/auth/register";
import { validatePhoneNumber } from "@/util/validatePhoneNumber";
import { StatusCodes } from "@/types/model/generic";
import { showSnackbar } from "@/stores/snackbarStore";

interface Props {
  onSuccess: () => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}

const PhoneNumberStep: React.FC<Props> = ({ onSuccess, phoneNumber, setPhoneNumber }) => {
  const [error, setError] = useState("");
  const { mutate, isPending } = useRegisterRequest();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    const error = validatePhoneNumber(value);
    setError(error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const error = validatePhoneNumber(phoneNumber);
    setError(error);

    if (error) return;

    const payload = createRegisterPayload(phoneNumber, "");
    mutate(payload, {
      onSuccess: (response) => {
        if (response.StatusCode === StatusCodes.Success) {
          onSuccess();
        } else {
          showSnackbar(response.StatusMessage, "error");
        }
      },
    });
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-1 rounded-2xl shadow-lg max-w-md w-full bg-white animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">ثبت‌نام با شماره موبایل</h2>

      <input
        className="border border-gray-300 rounded-xl px-5 py-4 text-right text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="شماره موبایل"
        value={phoneNumber}
        onChange={handleChange}
        disabled={isPending}
      />

      {error && (
        <p className="text-red-500 text-sm animate-shake">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 transition-all text-white font-medium py-5 rounded-xl shadow-md"
      >
        {isPending ? "در حال ارسال..." : "دریافت کد تایید"}
      </button>
    </form>

  );
};

export default PhoneNumberStep;
