import CompanySearchInput from "@/components/dialogs/CompanySearchInput";
import { Company } from "@/types/server/user";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
const initialExperienceState: Company = {
  id: 0,
  name: '',
  website: '',
  description: '',
  location_id: null,
  created_at: '',
  updated_at: '',
  pivot: {
    job_title: '',
    start_date: '',
    end_date: null,
    description: '',
    employment_type: 'تمام وقت',
    role: '',
    company_id:0,
    user_id:0
  }
};
interface WorkExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (experience: Company) => void;
  initialData?: Company | null;
}

const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [experience, setExperience] = useState<Company>(
    initialData || initialExperienceState
  );

  useEffect(() => {
    if (isOpen) {
      setExperience(
        initialData || initialExperienceState
      );
    }
  }, [isOpen, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in experience.pivot) {
      setExperience(prev => ({ ...prev, pivot: { ...prev.pivot, [name]: value } }));
    } else {
      setExperience(prev => ({ ...prev, [name]: value } as Company));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // اعتبارسنجی ساده
    if (!experience.name.trim() || !experience.pivot.job_title.trim() || !experience.pivot.start_date.trim()) {
      alert('لطفاً نام شرکت، عنوان شغلی و تاریخ شروع را وارد کنید.');
      return;
    }
    onSubmit(experience);
    onClose();
  };
  const handleCompanySelect = (company: { id: number | null; name: string; website?: string | null }) => {
    setExperience(prev => ({
      ...prev,
      id: company.id ?? prev.id, // اگر null بود، مقدار قبلی را نگه می‌دارد
      name: company.name,
      website: company.website ?? prev.website ?? '',
    }));
  };


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose} dir="rtl">
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-right align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 dark:text-white mb-4">
                  {initialData ? 'ویرایش سابقه شغلی' : 'افزودن سابقه شغلی'}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <CompanySearchInput
                      initialValue={experience.name}
                      onCompanySelect={handleCompanySelect}
                    />
                  </div>
                  <div>
                    <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">عنوان شغلی</label>
                    <input type="text" name="job_title" id="job_title" value={experience.pivot.job_title} onChange={handleChange} required className="mt-1 input-style" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">تاریخ شروع</label>
                      <input type="date" name="start_date" id="start_date" value={experience.pivot.start_date} onChange={handleChange} required className="mt-1 input-style" />
                    </div>
                    <div>
                      <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">تاریخ پایان (خالی اگر شغل فعلی است)</label>
                      <input type="date" name="end_date" id="end_date" value={experience.pivot.end_date || ''} onChange={handleChange} className="mt-1 input-style" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">نوع همکاری</label>
                    <select name="employment_type" id="employment_type" value={experience.pivot.employment_type} onChange={handleChange} className="mt-1 input-style">
                      <option value="تمام وقت">تمام وقت</option>
                      <option value="پاره وقت">پاره وقت</option>
                      <option value="قراردادی">قراردادی</option>
                      <option value="کارآموزی">کارآموزی</option>
                      <option value="فریلنسری">فریلنسری</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="work_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">توضیحات شغل</label>
                    <textarea name="description" id="work_description" value={experience.pivot.description || ''} onChange={handleChange} rows={3} className="mt-1 input-style" />
                  </div>
                  <div>
                    <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 dark:text-gray-300">وبسایت شرکت (اختیاری)</label>
                    <input type="url" name="website" id="companyWebsite" value={experience.website || ''} onChange={handleChange} className="mt-1 input-style" placeholder="https://example.com" />
                  </div>
                  <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="btn-secondary">انصراف</button>
                    <button type="submit" className="btn-primary">ذخیره</button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default WorkExperienceModal;