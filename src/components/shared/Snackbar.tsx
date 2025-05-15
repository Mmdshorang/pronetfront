// components/shared/Snackbar.tsx
"use client";

import useSnackbarStore  from "@/stores/snackbarStore";

const Snackbar = () => {
  const { visible, message, type } = useSnackbarStore();

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg text-white text-sm font-medium transition-all duration-300 z-50
        ${type === "success" && "bg-green-500"}
        ${type === "error" && "bg-red-500"}
        ${type === "info" && "bg-blue-500"}
        ${type === "warning" && "bg-yellow-500 text-black"}
      `}
    >
      {message}
    </div>
  );
};

export default Snackbar;
