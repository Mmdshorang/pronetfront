import React from 'react';
import RtlProvider from './RtlProvider';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  messageColor?: string;
  isButtonClose?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmButtonText = 'تایید',
  cancelButtonText = 'انصراف',
  messageColor = 'text-gray-700',
  isButtonClose = true,
}) => {
  if (!open) return null;

  return (
    <RtlProvider>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className={`mb-6 ${messageColor}`}>{message}</p>
          <div className="flex justify-end gap-4">
            {isButtonClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {cancelButtonText}
              </button>
            )}
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors"
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </RtlProvider>
  );
};

export default ConfirmDialog;
