import useOtpCodeRequest from "@/hooks/auth/otpcode";
import { createRegisterPayload } from "@/types/common/createRegisterPayload";
import { ArrowRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  onBack: () => void;
  phoneNumber: string;

}
const OtpCodeStep: React.FC<Props> = ({ onBack, phoneNumber }) => {
  const [seconds, setSeconds] = useState(120);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { mutate, isPending } = useOtpCodeRequest();

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const code = [...otp].reverse().join("");
      if (code.length === otp.length) {
        const payload = createRegisterPayload(phoneNumber, code);
        mutate(payload);
      }
    },
    [otp, phoneNumber, mutate]
  );
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // حرکت فوکوس به input سمت چپ
    if (value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // اگر خالی بود و Backspace زد، برو به input سمت راست
    if (e.key === "Backspace" && !otp[index] && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleSubmit();
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [handleSubmit]);




  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 md:p-10 text-center"
    >
      <div className="text-gray-700 text-sm mb-2">
        کد پیامک‌شده به شماره <span className="font-bold">{phoneNumber}</span> را وارد کنید
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-4 flex-row">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            autoFocus={index === 3} // فوکوس روی اولین input (چپ‌ترین)
            dir="ltr"
            className="w-12 h-12 text-center border border-gray-300 rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>



      {/* Timer */}
      <div className="text-sm text-gray-500">
        {seconds > 0 ? (
          <>
            ارسال مجدد کد تا{" "}
            <span className="font-bold">
              {Math.floor(seconds / 60)
                .toString()
                .padStart(2, "0")}
              :
              {(seconds % 60).toString().padStart(2, "0")}
            </span>
          </>
        ) : (
          <button
            onClick={() => {
              // ارسال مجدد کد
              setSeconds(120);
              console.log("ارسال مجدد کد");
            }}
            type="button"
            className="text-blue-600 hover:underline"
          >
            ارسال مجدد کد
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-gray-700 font-medium hover:text-black-600 transition-colors bg-orange-300 hover:bg-orange-400  py-2 px-6 rounded-xl shadow-lg"
        >
          <ArrowRight size={16} className="ml-1" />
          بازگشت
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl shadow-lg transition-all ${isPending ? "opacity-60 cursor-not-allowed" : ""
            }`}
        >
          {isPending && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          )}
          {isPending ? "در حال ارسال..." : "تایید"}
        </button>

      </div>
    </form>
  );
};

export default OtpCodeStep;