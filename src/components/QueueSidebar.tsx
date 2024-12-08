import React from "react";
import { useQueue } from "@/contexts/QueueContext";
import { useQueueQuery } from "@/hooks/useQueueQuery";

interface QueueSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const QueueSidebar: React.FC<QueueSidebarProps> = ({ isOpen, onClose }) => {
  const { nowPlaying } = useQueue();

  const { data: queueData } = useQueueQuery();

  return (
    <div
      className={`w-full bg-transparent text-white transition-all duration-200 z-40 shadow-md ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-100"
      }`}
    >
      <div className="flex flex-col h-[100vh]">
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
        <div className="overflow-y-auto h-[600px]">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-400">
              Danh sách chờ
            </h3>
            {queueData?.result.map((song, idx) => (
              <div key={idx} className="flex items-center space-x-4 mb-4">
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="w-full max-w-[calc(100%-56px)]">
                  <p className="font-bold truncate">{song.title}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {song.channelTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueSidebar;
