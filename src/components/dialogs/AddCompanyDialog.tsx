import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const AddCompanyForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    job_title: "",
    employment_type: "",
    start_date: "",
    end_date: "",
    description: "",
  })

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
    >
      <Input placeholder="نام شرکت" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <Input placeholder="عنوان شغلی" onChange={(e) => setFormData({ ...formData, job_title: e.target.value })} />
      <Input placeholder="نوع همکاری" onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })} />
      <Input type="date" placeholder="تاریخ شروع" onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
      <Input type="date" placeholder="تاریخ پایان" onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
      <Textarea placeholder="توضیحات" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      <Button type="submit">ذخیره</Button>
    </form>
  )
}

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
