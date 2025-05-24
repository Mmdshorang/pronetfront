import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Company } from "@/types/server/user"
import { useState } from "react"
interface prop {
  onSubmit: (data: Company) => void
  initialData?: Company
  onCancel: () => void
}
const AddCompanyForm = ({ onSubmit, initialData, onCancel }:prop) => {
  const [formData, setFormData] = useState<Company>(initialData || {
    id: 0,
    name: "",
    description: "",
    website: "",
    location_id: null,
    created_at: "",
    updated_at: "",
    pivot: {
      job_title: "",
      start_date: "",
      end_date: "",
      description: "",
      employment_type: "",
    },

  })

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
    >
      <Input 
        placeholder="نام شرکت" 
        value={formData.name} 
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
      />
      <Input 
        placeholder="عنوان شغلی" 
        value={formData.pivot.job_title} 
        onChange={(e) => setFormData({ ...formData, pivot: { ...formData.pivot, job_title: e.target.value } })} 
      
      />
      <Input 
        placeholder="نوع همکاری" 
        value={formData.pivot.employment_type} 
        onChange={(e) => setFormData({ ...formData, pivot: { ...formData.pivot, employment_type: e.target.value } })}
      />
      <Input 
        type="date" 
        placeholder="تاریخ شروع" 
        value={formData.pivot.start_date} 
        onChange={(e) => setFormData({ ...formData, pivot: { ...formData.pivot, start_date: e.target.value } })}
      />
      <Input 
        type="date" 
        placeholder="تاریخ پایان" 
        value={formData.pivot.end_date??''}
        onChange={(e) => setFormData({ ...formData, pivot: { ...formData.pivot, end_date: e.target.value } })}
      />
      <Textarea 
        placeholder="توضیحات" 
        value={formData.description??''} 
        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>لغو</Button>
        <Button type="submit">ذخیره</Button>
      </div>
    </form>
  )
}
export default AddCompanyForm

// // در صفحه اصلی پروفایل:

// <Dialog>
//   <DialogTrigger asChild>
//     <Button className="mt-2">+ افزودن سابقه شغلی</Button>
//   </DialogTrigger>
//   <DialogContent>
//     <AddCompanyForm onSubmit={(data) => {
//       // اینجا می‌تونی به API ارسال کنی یا به userStore اضافه کنی
//       console.log("شرکت جدید:", data)
//     }} />
//   </DialogContent>
// </Dialog>