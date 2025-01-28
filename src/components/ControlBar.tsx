/* eslint-disable @typescript-eslint/no-explicit-any */
import BackwordIcon from "@/assets/icons/BackwordIcon";
import ForwardIcon from "@/assets/icons/ForwardIcon";
import PauseIcon from "@/assets/icons/PauseIcon";
import PlayIcon from "@/assets/icons/PlayIcon";
import { PlaybackState } from "@/constant/enum";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";

type Props = {
  onToggleQueue: () => void;
};

const ControlBar: React.FC<Props> = ({ onToggleQueue }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại
  const [isDragging, setIsDragging] = useState(false); // Theo dõi trạng thái kéo progress bar
  const [duration, setDuration] = useState(300); // Thời lượng video (giả định)
  const [queue, setQueue] = useState<number[]>([]); // Giả định queue
  const socketRef = useRef<typeof Socket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [params] = useSearchParams();
  const roomId = params.get("roomId") || "";

  useEffect(() => {
    // Khởi tạo kết nối WebSocket
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      query: { roomId },
    });

    // Lắng nghe sự kiện từ server
    socketRef.current.on("playback_event", (data: any) => {
      if (data.event === "play") {
        setIsPlaying(true);
        setCurrentTime(data.currentTime || 0);
        startInterval();
        setDuration(0);
      } else if (data.event === "pause") {
        setIsPlaying(false);
        stopInterval();
      } else if (data.event === "seek") {
        setCurrentTime(data.currentTime || 0);
      }
    });

    // Lắng nghe sự kiện cập nhật queue
    socketRef.current.on("update_queue", (data: any) => {
      setQueue(data.queue || []);
    });

    return () => {
      socketRef.current?.disconnect();
      stopInterval();
    };
  }, [roomId]);

  // Bắt đầu cập nhật thời gian mỗi giây khi video phát
  const startInterval = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => (prev < duration ? prev + 1 : prev));
      }, 1000);
    }
  };

  // Dừng cập nhật thời gian
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Gửi sự kiện playback tới server
  const sendPlaybackEvent = (action: PlaybackState, time?: number) => {
    if (socketRef.current) {
      socketRef.current.emit("playback_event", {
        roomId,
        event: action,
        currentTime: time || currentTime,
      });
    }
  };

  // Xử lý Play/Pause
  const handlePlayback = () => {
    const action = isPlaying ? PlaybackState.PAUSE : PlaybackState.PLAY;
    setIsPlaying(!isPlaying);
    sendPlaybackEvent(action);
    if (action === PlaybackState.PLAY) {
      startInterval();
    } else {
      stopInterval();
    }
  };

  // Xử lý tua thời gian
  const handleSeek = (time: number) => {
    setCurrentTime(time);
    setIsDragging(false);
    sendPlaybackEvent(PlaybackState.SEEK, time);
  };

  // Bắt đầu kéo progress bar
  const handleDragStart = () => {
    setIsDragging(true);
    stopInterval();
  };

  // Khi đang kéo progress bar
  const handleDrag = (value: number) => {
    if (isDragging) {
      setCurrentTime(value);
    }
  };

  // Định dạng thời gian
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Control Bar */}
      <div className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg gap-x-6 rounded-3xl z-30">
        {/* Left: Song Info */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <img
            src="/placeholder.jpg"
            alt="Current Song"
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <p className="text-sm font-bold line-clamp-1 max-w-[200px]">
              Bài hát hiện tại
            </p>
            <p className="text-xs text-gray-400">Ca sĩ</p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex flex-col items-center w-full gap-y-4">
          <div className="flex items-center space-x-6">
            <button disabled={queue.length === 0}>
              <BackwordIcon />
            </button>
            <button onClick={handlePlayback}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button disabled={queue.length === 0}>
              <ForwardIcon />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="w-full flex items-center space-x-2 text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <div className="relative flex-1">
              {/* Thanh nền */}
              <div className="absolute top-1/2 left-0 h-2 w-full bg-gray-700 rounded-full -translate-y-1/2"></div>
              {/* Input range */}
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onMouseDown={handleDragStart}
                onMouseUp={(e) => handleSeek(Number(e.currentTarget.value))}
                onChange={(e) => handleDrag(Number(e.target.value))}
                className="absolute z-20 w-full appearance-none bg-transparent h-2 cursor-pointer -translate-y-1/2"
              />
              {/* Thanh progress */}
              <div
                className="absolute z-10 top-1/2 left-0 h-2 bg-blue-500 rounded-full -translate-y-1/2"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              ></div>
            </div>
            <span>{formatTime(duration)}</span>
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
