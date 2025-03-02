import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SongCard from "@/components/SongCard";
import { useDebounce } from "@/hooks/useDebounce";
import { searchSongs } from "@/services/searchService";
// import { fetchResults } from "@/services/searchService"; // Đường dẫn tới fetchResults

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const karaoke = searchParams.get("karaoke") === "true";
  const roomId = searchParams.get("roomId") || "";

  // Debounced query
  const debouncedQuery = useDebounce(query, 1900);

  // Sử dụng TanStack Query để fetch kết quả
  const {
    data: results = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchResults", debouncedQuery, karaoke],
    queryFn: () => {
      const isEnglishQuery = /^[a-zA-Z\s]+$/.test(debouncedQuery.trim());

      const musicKeywords = karaoke
        ? `karaoke beat ${debouncedQuery}`
        : isEnglishQuery
        ? `${debouncedQuery} beat music song karaoke`
        : `${debouncedQuery} nhạc beat`;

      return searchSongs(musicKeywords, roomId || "");
    },
    enabled: !!debouncedQuery && !!roomId,
    staleTime: 1000 * 60 * 5, // Cache 5 phút
    // retry: 3,
  });

  console.log("results", results);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Kết quả tìm kiếm</h2>

      {isLoading && <p className="text-gray-500">Đang tìm kiếm...</p>}

      {isError && (
        <p className="text-red-500">Có lỗi xảy ra khi tải kết quả tìm kiếm.</p>
      )}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {results?.map((result: Video) => (
            <SongCard key={result.video_id} {...result} />
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && query && (
        <p className="text-gray-500">Không có kết quả phù hợp.</p>
      )}
    </div>
  );
};

export default SearchPage;
