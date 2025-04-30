import BellAlertIcon from "@/assets/icons/BellAlertIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Switch from "./Switch";
import { logo } from "@/assets/images";
import { useSongName } from "@/hooks/useSongName";
import { useQueryClient } from "@tanstack/react-query";
import useRoom from "@/hooks/useRoom";
import { toast } from "./ToastContainer";
import debounce from "lodash/debounce";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isKaraoke, setIsKaraoke] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "1";

  const queryClient = useQueryClient();

  const { mutate: sendNotification } = useRoom();

  // Đồng bộ input search với query params (only on location change, not during typing)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const karaoke = params.get("karaoke") || "true";

    // Only update if the value is different to avoid input jumps
    if (query !== searchTerm) {
      setSearchTerm(query);
    }
    setIsKaraoke(karaoke === "true" ? true : false);
  }, [location.search]);

  const isSearchPage = location.pathname.includes("/search");
  const isHomePage = location.pathname === "/" || location.pathname === "";

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  // Handle input change with direct state update (no debounce for the actual input value)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
  };

  // Create memoized navigation function

  const debouncedNavigate = useRef(
    debounce((query: string) => {
      if (!isHomePage) {
        if (query.trim()) {
          navigate(
            `/search?roomId=${roomId}&query=${encodeURIComponent(
              query.trim()
            )}&karaoke=${isKaraoke}`
          );
        } else {
          navigate(`/search?roomId=${roomId}&karaoke=${isKaraoke}`);
        }
      }
    }, 600)
  ).current;

  // Effect to trigger navigation when searchTerm changes
  useEffect(() => {
    if (!isHomePage) {
      debouncedNavigate(searchTerm);
    }

    return () => {
      debouncedNavigate.cancel();
    };
  }, [searchTerm, isKaraoke, roomId, debouncedNavigate, isHomePage]);

  // Query cho auto complete suggestions with longer debounce
  const { data: songNameSuggestions } = useSongName(searchTerm, {
    enabled: showSuggestions && searchTerm.length >= 2,
  });

  const handleSelectSuggestion = (suggestion: string) => {
    setShowSuggestions(false);
    setSearchTerm(suggestion);

    // Navigate immediately for suggestion selection (no debounce)
    navigate(
      `/search?roomId=${roomId}&query=${encodeURIComponent(
        suggestion
      )}&karaoke=${isKaraoke}`
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    queryClient.removeQueries({ queryKey: ["songName"] });

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
            ref={inputRef}
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
