import { useState } from 'react';
import {  Settings, ChevronDown } from 'lucide-react';
import Link from 'next/link';

import LogoutButton from '../shared/LogoutButton';
import { useUserInfoStore } from '@/stores/userStore';
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const  user  = useUserInfoStore((state)=>state.user);

  return (
    <div className="relative ml-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded-full shadow-lg"
      >
        {user?.email ?? ""}
        <ChevronDown className="w-4 h-4 " />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <ul className="text-gray-700">
            <li>
              <Link
                href="/prof/myprofile"
                className="flex items-center gap-2 p-3 hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
                اطلاعات کاربری
              </Link>
            </li>
               <li>
              <Link
                href="/mycompany"
                className="flex items-center gap-2 p-3 hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
               مدیریت  شرکت های من 
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
