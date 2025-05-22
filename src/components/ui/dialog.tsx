import { ReactNode, useState } from "react";

export const Dialog = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>; // Stub container
};

export const DialogTrigger = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => {
        onClick?.();
        setOpen(true);
      }}
    >
      {children}
    </button>
  );
};

export const DialogContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl">
      {children}
    </div>
  );
};
