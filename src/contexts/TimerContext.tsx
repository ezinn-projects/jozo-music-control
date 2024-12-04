import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";

// Định nghĩa type cho context
export interface TimerContextType {
  timeLeft: number; // Số giây còn lại
  resetTimer: (seconds: number) => void; // Hàm reset thời gian
}

// Khởi tạo context với giá trị mặc định
export const TimerContext = createContext<TimerContextType | undefined>(
  undefined
);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(3600); // Thời gian mặc định là 1 giờ

  // Hàm reset lại thời gian
  const resetTimer = (seconds: number) => {
    setTimeLeft(seconds);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0)); // Không để thời gian âm
    }, 1000);

    return () => clearInterval(timer); // Clear timer khi unmount
  }, []);

  // Trả về provider với giá trị context
  return (
    <TimerContext.Provider value={{ timeLeft, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
