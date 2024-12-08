import BellAlertIcon from "@/assets/icons/BellAlertIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Switch from "./Switch";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isKaraoke, setIsKaraoke] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "1";

  // Đồng bộ input search với query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const karaoke = params.get("karaoke") || "";
    setSearchTerm(query);
    setIsKaraoke(karaoke === "true" ? true : false);
  }, [location.search]);

  const isSearchPage = location.pathname.includes("/search");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Thêm hoặc xóa query params
    if (value.trim()) {
      navigate(
        `/search?roomId=${roomId}&query=${encodeURIComponent(
          value.trim()
        )}&karaoke=${isKaraoke}`
      );
    } else {
      navigate(`/search?roomId=${roomId}`); // Xóa query params nếu rỗng
    }
  };

  const handleInputClick = () => {
    navigate(
      `/search?roomId=${roomId}&query=${encodeURIComponent(
        searchTerm.trim()
      )}&karaoke=${isKaraoke}`
    );
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md z-50">
      {/* Logo */}
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Jozo Karaoke
      </div>

      {/* Search Input */}
      <div className="w-1/2 flex items-center gap-x-4">
        <input
          type="text"
          placeholder="Tìm kiếm bài hát hoặc nghệ sĩ..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none"
          onClick={handleInputClick}
        />
        <div className="flex items-center gap-x-2">
          <span className="text-sm">Karaoke</span>
          <Switch
            isChecked={isKaraoke}
            onChange={() => {
              setIsKaraoke(!isKaraoke);
              navigate(
                `/search?query=${encodeURIComponent(
                  searchTerm.trim()
                )}&karaoke=${!isKaraoke}&roomId=${roomId}`
              );
            }}
          />
        </div>
      </div>

      {/* Right: Contact with server     */}
      <div className="flex items-center space-x-4">
        <button
          className={isSearchPage ? "opacity-100" : "opacity-0"}
          onClick={() => navigate(`/?roomId=${roomId}`)}
        >
          <HomeIcon />
        </button>

        <button>
          <BellAlertIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
