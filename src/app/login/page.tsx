"use client";
import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";


const Auth = () => {
  const [step, setStep] = useState<"register" | "login">("login");
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-400 flex flex-col">
      <Navbar />

      {/* این بخش، فضای باقی‌مانده رو پر می‌کنه و فرم رو وسط نگه می‌داره */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">


          {step === "login" ? (
            <Login  onRegister={() => setStep("register")}/>
          ) : (
            <Register
              onBack={() => setStep("login")}

            />
          )}
        </div>
      </main>

      <Footer />
    </div>

  );
};

export default Auth;
