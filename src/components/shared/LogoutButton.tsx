
import { LogOut } from "lucide-react";
import { useConfirm } from "./ConfirmContext";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const confirm = useConfirm();
  const logout = useLogout();
  const router = useRouter();
  const handleLogout = () => {
    confirm({
      title: "خروج از حساب",
      message: "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
      messageColor: "#ef4444",
      confirmButtonText: "بله، خارج شو",
      cancelButtonText: "خیر",
      onConfirm: () => {
        logout();
        router.push("/"); 
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 p-3 hover:bg-gray-100 w-full text-right rounded-b-lg"
    >
      <LogOut className="w-5 h-5" />
      خروج از حساب
    </button>
  );
}
