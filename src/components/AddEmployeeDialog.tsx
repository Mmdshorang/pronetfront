import React, { useState } from 'react';

interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (employeeData: {
    name: string;
    email: string;
    position: string;
  }) => void;
}

const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', email: '', position: '' });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">افزودن کارمند جدید</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              نام
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              سمت
            </label>
            <input
              type="text"
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors"
            >
              افزودن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeDialog; 