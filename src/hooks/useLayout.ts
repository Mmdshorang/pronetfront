import { isMobileOnly } from "react-device-detect";

const useLayout = () => {
  const isMobile = isMobileOnly;
  const isTablet = !isMobile && window.innerWidth < 1024;
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useLayout;