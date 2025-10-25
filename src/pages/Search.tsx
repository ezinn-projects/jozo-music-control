import SongCard from "@/components/SongCard";
import { searchSongs } from "@/services/searchService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";

// Helper function to detect mobile/tablet devices
const isMobileOrTablet = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
    userAgent
  );
  return isMobile;
};

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const karaoke = searchParams.get("karaoke") === "true";
  const roomId = searchParams.get("roomId") || "";
  const location = useLocation();

  // State để kiểm soát khi nào thực hiện tìm kiếm
  const [shouldSearch, setShouldSearch] = useState(false);
  // Lưu trữ query đã được xử lý (loại bỏ khoảng trắng ở cuối)
  const [processedQuery, setProcessedQuery] = useState("");

  // Tạo hàm debounce để tránh gọi API quá nhiều lần
  const debouncedSearch = useCallback(
    debounce((trimmedQuery: string) => {
      setProcessedQuery(trimmedQuery);
      setShouldSearch(true);
    }, 1000), // Thay đổi từ 500ms thành 5000ms (5 giây)
    []
  );

  // Theo dõi thay đổi URL để kích hoạt tìm kiếm khi người dùng nhập
  useEffect(() => {
    if (query.length >= 2) {
      const trimmedQuery = query.trimEnd();
      debouncedSearch(trimmedQuery);
    } else {
      setProcessedQuery("");
      setShouldSearch(false);
    }

    // Enhanced keyboard handling for mobile devices
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isMobileOrTablet()) {
        e.preventDefault();
        // Blur any focused input element
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        // For iOS devices, we can try to force the keyboard to close
        // by temporarily making the input readonly
        const activeInput = document.activeElement as HTMLInputElement;
        if (activeInput?.tagName === "INPUT") {
          activeInput.setAttribute("readonly", "readonly");
          setTimeout(() => {
            activeInput.removeAttribute("readonly");
          }, 100);
        }
      }
    };

    // Handle form submission on mobile
    const handleFormSubmit = (e: Event) => {
      if (isMobileOrTablet()) {
        e.preventDefault();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("submit", handleFormSubmit);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("submit", handleFormSubmit);
      debouncedSearch.cancel();
    };
  }, [location.search, query, debouncedSearch]);

  // Query cho search results
  const {
    data: results = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchResults", processedQuery.toLowerCase().trim(), karaoke],
    queryFn: () => {
      const normalizedQuery = processedQuery.toLowerCase().trim();
      const isEnglishQuery = /^[a-zA-Z\s]+$/.test(normalizedQuery);
      const musicKeywords = isEnglishQuery
        ? `${normalizedQuery} ${
            karaoke ? "karaoke beat #song #music" : "song #music"
          }`
        : `${normalizedQuery} ${
            karaoke ? "nhạc beat #karaoke" : "bài hát nhạc #hat #music #nhac"
          }`;
      return searchSongs(musicKeywords, roomId || "");
    },
    enabled: shouldSearch && processedQuery.length >= 2 && !!roomId,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="p-4 space-y-6 relative">
      <h2 className="text-xl font-bold">Kết quả tìm kiếm</h2>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <p className="text-xl text-primary font-semibold animate-bounce-slow">
            🎵
            <span className="inline-block animate-pulse text-lightpink">
              Jozo đang tìm kiếm bài hát cho tình yêu...
            </span>
            <span className="inline-block animate-spin-slow">💝</span>
          </p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <p className="text-red-500">Có lỗi xảy ra khi tải kết quả tìm kiếm.</p>
      )}

      {/* Search Results */}
      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {results?.map((result: Video) => (
            <SongCard key={result.video_id} {...result} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && results.length === 0 && processedQuery && shouldSearch && (
        <p className="text-gray-500">Không có kết quả phù hợp.</p>
      )}

      {/* Instruction for user */}
      {query.length < 2 && (
        <p className="text-gray-500">
          Nhập ít nhất 2 ký tự để tìm kiếm bài hát.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
