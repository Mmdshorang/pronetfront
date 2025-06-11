// components/admin/company/manage/AddEmployeeDialog.tsx
'use client';

import { useState, useEffect } from 'react';
 // هوک جستجوی شما
import { useAddUserToCompany } from '@/hooks/company/manageUsers';
import { AddUserInput, User } from '@/types/server/user';
import { useSearchRequest } from '@/hooks/user/search';

// ... (کامپوننت‌های UI و دیالوگ)

interface Props {
    open: boolean;
    onClose: () => void;
    companyId: number;
    onSuccess: (newUser: User) => void;
}

export default function AddEmployeeDialog({ open, onClose, companyId, onSuccess }: Props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [jobDetails, setJobDetails] = useState<Omit<AddUserInput, 'user_id'>>({
        job_title: '',
        start_date: '',
        role: 'member',
        employment_type: 'تمام وقت',
    });

    const { mutate: search, data: searchData, isPending: isSearching } = useSearchRequest();
    const { mutate: addUser, isPending: isAdding } = useAddUserToCompany(companyId);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (query.length > 2) search(query);
        }, 500);
        return () => clearTimeout(handler);
    }, [query, search]);

    useEffect(() => {
        if (searchData?.data) {
            setResults(searchData.data.filter(item => item.type === 'user'));
        }
    }, [searchData]);

    const handleSubmit = () => {
        if (!selectedUser) return;
        const finalData: AddUserInput = {
            user_id: selectedUser.id,
            ...jobDetails
        };
        addUser(finalData, {
            onSuccess: (response) => {
                onSuccess(response.user);
            }
        });
    }

    // JSX این کامپوننت شامل یک فیلد جستجو، لیست نتایج،
    // و پس از انتخاب کاربر، فیلدهایی برای job_title، role و ... خواهد بود.
    
    if (!open) return null;

    return (
        // ... JSX دیالوگ
    );
}