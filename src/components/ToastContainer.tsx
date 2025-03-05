import React, { useState } from "react";
import clsx from "clsx";

type ToastType = "default" | "success" | "warning" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const toastQueue: Array<(message: string, type?: ToastType) => void> = [];

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Hàm để thêm toast vào state
  const addToast = (message: string, type: ToastType = "default") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000); // Auto-remove after 3s
  };

  // Đăng ký hàm này vào hàng đợi toàn cục
  React.useEffect(() => {
    toastQueue.push(addToast);
    return () => {
      // Cleanup nếu component bị unmount
      const index = toastQueue.indexOf(addToast);
      if (index !== -1) toastQueue.splice(index, 1);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx("px-4 py-2 rounded shadow-lg animate-fade-in-out", {
            "bg-gray-800 text-white": toast.type === "default",
            "bg-pink-300 text-black": toast.type === "success",
            "bg-yellow-500 text-black": toast.type === "warning",
            "bg-red-500 text-white": toast.type === "error",
          })}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

// Singleton hàm gọi toast
export const toast = {
  message: (msg: string) => {
    toastQueue.forEach((fn) => fn(msg, "default"));
  },
  success: (msg: string) => {
    toastQueue.forEach((fn) => fn(msg, "success"));
  },
  warning: (msg: string) => {
    toastQueue.forEach((fn) => fn(msg, "warning"));
  },
  error: (msg: string) => {
    toastQueue.forEach((fn) => fn(msg, "error"));
  },
};
