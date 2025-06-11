import { FaPlusCircle, FaSave, FaTimesCircle, FaUserEdit } from "react-icons/fa";

interface EditableSectionProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  isEditing?: boolean; // دیگر برای کنترل فرم‌های داخلی استفاده نمی‌شود
  onToggleEdit?: () => void; // ممکن است برای برخی بخش‌ها لازم باشد
  onAddNew?: () => void; // برای دکمه افزودن جدید
  canEdit?: boolean;
  isSectionEditable?: boolean; // برای فعال/غیرفعال کردن دکمه ویرایش کلی بخش
}

const EditableSection: React.FC<EditableSectionProps> = ({
  title, icon, children, onAddNew, canEdit = true, isSectionEditable = true, isEditing, onToggleEdit
}) => (
  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 mb-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
        {icon}
        <span className="mr-3 rtl:ml-3 rtl:mr-0">{title}</span>
      </h2>
      {canEdit && (
        <div className="flex items-center space-x-2 space-x-reverse">
          {isSectionEditable && onToggleEdit && ( // دکمه ویرایش کلی بخش (مثلا برای اطلاعات شخصی)
            isEditing ? (
              <div className="flex space-x-2 space-x-reverse">
                <button onClick={onToggleEdit} className="text-green-500 hover:text-green-700 p-2 rounded-full" title="ذخیره"><FaSave size={20} /></button>
                <button onClick={onToggleEdit} className="text-red-500 hover:text-red-700 p-2 rounded-full" title="لغو"><FaTimesCircle size={20} /></button>
              </div>
            ) : (
              <button onClick={onToggleEdit} className="text-blue-500 hover:text-blue-700 p-2 rounded-full" title="ویرایش بخش"><FaUserEdit size={20} /></button>
            )
          )}
          {onAddNew && ( // دکمه افزودن آیتم جدید (برای مهارت، سابقه، دستاورد)
            <button
              onClick={onAddNew}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-lg flex items-center text-sm shadow-md"
              title={`افزودن ${title.replace('‌ها', '')}`}
            >
              <FaPlusCircle className="ml-1 rtl:mr-1 rtl:ml-0" /> افزودن
            </button>
          )}
        </div>
      )}
    </div>
    {children}
  </div>
);
export default EditableSection;