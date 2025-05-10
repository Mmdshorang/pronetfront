import React from 'react';

interface LoadingProps {
  open: boolean;
}

const Loading: React.FC<LoadingProps> = ({ open }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin absolute top-0"></div>
      </div>
    </div>
  );
};

export default Loading;
