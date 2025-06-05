'use clinet'
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaTwitter, FaEnvelope, FaBuilding } from 'react-icons/fa'; // Added more relevant icons

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200 ease-in-out"
    >
      {children}
    </Link>
  </li>
);


interface SocialLinkProps {
  href: string;
  icon: React.ReactElement;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 ease-in-out"
  >
    {icon}
  </Link>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 py-12 sm:py-16 border-t border-gray-200 dark:border-gray-700 shadow-t-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* بخش درباره ما */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <FaBuilding className="text-blue-600 dark:text-blue-400 text-2xl" />
              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                سامانه ارزیابی حرفه‌ای
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              پلتفرم جامع برای شبکه‌سازی، مدیریت پروفایل کارمندان و ارزیابی عملکرد در شرکت‌ها. ما به شفافیت و رشد حرفه‌ای اهمیت می‌دهیم.
            </p>
          </div>

          {/* بخش لینک‌های مفید */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">لینک‌های مفید</h4>
            <ul className="space-y-2">
              <FooterLink href="/">صفحه اصلی</FooterLink>
              <FooterLink href="/companies">شرکت‌ها</FooterLink>
              <FooterLink href="/employees">کارمندان</FooterLink>
              <FooterLink href="/features">امکانات سامانه</FooterLink>
              <FooterLink href="/contact-us">تماس با ما</FooterLink>
              <FooterLink href="/privacy-policy">سیاست حفظ حریم خصوصی</FooterLink>
            </ul>
          </div>

          {/* بخش ارتباط با ما */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">ارتباط با ما</h4>
            <address className="not-italic">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 flex items-center">
                <FaEnvelope className="ml-2 rtl:mr-2 rtl:ml-0 text-lg text-gray-500 dark:text-gray-400" />
                info@yourcompany.com
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                تهران، خیابان آزادی، پلاک ۱۲۳
              </p>
            </address>
            <div className="flex space-x-4 rtl:space-x-reverse mt-4">
              <SocialLink href="https://linkedin.com" icon={<FaLinkedin className="text-2xl" />} label="لینکدین" />
              <SocialLink href="https://instagram.com" icon={<FaInstagram className="text-2xl" />} label="اینستاگرام" />
              <SocialLink href="https://twitter.com" icon={<FaTwitter className="text-2xl" />} label="توییتر" />
            </div>
          </div>

          {/* بخش عضویت در خبرنامه */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">عضویت در خبرنامه</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              برای دریافت آخرین اخبار، به‌روزرسانی‌ها و نکات حرفه‌ای در ایمیل خود ثبت نام کنید.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email" className="sr-only">ایمیل</label>
              <input
                id="newsletter-email"
                type="email"
                className="flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="ایمیل شما"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ease-in-out text-sm"
              >
                عضویت
              </button>
            </form>
          </div>
        </div>

        {/* بخش کپی رایت */}
        <div className="mt-10 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} سامانه شبکه‌سازی و ارزیابی حرفه‌ای. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            طراحی و توسعه با ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;