import { QRCodeCanvas } from "qrcode.react";
import React from "react";

const QRCodeScreen: React.FC = () => {
  const url = "https://jozo-karaoke.com/customer"; // URL trang khách hàng
  const roomNumber = 5; // Thay bằng số phòng động nếu cần

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Hết giờ sử dụng</h1>
      <p className="text-lg mb-6 text-gray-700">
        Quét mã QR bên dưới để gia hạn thời gian hoặc truy cập trang khách hàng.
      </p>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <QRCodeCanvas value={`${url}?room=${roomNumber}`} size={200} />
      </div>
    </div>
  );
};

export default QRCodeScreen;
