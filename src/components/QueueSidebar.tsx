import React from "react";
import { useQueue } from "@/contexts/QueueContext";

interface QueueSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const QueueSidebar: React.FC<QueueSidebarProps> = ({ isOpen, onClose }) => {
  const { queue, nowPlaying } = useQueue();

  const waitingQueue = queue.filter(
    (song) => song.videoId !== nowPlaying?.videoId
  );

  return (
    <div
      className={`fixed right-0 w-1/3 bg-gray-900 text-white transition-all duration-200 ${
        isOpen
          ? "translate-y-0 opacity-100 bottom-[72px] blur-0"
          : "translate-y-full opacity-0 bottom-0 blur-sm"
      }`}
      style={{ height: "calc(100vh - 72px - 80px)" }} // Trừ Header (72px) và Control Bar (80px)
    >
      {/* Close Button */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-lg font-bold">Queue</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✖
        </button>
      </div>

      {/* Now Playing */}
      {nowPlaying && (
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400">Đang phát</h3>
          <div className="flex items-center space-x-4">
            <img
              src={nowPlaying.thumbnail}
              alt={nowPlaying.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <p className="font-bold truncate">{nowPlaying.title}</p>
              <p className="text-sm text-gray-400 truncate">
                {nowPlaying.channelTitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Waiting Queue */}
      <div className="p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-gray-400">Danh sách chờ</h3>
        {waitingQueue.map((song, idx) => (
          <div key={idx} className="flex items-center space-x-4 mb-4">
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <p className="font-bold truncate">{song.title}</p>
              <p className="text-sm text-gray-400 truncate">
                {song.channelTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueSidebar;
