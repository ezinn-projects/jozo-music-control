import React from "react";
import { useQuery } from "@tanstack/react-query";
import SongCard from "@/components/SongCard";
import { searchSongs } from "@/services/searchService";
import { useSearchParams, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const categories = [
    "Rap",
    "Pop",
    "Ballad",
    "Dance",
    "Indie",
    "Kpop",
    "Vpop",
    "US-UK",
  ];
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const roomId = params.get("roomId") || "";
  const isKaraoke = params.get("karaoke") || "true";

  // Query để lấy trending videos
  const { data: trendingVideos = [], isLoading } = useQuery({
    queryKey: ["trendingVideos1"],
    queryFn: () =>
      searchSongs("nhạc hot 2024 karaoke beat xu hướng Việt Nam", roomId),
    staleTime: 1000 * 60 * 30, // Cache 30 phút
  });

  return (
    <div className="p-4 space-y-8">
      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Thể loại âm nhạc</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm shadow-sm hover:bg-pink-200 transition-colors animate-pulse`}
              style={{ animationDelay: `${index * 400}ms` }}
              onClick={() => {
                navigate(
                  `/search?roomId=${roomId}&query=${encodeURIComponent(
                    category.trim()
                  )}&karaoke=${isKaraoke}`
                );
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Videos Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Bài Hát Đang Hot</h2>
        {isLoading && <p className="text-gray-500">Đang tải...</p>}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingVideos?.map((video: Video) => (
            <SongCard key={video.video_id} {...video} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
