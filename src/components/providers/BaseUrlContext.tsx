import { createContext, useContext, useState, ReactNode } from "react";

interface AxiosContextType {
  baseURL: string | null;
  setBaseURL: (url: string) => void;
}

const AxiosContext = createContext<AxiosContextType | undefined>(undefined);

export const useAxiosContext = (): AxiosContextType => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxiosContext must be used within an AxiosProvider");
  }
  return context;
};

interface AxiosProviderProps {
  children: ReactNode;
}

export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  const [baseURL, setBaseURL] = useState<string | null>(null);

  return (
    <AxiosContext.Provider value={{ baseURL, setBaseURL }}>
      {children}
    </AxiosContext.Provider>
  );
};
