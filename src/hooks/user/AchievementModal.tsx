import { Achievement } from "@/types/server/user";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (achievement: Achievement) => void;
  initialData?: Achievement | null;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [achievement, setAchievement] = useState<Achievement>(
    initialData || { id: Date.now(), title: '', description: '', date: '', issuer: '', created_at: '', updated_at: '', user_id: 0 }
  );

  useEffect(() => {
    if (isOpen) {
      setAchievement(
        initialData || { id: Date.now(), title: '', description: '', date: '', issuer: '', created_at: '', updated_at: '', user_id: 0 }
      );
    }
  }, [isOpen, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAchievement(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!achievement.title.trim() || !achievement.date.trim()) {
      alert('لطفاً عنوان دستاورد و تاریخ را وارد کنید.');
      return;
    }
    onSubmit(achievement);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose} dir="rtl">
        {/* ... (کد Transition.Child و Dialog.Panel مشابه مودال قبلی با فرم دستاورد) ... */}
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-right align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 dark:text-white mb-4">
                  {initialData ? 'ویرایش دستاورد/گواهینامه' : 'افزودن دستاورد/گواهینامه'}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="ach_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">عنوان</label>
                    <input type="text" name="title" id="ach_title" value={achievement.title} onChange={handleChange} required className="mt-1 input-style" />
                  </div>
                  <div>
                    <label htmlFor="ach_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">توضیحات</label>
                    <textarea name="description" id="ach_description" value={achievement.description} onChange={handleChange} rows={3} className="mt-1 input-style" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ach_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">تاریخ</label>
                      <input type="date" name="date" id="ach_date" value={achievement.date} onChange={handleChange} required className="mt-1 input-style" />
                    </div>
                    <div>
                      <label htmlFor="ach_issuer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">صادر کننده / سازمان</label>
                      <input type="text" name="issuer" id="ach_issuer" value={achievement.issuer} onChange={handleChange} className="mt-1 input-style" />
                    </div>
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

export default AchievementModal;