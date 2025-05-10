import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useLayout from "../../hooks/useLayout";
import RtlProvider from "./RtlProvider";

export interface CustomSnackbarProps {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  duration: number;
  onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  severity,
  duration,
  onClose,
}) => {
  const { isDesktop } = useLayout();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  const getAlertStyles = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-green-100 text-green-800 border-2 border-green-500 shadow-lg shadow-green-500/50";
      case "info":
        return "bg-blue-100 text-blue-800 border-2 border-blue-500 shadow-lg shadow-blue-500/50";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-2 border-yellow-500 shadow-lg shadow-yellow-500/50";
      case "error":
        return "bg-red-100 text-red-800 border-2 border-red-500 shadow-lg shadow-red-500/50";
      default:
        return "";
    }
  };

  const snackbar = (
    <RtlProvider>
      <div
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 ${
          isDesktop ? "mb-16" : "mb-20"
        } w-4/5 md:w-1/3 z-50`}
      >
        {open && (
          <div className={`rounded-lg p-4 ${getAlertStyles(severity)}`}>
            {message}
          </div>
        )}
      </div>
    </RtlProvider>
  );

  return ReactDOM.createPortal(snackbar, document.body);
};

export default CustomSnackbar;
