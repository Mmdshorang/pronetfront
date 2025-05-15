"use client";

import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  messageColor?: string;
  isButtonClose?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmButtonText = "ثبت",
  cancelButtonText = "لغو",
  messageColor = "#000",
  isButtonClose = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6"
        dir="rtl"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-base mb-6" style={{ color: messageColor }}>
          {message}
        </p>

        <div className="flex justify-center gap-4">
          {!isButtonClose && (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition min-w-[100px]"
            >
              {cancelButtonText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition min-w-[100px]"
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
