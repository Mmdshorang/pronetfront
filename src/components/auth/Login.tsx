import React, { useState } from 'react';

import { FaEnvelope, FaLock } from 'react-icons/fa';
import { LoginData } from '@/types/server/auth';
import { useLoginRequest } from '@/hooks/auth/register';

interface LoginProps {
  onRegister: () => void;
}
const Login: React.FC<LoginProps> = ({onRegister}: LoginProps) => {
    const { mutate, isPending, error, } = useLoginRequest();
   
 
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await mutate(formData); 
     
        

    };

    return (
        <>
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="text-4xl font-bold text-gray-800">ورود</h2>
            <p className="text-gray-600 mt-2">
              حساب ندارید؟{' '}
              <button onClick={onRegister} className="text-indigo-600 font-semibold hover:underline">
                ثبت‌نام کنید
              </button>
            </p>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="sr-only">ایمیل</label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ایمیل"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
  
            <div>
              <label htmlFor="password" className="sr-only">رمز عبور</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="رمز عبور"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
  
            {error && (
              <div className="text-red-500 text-center text-sm font-medium">{error.message}</div>
            )}
  
            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-xl font-semibold disabled:opacity-60"
              >
                {isPending ? 'در حال ورود...' : 'ورود'}
              </button>
            </div>
          </form>
        </div>
      </>
    );
};

export default Login; 