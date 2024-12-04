import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Từ khóa tìm kiếm
  const [results, setResults] = useState<any[]>([]); // Kết quả tìm kiếm
  const [isLoading, setIsLoading] = useState<boolean>(false); // Trạng thái loading

  console.log("API_KEY :>> ", API_KEY);

  const handleSearch = async (query: string) => {
    if (!query) return;

    setIsLoading(true);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          part: "snippet",
          maxResults: 10,
          q: `karaoke ${query}`,
          key: API_KEY,
        },
      });

      const items = response.data.items.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle || "Unknown Artist",
      }));

      setResults(items);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        handleSearch(searchTerm);
      }
    }, 500); // Debounce API call to prevent too many requests

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm bài hát hoặc nghệ sĩ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Search Results */}
      <div>
        <h2 className="text-xl font-bold mb-4">Kết quả tìm kiếm</h2>
        {isLoading ? (
          <p className="text-gray-500">Đang tìm kiếm...</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={result.thumbnail}
                  alt={result.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-1 truncate">
                    {result.title}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {result.channelTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có kết quả phù hợp</p>
        )}
      </div>
    </div>
  );
};

export default Search;
