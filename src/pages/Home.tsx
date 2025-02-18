import React from "react";
import { useQuery } from "@tanstack/react-query";
import SongCard from "@/components/SongCard";
import { searchSongs } from "@/services/searchService";

const Home: React.FC = () => {
  const categories = ["Rap", "Pop", "Ballad", "Dance", "Indie"];

  // Query để lấy trending videos
  const { data: trendingVideos = [], isLoading } = useQuery({
    queryKey: ["trendingVideos1"],
    queryFn: () => searchSongs("karaoke thịnh hành", ""),
    staleTime: 1000 * 60 * 30, // Cache 30 phút
  });

  return (
    <div className="p-4 space-y-8">
      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Thể loại âm nhạc</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-blue-100 text-blue-700 px-6 py-4 rounded-lg shadow-md hover:bg-blue-200"
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
