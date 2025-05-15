
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import ConfirmDialog from "./ConfirmDialog";


interface ConfirmOptions {
  title?: string;
  message: string;
  onConfirm: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  messageColor?: string;
  isButtonClose?: boolean;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error("useConfirm must be used within ConfirmProvider");
  return context.confirm;
};

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [open, setOpen] = useState(false);

  const confirm = (opts: ConfirmOptions) => {
    setOptions(() => opts);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    options?.onConfirm?.();
    setOpen(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {options && (
        <ConfirmDialog
          open={open}
          onClose={handleClose}
          title={options.title || "تایید عملیات"}
          message={options.message}
          onConfirm={handleConfirm}
          confirmButtonText={options.confirmButtonText}
          cancelButtonText={options.cancelButtonText}
          messageColor={options.messageColor}
          isButtonClose={options.isButtonClose}
        />
      )}
    </ConfirmContext.Provider>
  );
};
