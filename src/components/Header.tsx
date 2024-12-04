import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Jozo Karaoke</h1>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/search")} // Điều hướng đến trang tìm kiếm
        />
      </div>
    </header>
  );
};

export default Header;
