import BellAlertIcon from "@/assets/icons/BellAlertIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Switch from "./Switch";
import { logo } from "@/assets/images";
import { useDebounce } from "@/hooks/useDebounce";
import { useSongName } from "@/hooks/useSongName";
import { useQueryClient } from "@tanstack/react-query";
import useRoom from "@/hooks/useRoom";
import { toast } from "./ToastContainer";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isKaraoke, setIsKaraoke] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "1";

  const queryClient = useQueryClient();

  const { mutate: sendNotification } = useRoom();

  // Đồng bộ input search với query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const karaoke = params.get("karaoke") || "true";
    setSearchTerm(query);
    setIsKaraoke(karaoke === "true" ? true : false);
  }, [location.search]);

  const isSearchPage = location.pathname.includes("/search");
  const isHomePage = location.pathname === "/" || location.pathname === "";

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce cho auto complete
  const debouncedAutoComplete = useDebounce(searchTerm, 300);

  // Debounce cho navigation để giảm lag
  const debouncedNavigationTerm = useDebounce(searchTerm, 500);

  // Separate effect for navigation to prevent interference with input
  useEffect(() => {
    if (isHomePage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      if (debouncedNavigationTerm.trim()) {
        navigate(
          `/search?roomId=${roomId}&query=${encodeURIComponent(
            debouncedNavigationTerm
          )}&karaoke=${isKaraoke}`
        );
      } else if (debouncedNavigationTerm === "" && !isHomePage) {
        navigate(`/search?roomId=${roomId}&karaoke=${isKaraoke}`);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [
    debouncedNavigationTerm,
    isKaraoke,
    roomId,
    location.pathname,
    navigate,
    isHomePage,
  ]);

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

    // Nếu đang ở trang search, thì mới navigate lại trang search
    if (isSearchPage) {
      navigate(`/search?roomId=${roomId}&karaoke=${isKaraoke}`);
    }
  };

  const handleHomeNavigation = () => {
    navigate(`/?roomId=${roomId}&karaoke=${isKaraoke}`);
  };

  const handleNotification = () => {
    sendNotification(
      { roomId, message: "Yêu cầu hỗ trợ" },
      {
        onSuccess: () => {
          toast.success("Đã yêu cầu nhân viên hỗ trợ");
        },
        onError: () => {
          toast.error("Gặp lỗi khi yêu cầu nhân viên hỗ trợ");
        },
      }
    );
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
        onClick={handleHomeNavigation}
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
            onFocus={() => {
              setShowSuggestions(true);
              if (!isSearchPage) {
                navigate(`/search?roomId=${roomId}&karaoke=${isKaraoke}`);
              }
            }}
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
              if (isSearchPage) {
                navigate(
                  `/search?query=${encodeURIComponent(
                    searchTerm.trim()
                  )}&karaoke=${!isKaraoke}&roomId=${roomId}`
                );
              }
            }}
          />
        </div>
      </div>

      {/* Right: Contact with server     */}
      <div className="flex items-center space-x-4">
        <button
          className={isSearchPage ? "opacity-100" : "opacity-0"}
          onClick={handleHomeNavigation}
        >
          <HomeIcon />
        </button>

        <button onClick={handleNotification}>
          <BellAlertIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
