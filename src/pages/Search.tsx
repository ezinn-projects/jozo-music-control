import SongCard from "@/components/SongCard";
import { useDebounce } from "@/hooks/useDebounce"; // Custom hook for debounce
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEYS = import.meta.env.VITE_YOUTUBE_API_KEYS.split(",");

// Function to rotate API keys
let keyIndex = 0;
const getNextApiKey = () => {
  const key = API_KEYS[keyIndex];
  keyIndex = (keyIndex + 1) % API_KEYS.length; // Move to the next key
  return key;
};

const fetchResults = async (
  query: string,
  karaoke: boolean
): Promise<Video[]> => {
  if (!query) return [];

  const key = getNextApiKey(); // Use rotated API key
  const response = await http.get(BASE_URL, {
    params: {
      part: "snippet",
      maxResults: 50,
      q: karaoke ? `karaoke ${query}` : query,
      key,
    },
  });

  return response.data.items.map((item: YouTubeSearchItem) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle || "Unknown Artist",
  }));
};

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const karaoke = searchParams.get("karaoke") === "true";
  const roomId = searchParams.get("roomId");

  // Debounced query
  const debouncedQuery = useDebounce(query, 1500); // 1.5 seconds debounce

  // Using TanStack Query to fetch results
  const {
    data: results = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchResults", debouncedQuery, karaoke],
    queryFn: () => fetchResults(debouncedQuery, karaoke),
    enabled: !!debouncedQuery && !!roomId, // Only fetch if debouncedQuery is present
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Kết quả tìm kiếm</h2>

      {isLoading && <p className="text-gray-500">Đang tìm kiếm...</p>}

      {isError && (
        <p className="text-red-500">Có lỗi xảy ra khi tải kết quả tìm kiếm.</p>
      )}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {results.map((result: Video) => (
            <SongCard key={result.videoId} {...result} />
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
