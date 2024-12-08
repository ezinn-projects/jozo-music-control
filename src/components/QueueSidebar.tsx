import RemoveIcon from "@/assets/icons/RemoveIcon";
import { useRemoveSongFromQueue } from "@/hooks/useQueueMutations";
import { useQueueQuery } from "@/hooks/useQueueQuery";
import React from "react";
import { useSearchParams } from "react-router-dom";

interface QueueSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const QueueSidebar: React.FC<QueueSidebarProps> = ({ isOpen, onClose }) => {
  const { data: queueData } = useQueueQuery();

  const { mutate: removeSongFromQueue } = useRemoveSongFromQueue();

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "";

  console.log("queueData", queueData?.result.queue);

  return (
    <div
      className={`w-full bg-transparent text-white transition-all duration-200 z-40 shadow-md ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-100"
      }`}
    >
      <div className="flex flex-col h-[100vh]">
        {/* Close Button */}
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-lg font-bold">Danh sách</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✖
          </button>
        </div>

        {/* Now Playing */}
        {queueData?.result?.nowPlaying && (
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400">Đang phát</h3>
            <div className="flex items-center space-x-4 mt-3">
              <img
                src={queueData?.result?.nowPlaying?.thumbnail}
                alt={queueData?.result?.nowPlaying?.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-bold truncate">
                  {queueData?.result?.nowPlaying?.title}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {queueData?.result?.nowPlaying?.channelTitle}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Waiting Queue */}
        <div className="overflow-y-auto h-[600px]">
          <div className="p-4">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-semibold text-gray-400">
                Danh sách chờ
              </h3>
              {!!queueData?.result?.queue?.length && (
                <button className="text-gray-400 hover:text-white flex items-center gap-x-3">
                  xóa tất cả
                  <RemoveIcon />
                </button>
              )}
            </div>
            {queueData?.result?.queue?.map((song, idx) => (
              <div key={idx} className="flex items-center space-x-4 mb-4">
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex justify-between items-center w-full max-w-[calc(100%-56px)]">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{song.title}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {song.channelTitle}
                    </p>
                  </div>
                  <button
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => {
                      removeSongFromQueue({
                        videoIndex: idx,
                        roomId: roomId,
                      });
                    }}
                  >
                    <RemoveIcon />
                  </button>
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
