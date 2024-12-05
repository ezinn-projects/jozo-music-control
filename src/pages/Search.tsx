import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import Switch from "@/components/Switch";
import SongCard from "@/components/SongCard";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const API_KEYS = [
  "AIzaSyBWw8iM6ePMGS4Rli-nGZhd_XR6a5qftn8",
  "AIzaSyBw0PUNvxg4Swa5o6NHnyGau8KI7WfZ5g4",
  "AIzaSyDVFaMtyhuPevzta1LLP9b8Tg0GuzbulQE",
];
let currentKeyIndex = 0;

function getCurrentKey() {
  return API_KEYS[currentKeyIndex];
}

function switchToNextKey() {
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
}

interface YouTubeItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle?: string;
  };
}

interface SearchResult {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isKaraokeMode, setIsKaraokeMode] = useState<boolean>(true);

  console.log("isLoading :>> ", isLoading);

  const handleSearch = async (query: string, pageToken: string = "") => {
    if (!query) return;

    if (pageToken) {
      setIsFetchingMore(true);
    } else {
      setIsLoading(true);
      setResults([]);
    }

    let attempt = 0;
    const maxAttempts = API_KEYS.length;

    while (attempt < maxAttempts) {
      const currentKey = getCurrentKey();

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            part: "snippet",
            q: isKaraokeMode ? `karaoke ${query}` : query,
            maxResults: 50,
            pageToken,
            key: currentKey,
            fields:
              "items(id/videoId,snippet(title,thumbnails/medium/url,channelTitle)),nextPageToken",
          },
        });

        const items = response.data.items.map((item: YouTubeItem) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channelTitle: item.snippet.channelTitle || "Unknown Artist",
        }));

        setResults((prev) => (pageToken ? [...prev, ...items] : items));
        setNextPageToken(response.data.nextPageToken || null);
        setIsLoading(false);
        setIsFetchingMore(false);
        return; // Thành công, thoát khỏi vòng lặp
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(
          `Error fetching search results with key ${currentKey}:`,
          error
        );

        // Nếu lỗi liên quan đến quota, chuyển sang key tiếp theo
        if (axiosError.response?.status === 403) {
          console.log(
            `Key ${currentKey} hết quota. Chuyển sang key tiếp theo...`
          );
          switchToNextKey();
          attempt++;
        } else {
          // Lỗi khác không liên quan đến quota
          setError("Không thể tải kết quả tìm kiếm. Vui lòng thử lại.");
          break;
        }
      }
    }

    // Nếu tất cả các keys đều thất bại
    if (attempt >= maxAttempts) {
      setError("Tất cả các keys đã hết quota. Vui lòng thử lại sau.");
    }

    setIsLoading(false);
    setIsFetchingMore(false);
  };

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      setNextPageToken(null);
      return;
    }

    const delayDebounce = setTimeout(() => {
      handleSearch(searchTerm);
    }, 1500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, isKaraokeMode]);

  const handleLoadMore = useCallback(() => {
    if (nextPageToken) {
      handleSearch(searchTerm, nextPageToken);
    }
  }, [nextPageToken, searchTerm]);

  const handleClearResults = () => {
    setSearchTerm("");
    setResults([]);
    setNextPageToken(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="flex items-center space-x-4">
        <div className="flex w-full items-center space-x-2 border bg-gray-200 border-gray-300 rounded-lg px-3 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm bài hát hoặc nghệ sĩ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none outline-none bg-inherit"
          />
          {searchTerm && (
            <button
              onClick={handleClearResults}
              className="text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {/* Karaoke Mode Switch */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <label className="text-sm text-gray-700">Karaoke Mode</label>
          <Switch
            isChecked={isKaraokeMode}
            onChange={() => setIsKaraokeMode(!isKaraokeMode)}
          />
        </div>
      </div>

      {/* Search Results */}
      <div>
        <h2 className="text-xl font-bold mb-4">Kết quả tìm kiếm</h2>
        {isLoading ? (
          <p className="text-gray-500">Đang tìm kiếm...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((result) => (
                <SongCard {...result} key={result.videoId} />
              ))}
            </div>

            <div className="flex justify-center">
              {/* Load More */}
              {nextPageToken && !isFetchingMore && results.length < 70 && (
                <button
                  onClick={handleLoadMore}
                  className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 flex justify-center"
                >
                  Tải thêm
                </button>
              )}
              {isFetchingMore && (
                <p className="text-gray-500 text-center">Đang tải thêm...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
