"use client";
import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Login from "@/components/admin/login/page";

const Auth = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-400 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
          <Login />

        </div>
      </main>

      <Footer />
    </div>

  );
};

export default Auth;
