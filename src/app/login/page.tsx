"use client";
import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PhoneNumberStep from "@/components/auth/PhoneNumberStep";
import OtpCodeStep from "@/components/auth/OtpCodeStep";

const Login = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-400 flex flex-col">
    <Navbar />
  
    {/* این بخش، فضای باقی‌مانده رو پر می‌کنه و فرم رو وسط نگه می‌داره */}
    <main className="flex-grow flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          {step === "phone" ? "ورود به حساب" : "تایید کد پیامک"}
        </h2>
  
        {step === "phone" ? (
          <PhoneNumberStep
            onSuccess={() => setStep("otp")}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        ) : (
          <OtpCodeStep
            onBack={() => setStep("phone")}
            phoneNumber={phoneNumber}
          />
        )}
      </div>
    </main>
  
    <Footer />
  </div>
  
  );
};

export default Login;
