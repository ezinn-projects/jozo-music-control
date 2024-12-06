import React, { useState } from "react";
import { useQueue } from "@/contexts/QueueContext";
import QueueSidebar from "./QueueSidebar";

const ControlBar: React.FC = () => {
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { queue } = useQueue();

  // Mock Data for the currently playing song
  const currentSong = {
    thumbnail: "https://via.placeholder.com/64",
    title: "Tên bài hát",
    artist: "Tên nghệ sĩ",
  };

  return (
    <>
      {/* Control Bar */}
      <div className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg gap-x-6 z-50">
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
            <button className="text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-2xl"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
            </button>
            <button className="text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
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
              onClick={() => setIsQueueOpen(!isQueueOpen)}
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

      {/* Queue Sidebar */}
      <QueueSidebar
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
      />
    </>
  );
};

export default ControlBar;
