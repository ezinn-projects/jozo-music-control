import BackwordIcon from "@/assets/icons/BackwordIcon";
import ForwardIcon from "@/assets/icons/ForwardIcon";
import PauseIcon from "@/assets/icons/PauseIcon";
import PlayIcon from "@/assets/icons/PlayIcon";
import { useQueue } from "@/contexts/QueueContext";
import React, { useState } from "react";

type Props = {
  onToggleQueue: () => void;
};

const ControlBar: React.FC<Props> = ({ onToggleQueue }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { queue } = useQueue();

  const currentSong = {
    thumbnail: "https://via.placeholder.com/64",
    title: "Tên bài hát",
    artist: "Tên nghệ sĩ",
  };

  return (
    <>
      {/* Control Bar */}
      <div className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg gap-x-6 rounded-3xl z-30">
        {/* Left: Song Info */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <img
            src={currentSong.thumbnail}
            alt={currentSong.title}
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <p className="text-sm font-bold">{currentSong.title}</p>
            <p className="text-xs text-gray-400">{currentSong.artist}</p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex flex-col items-center w-full gap-y-4">
          <div className="flex items-center space-x-6">
            <button>
              <BackwordIcon />
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button>
              <ForwardIcon />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="w-full flex items-center space-x-2 text-xs text-gray-400">
            <span>0:00</span>
            <div className="flex-1 bg-gray-700 h-2 rounded overflow-hidden">
              <div className="bg-blue-500 h-2" style={{ width: "30%" }}></div>
            </div>
            <span>3:45</span>
          </div>
        </div>

        {/* Right: Queue and Volume */}
        <div className="flex items-center space-x-6">
          {/* Queue Icon */}
          <div className="relative">
            <button
              onClick={onToggleQueue}
              className="text-xl hover:text-blue-500"
            >
              🎵
            </button>
            {queue.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {queue.length}
              </span>
            )}
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <span className="text-lg">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-24"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlBar;
