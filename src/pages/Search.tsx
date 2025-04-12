import SongCard from "@/components/SongCard";
import { searchSongs } from "@/services/searchService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

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

  // Theo dõi thay đổi URL để kích hoạt tìm kiếm khi người dùng nhấn Enter hoặc chọn suggestion
  useEffect(() => {
    if (query.length >= 2) {
      // Xử lý query để loại bỏ khoảng trắng ở cuối
      const trimmedQuery = query.trimEnd();
      // Chỉ cập nhật processedQuery khi nó thực sự thay đổi (không phải chỉ thêm space)
      if (trimmedQuery !== processedQuery) {
        setProcessedQuery(trimmedQuery);
        setShouldSearch(true);
      } else {
        setShouldSearch(true);
      }
    }
  }, [location.search, query]);

  // Query cho search results
  const {
    data: results = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchResults", processedQuery, karaoke],
    queryFn: () => {
      const isEnglishQuery = /^[a-zA-Z\s]+$/.test(processedQuery.trim());
      const musicKeywords = isEnglishQuery
        ? `${processedQuery} ${
            karaoke ? "karaoke beat #song #music" : "song #music"
          }`
        : `${processedQuery} ${
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
      {!shouldSearch && processedQuery && (
        <p className="text-gray-500">
          Nhấn Enter để tìm kiếm hoặc chọn từ gợi ý.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
