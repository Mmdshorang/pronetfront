"use client";

import { useState, useEffect } from 'react';

const useLayout = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px for desktop
    };

    // Initially check the window size
    handleResize();

    // Add event listener for resizing the window
    window.addEventListener('resize', handleResize);

    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isDesktop };
};

export default useLayout;
