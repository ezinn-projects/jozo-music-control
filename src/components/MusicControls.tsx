import React from "react";

const MusicControls: React.FC = () => {
  const isPlaying = false; // Tạm thời mock trạng thái
  const currentSong = null; // Mock bài hát hiện tại

  return (
    <div className="bg-gray-900 text-white px-4 py-3">
      {currentSong ? (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Tên bài hát</h3>
            <p className="text-sm text-gray-400">Tên nghệ sĩ</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gray-700 px-4 py-2 rounded">
              {isPlaying ? "Pause" : "Play"}
            </button>
            <input type="range" className="w-full" />
          </div>
        </div>
      ) : (
        <p className="text-center">Hãy chọn bài hát</p>
      )}
    </div>
  );
};

export default MusicControls;
