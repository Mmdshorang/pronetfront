// stores/snackbarStore.ts
import { create } from "zustand";
import { AlertType } from "@/types/common/alert";

interface SnackbarState {
  message: string;
  type: AlertType;
  visible: boolean;
  show: (msg: string, type: AlertType, duration?: number) => void;
  hide: () => void;
}

 const useSnackbarStore = create<SnackbarState>((set) => ({
  message: "",
  type: "info",
  visible: false,
  show: (msg, type, duration = 3000) => {
    set({ message: msg, type, visible: true });
    setTimeout(() => {
      set({ visible: false });
    }, duration);
  },
  hide: () => set({ visible: false }),
}));
  
export const showSnackbar= useSnackbarStore.getState().show;
export default useSnackbarStore;