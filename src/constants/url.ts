
export const getBaseUrl = async () => {
    const response = await fetch('/public/config.json');
    const config = await response.json();
    return config.apiUrl;
 };
  
export const BASE_URL = import.meta.env.VITE_API_URL;
export const APP_DEPLOYMENT_URL = import.meta.env.VITE_APP_DEPLOYMENT_URL;
export const API_VERSION = 2;