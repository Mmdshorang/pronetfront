'use client';

import { useCompanyAddRequest } from '@/hooks/company/addCompany';
import { CompanyAdd } from '@/types/server/company';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddCompanyDialog = ({ open, onClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState<CompanyAdd>({
    name: '',
   
    city: '',
    country: '',
    logo: null,
    description: '',
    industry: '',
    website: '',
    phone: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});


  const requiredFields = ['name', 'email', 'password'];
  const { mutate, isPending, data } = useCompanyAddRequest();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'location_id' ? Number(value) : value }));
    if (requiredFields.includes(name)) {
      setErrors(prev => ({ ...prev, [name]: !value.trim() }));
    }
  };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: boolean } = {};
    requiredFields.forEach(field => {
      if (!formData[field as keyof CompanyAdd]?.toString().trim()) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await mutate(formData);
    if (data?.status === "success") {
      onSuccess();
    }

  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };


  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={{ marginBottom: '16px' }}>افزودن شرکت جدید</h2>
        <div style={styles.form}>
          {[
            ['name', 'نام شرکت'],
            ['email', 'ایمیل'],
            ['password', 'رمز عبور'],
            ['description', 'توضیحات'],
            ['industry', 'صنعت'],
            ['website', 'وب‌سایت'],
            ['phone', 'تلفن'],
            ['city', 'شهر'],
            ['country', 'کشور'],
          ].map(([name, label]) => (
            <div key={name} style={styles.inputGroup}>
              <label style={styles.label}>{label}</label>
              <input
                type={name === 'password' ? 'password' : 'text'}
                name={name}
                value={formData[name as 'name' | 'description' | 'industry' | 'website' | 'phone' | 'city' | 'country' ] ?? ''}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  borderColor: errors[name] ? 'red' : '#ccc',
                }}
              />
            </div>
          ))}

          <div style={styles.inputGroup}>
            <label style={styles.label}>لوگو (تصویر)</label>
            <input
              type="file"
              accept="image/*"
              name="logo"
              onChange={handleFileChange}
              style={{
                ...styles.input,
                padding: '8px',
                borderColor: errors['logo'] ? 'red' : '#ccc',
              }}
            />
            {selectedFile && (
              <p style={{ fontSize: 12, color: '#555' }}>
                فایل انتخاب‌شده: {selectedFile.name}
              </p>
            )}
          </div>
        </div>

        <div style={styles.actions}>
          <button onClick={onClose} disabled={isPending} style={styles.cancelBtn}>
            لغو
          </button>
          <button onClick={handleSubmit} disabled={isPending} style={styles.submitBtn}>
            افزودن
          </button>
        </div>
      </div>
    </div>

  );
};

export default AddCompanyDialog;

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  dialog: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
  },
  actions: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    color: '#333',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
  submitBtn: {
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
};
