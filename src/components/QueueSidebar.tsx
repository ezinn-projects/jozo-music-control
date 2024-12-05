import React from "react";
import { useQueue } from "@/contexts/QueueContext";

interface QueueSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const QueueSidebar: React.FC<QueueSidebarProps> = ({ isOpen, onClose }) => {
  const { queue, removeSong, clearQueue } = useQueue();

  if (!isOpen) return null;

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).id === "queue-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="queue-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={handleClickOutside}
    >
      <div className="h-full bg-white shadow-lg w-80 p-4 absolute right-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Hàng đợi bài hát</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {queue.length === 0 ? (
          <p className="text-gray-500">Hàng đợi trống.</p>
        ) : (
          <ul className="overflow-y-auto">
            {queue.map((song) => (
              <li
                key={song.videoId}
                className={`flex items-center space-x-4 mb-4 ${
                  song.isPlaying ? "bg-blue-100" : ""
                }`}
              >
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold truncate">{song.title}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {song.channelTitle}
                  </p>
                </div>
                {song.isPlaying && (
                  <span className="text-green-500 text-xl font-bold">▶</span>
                )}
                <button
                  onClick={() => removeSong(song.videoId)}
                  className="text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        )}

        {queue.length > 0 && (
          <button
            onClick={clearQueue}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 w-full"
          >
            Xóa tất cả
          </button>
        )}
      </div>
    </div>
  );
};

export default QueueSidebar;
