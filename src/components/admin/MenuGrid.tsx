'use client';

import { FC } from 'react';

interface MenuItem {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

interface Props {
  data: MenuItem[];
}

const MenuGrid: FC<Props> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, idx) => (
          <button
            key={idx}
            onClick={item.onClick}
            className="flex items-center gap-4 p-6 rounded-2xl shadow-lg bg-gray-100 hover:shadow-xl transition text-left"
          >
            <div className="p-3 rounded-full bg-white">{item.icon}</div>
            <div className="text-lg font-semibold">{item.text}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
