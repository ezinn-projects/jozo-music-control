// import { useTimer } from "@/contexts/TimerContext";
import React from "react";
import { Outlet } from "react-router-dom";
// import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  // const { timeLeft } = useTimer();

  // Nếu hết giờ, chuyển hướng sang trang QR Code
  // if (timeLeft <= 0) {
  //   return <Navigate to="/qr-code" replace />;
  // }

  // Nếu còn thời gian, render các route bên trong
  return <Outlet />;
};

export default ProtectedRoute;
