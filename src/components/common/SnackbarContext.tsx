import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type AlertColor = 'success' | 'info' | 'warning' | 'error';

interface SnackbarContextProps {
  message: string;
  severity: AlertColor;
  open: boolean;
  showSnackbar: (message: string, severity: AlertColor) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [open, setOpen] = useState(false);

  const showSnackbar = (message: string, severity: AlertColor) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const hideSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ message, severity, open, showSnackbar, hideSnackbar }}>
      {children}
      {open && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
          severity === 'success' ? 'bg-green-500' :
          severity === 'error' ? 'bg-red-500' :
          severity === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
        } text-white`}>
          <div className="flex items-center justify-between">
            <span>{message}</span>
            <button
              onClick={hideSnackbar}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
