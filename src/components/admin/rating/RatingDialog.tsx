'use client';
import { RatingCriterionDefinition, RatingCriterionValue } from '@/types/model/type';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
// import { RatingCriterionDefinition, RatingCriterionValue } from '../types'; // مسیر را در صورت نیاز تصحیح کنید // این خط کامنت شد چون RatingCriterionDefinition و RatingCriterionValue بالاتر تعریف شده‌اند
import { FaStar, FaTimes, FaPaperPlane } from 'react-icons/fa';

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ratings: RatingCriterionValue[], comment?: string) => void;
  targetName: string;
  criteriaDefinitions: RatingCriterionDefinition[];
}

export const RatingDialog: React.FC<RatingDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  targetName,
  criteriaDefinitions,
}) => {
  const [currentScores, setCurrentScores] = useState<Record<string, number>>({});
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    // Reset scores when dialog opens for a new target or criteria change
    if (isOpen) {
      const initialScores: Record<string, number> = {};
      criteriaDefinitions.forEach(criterion => {
        initialScores[criterion.id] = 0; // Default to 0 stars
      });
      setCurrentScores(initialScores);
      setComment('');
    }
  }, [isOpen, criteriaDefinitions]);

  const handleScoreChange = (criterionId: string, score: number) => {
    setCurrentScores(prevScores => ({
      ...prevScores,
      [criterionId]: score,
    }));
  };

  const handleSubmit = () => {
    const ratingValues: RatingCriterionValue[] = criteriaDefinitions.map(criterion => ({
      criterionId: criterion.id,
      score: currentScores[criterion.id] || 0,
    }));
    // Basic validation: ensure all criteria are rated (score > 0)
    const allRated = ratingValues.every(rv => rv.score > 0);
    if (!allRated) {
      // از alert استفاده نکنید. به جای آن یک پیام مناسب در UI نمایش دهید.
      // برای این مثال، فعلا alert را نگه می‌داریم اما در پروژه واقعی باید جایگزین شود.
      alert('لطفاً به تمام معیارها امتیاز دهید.');
      return;
    }
    onSubmit(ratingValues, comment);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose} dir="rtl">
        {/* This Transition.Child is for the backdrop */}
        <Transition.Child
          as="div" // <--- SOLUTION: Change Fragment to "div"
          className="fixed inset-0 bg-black bg-opacity-60" // Move backdrop styles here
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* The original div for backdrop can be removed if styles are on Transition.Child,
              or kept if you prefer the separation, but ensure Transition.Child IS the backdrop */}
          {/* <div className="fixed inset-0 bg-black bg-opacity-60" /> */} {/* This line can now be removed */}
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* This Transition.Child is for the Dialog.Panel itself */}
            <Transition.Child
              as={Fragment} // This one is okay because Dialog.Panel will be its single child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 text-right align-middle shadow-xl transition-all">
                {/* ... (rest of your Dialog.Panel content) */}
                <Dialog.Title
                  as="h3"
                  className="text-xl sm:text-2xl font-semibold leading-6 text-gray-900 dark:text-white flex justify-between items-center mb-6"
                >
                  <span>امتیازدهی به {targetName}</span>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full transition-colors"
                    aria-label="بستن"
                  >
                    <FaTimes size={22} />
                  </button>
                </Dialog.Title>
                <div className="mt-4 space-y-6">
                  {criteriaDefinitions.map(criterion => (
                    <div key={criterion.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{criterion.name}</p>
                      {criterion.description && <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{criterion.description}</p>}
                      <div className="flex items-center space-x-1 space-x-reverse mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <FaStar
                            key={star}
                            size={28}
                            className={`cursor-pointer transition-colors ${
                              (currentScores[criterion.id] || 0) >= star
                                ? 'text-yellow-400 hover:text-yellow-500'
                                : 'text-gray-300 dark:text-gray-500 hover:text-yellow-300'
                            }`}
                            onClick={() => handleScoreChange(criterion.id, star)}
                          />
                        ))}
                        <span className="ml-3 text-md font-bold text-yellow-500 w-5 text-center">
                          {currentScores[criterion.id] > 0 ? currentScores[criterion.id] : '-'}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      نظر شما (اختیاری):
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={4}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 p-3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="تجربه یا نظر خود را در اینجا بنویسید..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3 space-x-reverse">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors shadow-sm"
                    onClick={onClose}
                  >
                    انصراف
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors shadow-md hover:shadow-lg"
                    onClick={handleSubmit}
                  >
                    <FaPaperPlane className="ml-2 rtl:mr-2 rtl:ml-0 h-4 w-4" />
                    ثبت امتیاز
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};