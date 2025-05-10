import React, { createContext, useContext, useEffect, useState } from "react";

// تعریف نوع داده‌های کانفیگ
interface ConfigContextType {
  apiUrl: string | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiUrl, setApiUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load config.json
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json");
        const data = await response.json();
        setApiUrl(data.apiUrl);
      } catch (error) {
        console.error("خطا در بارگذاری تنظیمات سرور:", error);
      }
    };

    fetchConfig();

    // فایل به‌روزرسانی را با interval چک کنید
    const interval = setInterval(() => {
      fetchConfig();
    }, 60000); // هر 60 ثانیه یکبار چک می‌شود

    return () => clearInterval(interval);
  }, []);

  return (
    <ConfigContext.Provider value={{ apiUrl }}>
      {children}
    </ConfigContext.Provider>
  );
};

// Hook برای استفاده از مقدار apiUrl
export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig باید داخل ConfigProvider استفاده شود");
  }
  return context;
};
