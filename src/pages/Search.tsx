import SongCard from "@/components/SongCard";
import { useDebounce } from "@/hooks/useDebounce";
import { searchSongs } from "@/services/searchService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";
// import { fetchResults } from "@/services/searchService"; // Đường dẫn tới fetchResults

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const karaoke = searchParams.get("karaoke") === "true";
  const roomId = searchParams.get("roomId") || "";

  // Debounce cho search (3000ms)
  const debouncedSearch = useDebounce(query, 3000);

  // Query cho search results
  const {
    data: results = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchResults", debouncedSearch, karaoke],
    queryFn: () => {
      const isEnglishQuery = /^[a-zA-Z\s]+$/.test(debouncedSearch.trim());
      const musicKeywords = isEnglishQuery
        ? `${debouncedSearch} ${
            karaoke ? "karaoke beat #song #music" : "song #music"
          }`
        : `${debouncedSearch} ${
            karaoke ? "nhạc beat #karaoke" : "bài hát nhạc #hat #music #nhac"
          }`;
      return searchSongs(musicKeywords, roomId || "");
    },
    enabled: debouncedSearch.length >= 2 && !!roomId,
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
      {!isLoading && results.length === 0 && query && (
        <p className="text-gray-500">Không có kết quả phù hợp.</p>
      )}
    </div>
  );
};

export default SearchPage;
