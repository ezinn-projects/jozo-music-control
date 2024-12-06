import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-center">
        {!isSearchPage ? (
          <div
            className="w-full max-w-md cursor-pointer"
            onClick={() => navigate("/search")}
          >
            <input
              type="text"
              placeholder="Tìm kiếm bài hát, nghệ sĩ..."
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 cursor-pointer"
              readOnly
            />
          </div>
        ) : (
          <div className="flex items-center w-full max-w-lg space-x-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-300 hover:text-white"
            >
              🏠
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm bài hát, nghệ sĩ..."
              className="flex-1 p-3 rounded-lg bg-gray-700 text-gray-300"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
