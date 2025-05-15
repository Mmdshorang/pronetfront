import React from 'react';
import { MapPin, Phone, Instagram } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4 text-center md:text-right">
        {/* لوگو و توضیح */}
        <div className="flex flex-col items-center md:items-end text-sm">
          <Image src="/pwa-512x512.svg" alt="logo" width={80} height={80} className="mb-2" />
          <p className="mt-2 leading-relaxed text-center md:text-right">
            بامادر همه روزه از ساعت 9 صبح تا 11 شب در کنار شماست
          </p>
        </div>

        {/* دسترسی سریع */}
        <div>
          <h3 className="text-base font-bold mb-3">دسترسی سریع</h3>
          <ul className="space-y-2 text-sm">
            <li>تماس با ما</li>
            <li>درباره ما</li>
            <li>سوالات متداول</li>
            <li>مقالات</li>
          </ul>
        </div>

        {/* اطلاعات تماس */}
        <div className="text-sm">
          <h3 className="text-base font-bold mb-3">در تماس باشیم</h3>
          <p className="mb-2 leading-relaxed">
            ایران – خوزستان- دزفول – خیابان حضرت شهید بهشتی بین فجر و معزی روبروی بیمه سینا
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <MapPin className="w-4 h-4" />
            <span>آدرس</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <Phone className="w-4 h-4" />
            <span>061-3833</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <Phone className="w-4 h-4" />
            <span>061-42544444</span>
          </div>
        </div>

        {/* شبکه های اجتماعی */}
        <div className="text-sm">
          <h3 className="text-base font-bold mb-3">شبکه‌های اجتماعی</h3>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <Instagram className="w-4 h-4" />
            <span>@adina-hyper</span>
          </div>
        </div>

        {/* نمادها */}
        <div className="flex flex-col items-center gap-2">
          <Image src="/enamad.png" alt="enamad" width={80} height={80} />
          <Image src="/rezi.webp" alt="rezi" width={80} height={80} />
        </div>
      </div>

      <div className="text-center text-xs mt-8 border-t border-gray-700 pt-4">
        تمام حقوق این وب سایت متعلق به مجموعه آدینا رایانه می‌باشد.
      </div>
    </footer>

  );
};

export default Footer;
