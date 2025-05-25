import BellAlertIcon from "@/assets/icons/BellAlertIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import { logo } from "@/assets/images";
import useRoom from "@/hooks/useRoom";
import { useSongName } from "@/hooks/useSongName";
import { useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Switch from "./Switch";
import { toast } from "./ToastContainer";

// Icon component for F&B
// const FoodIcon: React.FC = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="size-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
//     />
//   </svg>
// );

const Header: React.FC = () => {
  // Gộp trạng thái tìm kiếm vào một object
  const [searchState, setSearchState] = useState({
    term: "",
    debouncedTerm: "",
    showSuggestions: false,
  });

  const [isKaraoke, setIsKaraoke] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "1";

  const queryClient = useQueryClient();
  const { mutate: sendNotification } = useRoom();

  // Tính toán các biến thường dùng
  const isSearchPage = location.pathname.includes("/search");
  const isHomePage = location.pathname === "/" || location.pathname === "";

  // Đồng bộ URL params với state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const karaoke = params.get("karaoke") || "true";

    // Chỉ cập nhật khi giá trị thay đổi
    if (query !== searchState.term) {
      setSearchState((prev) => ({
        ...prev,
        term: query,
        debouncedTerm: query,
      }));
    }

    setIsKaraoke(karaoke === "true");
  }, [location.search]);

  // Xử lý debounce cho việc cập nhật debouncedTerm
  const debouncedSetTerm = useMemo(
    () =>
      debounce((term: string) => {
        setSearchState((prev) => ({
          ...prev,
          debouncedTerm: term,
        }));
      }, 500),
    []
  );

  // Cập nhật debounced term khi term thay đổi
  useEffect(() => {
    debouncedSetTerm(searchState.term);
    return () => debouncedSetTerm.cancel();
  }, [searchState.term, debouncedSetTerm]);

  // Tối ưu hóa hàm debounce navigation
  const debouncedNavigate = useMemo(
    () =>
      debounce((query: string) => {
        const trimmedQuery = query.trim();
        const baseUrl = `/search?roomId=${roomId}&karaoke=${isKaraoke}`;

        if (trimmedQuery) {
          navigate(`${baseUrl}&query=${encodeURIComponent(trimmedQuery)}`);
        } else if (isSearchPage) {
          navigate(baseUrl);
        } else if (!isHomePage) {
          navigate(baseUrl);
        }
      }, 800),
    [roomId, isKaraoke, isSearchPage, isHomePage, navigate]
  );

  // Hủy debounce khi component unmount
  useEffect(() => {
    return () => {
      debouncedNavigate.cancel();
      debouncedSetTerm.cancel();
    };
  }, [debouncedNavigate, debouncedSetTerm]);

  // Click outside để đóng suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchState((prev) => ({
          ...prev,
          showSuggestions: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to trigger navigation when isKaraoke changes
  useEffect(() => {
    if (isSearchPage && searchState.term) {
      const baseUrl = `/search?roomId=${roomId}`;
      navigate(
        `${baseUrl}&query=${encodeURIComponent(
          searchState.term.trim()
        )}&karaoke=${isKaraoke}`
      );
    }
  }, [isKaraoke, roomId, isSearchPage, searchState.term, navigate]);

  // Handle input change với cách tiếp cận tối ưu hơn
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchState((prev) => ({
      ...prev,
      term: value,
      showSuggestions: true,
    }));

    // Trigger navigation with debounce
    debouncedNavigate(value);
  };

  // Query cho auto complete suggestions
  const { data: songNameSuggestions } = useSongName(searchState.debouncedTerm, {
    enabled:
      searchState.showSuggestions && searchState.debouncedTerm.length >= 2,
  });

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchState({
      term: suggestion,
      debouncedTerm: suggestion,
      showSuggestions: false,
    });

    // Navigate immediately for suggestion selection (no debounce)
    navigate(
      `/search?roomId=${roomId}&query=${encodeURIComponent(
        suggestion
      )}&karaoke=${isKaraoke}`
    );
  };

  const handleClearSearch = () => {
    setSearchState({
      term: "",
      debouncedTerm: "",
      showSuggestions: false,
    });

    queryClient.removeQueries({ queryKey: ["songName"] });

    if (isSearchPage) {
      navigate(`/search?roomId=${roomId}&karaoke=${isKaraoke}`);
    }

    // Focus vào input để hiển thị bàn phím trên tablet
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleHomeNavigation = () => {
    navigate(`/?roomId=${roomId}&karaoke=${isKaraoke}`);
  };

  // const handleFnbNavigation = () => {
  //   // navigate(`/fnb?roomId=${roomId}`);
  // };

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
            value={searchState.term}
            onChange={handleInputChange}
            onFocus={() => {
              setSearchState((prev) => ({ ...prev, showSuggestions: true }));
              if (!isSearchPage) {
                navigate(`/search?roomId=${roomId}&karaoke=${isKaraoke}`);
              }
            }}
            className="w-full p-3 bg-secondary text-white rounded-lg shadow-md focus:outline-none"
          />
          {searchState.term && (
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
        {searchState.showSuggestions &&
          songNameSuggestions &&
          songNameSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg z-50 border border-gray-200 mt-1">
              <div className="flex justify-between items-center border-b border-gray-200">
                <div className="p-2 text-gray-600 font-medium">Gợi ý</div>
                <button
                  className="p-2 text-gray-500 hover:text-gray-800"
                  onClick={() =>
                    setSearchState((prev) => ({
                      ...prev,
                      showSuggestions: false,
                    }))
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
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
                    searchState.term.trim()
                  )}&karaoke=${!isKaraoke}&roomId=${roomId}`
                );
              }
            }}
          />
        </div>
      </div>

      {/* Right: Contact with server */}
      <div className="flex items-center space-x-4">
        <button
          className={isSearchPage ? "opacity-100" : "opacity-0"}
          onClick={handleHomeNavigation}
        >
          <HomeIcon />
        </button>

        {/* <button
          onClick={handleFnbNavigation}
          className="text-lightpink hover:text-lightpink/80"
          title="Đặt đồ ăn & thức uống"
        >
          <FoodIcon />
        </button> */}

        <button onClick={handleNotification}>
          <BellAlertIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
