import BellAlertIcon from "@/assets/icons/BellAlertIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Switch from "./Switch";
import { logo } from "@/assets/images";
import { useDebounce } from "@/hooks/useDebounce";
import { useSongName } from "@/hooks/useSongName";
import { useQueryClient } from "@tanstack/react-query";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isKaraoke, setIsKaraoke] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "1";

  const queryClient = useQueryClient();

  // Đồng bộ input search với query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const karaoke = params.get("karaoke") || "true";
    setSearchTerm(query);
    setIsKaraoke(karaoke === "true" ? true : false);
  }, [location.search]);

  const isSearchPage = location.pathname.includes("/search");

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce cho auto complete
  const debouncedAutoComplete = useDebounce(searchTerm, 300);

  // Debounce cho navigation để giảm lag
  const debouncedNavigationTerm = useDebounce(searchTerm, 500);

  // Xử lý navigation khi debounced term thay đổi
  useEffect(() => {
    // Nếu đã ở trang search và không có thay đổi nào, không cần chuyển hướng lại
    if (
      location.pathname.includes("/search") &&
      debouncedNavigationTerm === ""
    ) {
      return;
    }

    if (debouncedNavigationTerm.trim()) {
      navigate(
        `/search?roomId=${roomId}&query=${encodeURIComponent(
          debouncedNavigationTerm
        )}&karaoke=${isKaraoke}`
      );
    } else if (debouncedNavigationTerm === "") {
      // Chỉ navigate nếu cần chuyển từ trang khác về trang search
      navigate(`/search?roomId=${roomId}&karaoke=${isKaraoke}`);
    }
  }, [debouncedNavigationTerm, isKaraoke, roomId, location.pathname, navigate]);

  // Query cho auto complete suggestions
  const { data: songNameSuggestions } = useSongName(debouncedAutoComplete, {
    enabled: showSuggestions && debouncedAutoComplete.length >= 2,
  });

  // Click outside để đóng suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
    // Navigation sẽ được xử lý trong useEffect với debounce
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setShowSuggestions(false);
    setSearchTerm(suggestion);
    navigate(
      `/search?roomId=${roomId}&query=${encodeURIComponent(
        suggestion
      )}&karaoke=${isKaraoke}`
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    // Xóa cache của query
    queryClient.removeQueries({ queryKey: ["songName"] });
    navigate(`/search?roomId=${roomId}&karaoke=${isKaraoke}`);
  };

  return (
    <header className="bg-black text-white p-4 flex items-center justify-between shadow-md z-50">
      {/* Logo */}
      {/* <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate(`/?roomId=${roomId}&karaoke=${isKaraoke}`)}
      >
        Jozo
      </div> */}
      {/* thay thế bằng logo */}
      <img
        src={logo}
        alt="Jozo"
        className="w-20 h-10 cursor-pointer animate-breathing"
        onClick={() => navigate(`/?roomId=${roomId}`)}
      />

      {/* Search Input */}
      <div
        className="w-1/2 flex items-center gap-x-4 relative"
        ref={searchContainerRef}
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Tìm kiếm bài hát hoặc nghệ sĩ..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            className="w-full p-3 bg-secondary text-white rounded-lg shadow-md focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Auto Complete Suggestions */}
        {showSuggestions &&
          songNameSuggestions &&
          songNameSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg z-50 border border-gray-200 mt-1">
              {songNameSuggestions?.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}

        <div className="flex items-center gap-x-2">
          <span className="text-sm whitespace-nowrap">Lời nhạc</span>
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
