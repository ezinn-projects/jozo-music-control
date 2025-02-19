/* eslint-disable @typescript-eslint/no-explicit-any */
import ForwardIcon from "@/assets/icons/ForwardIcon";
import PauseIcon from "@/assets/icons/PauseIcon";
import PlayIcon from "@/assets/icons/PlayIcon";
import { PlaybackState } from "@/constant/enum";
import { usePlayNextSong } from "@/hooks/useQueueMutations";
import { useQueueQuery } from "@/hooks/useQueueQuery";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { debounce } from "lodash";

type Props = {
  onToggleQueue: () => void;
};

const ControlBar: React.FC<Props> = ({ onToggleQueue }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const socketRef = useRef<typeof Socket | null>(null);
  const lastUpdateRef = useRef({ time: 0, timestamp: Date.now() });
  const animationFrameRef = useRef<number>();
  const [params] = useSearchParams();
  const roomId = params.get("roomId") || "";

  const { data: queueData } = useQueueQuery();

  const { mutate: playNextSong } = usePlayNextSong();

  const duration = queueData?.result.nowPlaying?.duration || 0;

  const updateCurrentTime = useCallback(() => {
    if (!isPlaying || isDragging) {
      return;
    }

    const timePassed = (Date.now() - lastUpdateRef.current.timestamp) / 1000;
    const interpolatedTime = lastUpdateRef.current.time + timePassed;

    if (interpolatedTime <= duration) {
      setCurrentTime(interpolatedTime);
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    } else {
      setCurrentTime(duration);
      setIsPlaying(false);
      if (socketRef.current) {
        socketRef.current.emit("video_event", {
          roomId,
          videoId: queueData?.result.nowPlaying?.video_id,
          event: PlaybackState.PAUSE,
          currentTime: duration,
        });
        // Gọi playNextSong ngay lập tức thay vì đợi setTimeout
        playNextSong(
          { roomId },
          {
            onSuccess: () => {
              socketRef.current?.emit("next_song", { roomId });
              socketRef.current?.emit("get_now_playing", { roomId });
              setIsPlaying(true);
            },
          }
        );
      }
    }
  }, [isPlaying, isDragging, duration, roomId, queueData, playNextSong]);

  useEffect(() => {
    if (isPlaying && !isDragging) {
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isDragging, updateCurrentTime]);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      query: { roomId },
    });

    socketRef.current.on("video_event", (data: any) => {
      if (data.event === PlaybackState.PLAY) {
        setIsPlaying(true);
        lastUpdateRef.current = {
          time: data.currentTime || 0,
          timestamp: Date.now(),
        };
      } else if (data.event === PlaybackState.PAUSE) {
        setIsPlaying(false);
        lastUpdateRef.current = {
          time: currentTime,
          timestamp: Date.now(),
        };
      } else if (data.event === PlaybackState.SEEK) {
        lastUpdateRef.current = {
          time: data.currentTime || 0,
          timestamp: Date.now(),
        };
      }
    });

    socketRef.current.on("next_song", () => {
      socketRef.current?.emit("get_now_playing", { roomId });
    });

    socketRef.current.on("now_playing", (data: any) => {
      if (data) {
        setIsPlaying(true);
        // Cập nhật lastUpdate với thời gian từ server
        setCurrentTime(data.currentTime || 0);
        lastUpdateRef.current = {
          time: data.currentTime || 0,
          timestamp: Date.now(),
        };
      }
    });

    // Thêm listener cho video_time_update
    socketRef.current.on(
      "video_time_update",
      (data: { videoId: string; currentTime: number; timestamp: number }) => {
        // Cập nhật lastUpdateRef với thời gian và timestamp từ server
        lastUpdateRef.current = {
          time: data.currentTime,
          timestamp: data.timestamp,
        };

        // Cập nhật currentTime
        if (!isDragging) {
          setCurrentTime(data.currentTime);
        }
      }
    );

    // Lấy thông tin bài hát hiện tại khi component mount
    socketRef.current.emit("get_now_playing", { roomId });

    return () => {
      socketRef.current?.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [roomId]);

  // Thêm debounce cho việc kéo progress bar
  const debouncedSeek = useCallback(
    debounce((time: number) => {
      if (socketRef.current) {
        socketRef.current.emit("video_event", {
          roomId,
          videoId: queueData?.result.nowPlaying?.video_id,
          event: PlaybackState.SEEK,
          currentTime: time,
        });
      }
    }, 100),
    [socketRef, roomId, queueData]
  );

  const handleDrag = (value: number) => {
    setCurrentTime(value);
    // Cập nhật lastUpdateRef ngay lập tức khi kéo
    lastUpdateRef.current = {
      time: value,
      timestamp: Date.now(),
    };
    debouncedSeek(value);
  };

  const handleSeek = (time: number) => {
    setIsDragging(false);
    // Cập nhật lastUpdateRef ngay khi seek
    lastUpdateRef.current = {
      time: time,
      timestamp: Date.now(),
    };
    setCurrentTime(time);

    if (socketRef.current) {
      socketRef.current.emit("video_event", {
        roomId,
        videoId: queueData?.result.nowPlaying?.video_id,
        event: PlaybackState.SEEK,
        currentTime: time,
      });
    }
  };

  // Gửi sự kiện playback tới server
  const sendPlaybackEvent = (action: PlaybackState) => {
    if (socketRef.current) {
      socketRef.current.emit("video_event", {
        roomId,
        videoId: queueData?.result.nowPlaying?.video_id,
        event: action,
        currentTime: currentTime,
      });
    }
  };

  // Xử lý Play/Pause
  const handlePlayback = () => {
    if (!queueData?.result.nowPlaying) return;

    const action = isPlaying ? PlaybackState.PAUSE : PlaybackState.PLAY;
    setIsPlaying(!isPlaying);
    sendPlaybackEvent(action);
    if (action === PlaybackState.PLAY) {
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };

  console.log("isPlaying", isPlaying);

  // Bắt đầu kéo progress bar
  const handleDragStart = () => {
    setIsDragging(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Định dạng thời gian
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const nowPlaying = queueData?.result.nowPlaying?.video_id;

  return (
    <>
      {/* Control Bar */}
      <div className="bg-black text-white px-6 py-3 flex items-center justify-between shadow-lg gap-x-6 rounded-3xl z-30">
        {/* Left: Song Info */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          {nowPlaying ? (
            <>
              <img
                src={queueData.result.nowPlaying.thumbnail}
                alt="Current Song"
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <div className="w-[200px] overflow-hidden">
                  <p className="text-sm font-bold whitespace-nowrap animate-marquee">
                    {queueData.result.nowPlaying.title}
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {queueData.result.nowPlaying.author}
                </p>
              </div>
            </>
          ) : (
            <div className="text-gray-400">
              Hãy tìm kiếm và thêm bài hát vào danh sách phát
            </div>
          )}
        </div>

        {/* Center: Controls */}
        {nowPlaying && (
          <div className="flex flex-col items-center w-full gap-y-4">
            <div className="flex items-center space-x-6">
              <button onClick={handlePlayback}>
                {isPlaying ? <PlayIcon /> : <PauseIcon />}
              </button>
              <button
                onClick={() => {
                  playNextSong(
                    { roomId },
                    {
                      onSuccess: () => {
                        socketRef.current?.emit("next_song", { roomId });
                        socketRef.current?.emit("get_now_playing", { roomId });
                        setIsPlaying(true);
                      },
                    }
                  );
                }}
              >
                <ForwardIcon />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="w-full flex items-center space-x-2 text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <div className="relative flex-1">
                {/* Thanh nền */}
                <div className="absolute top-1/2 left-0 h-2 w-full bg-secondary rounded-full -translate-y-1/2"></div>
                {/* Input range */}
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onMouseDown={handleDragStart}
                  onMouseUp={(e) => handleSeek(Number(e.currentTarget.value))}
                  onChange={(e) => handleDrag(Number(e.target.value))}
                  className="absolute z-20 w-full appearance-none bg-transparent h-2 cursor-pointer -translate-y-1/2 
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-lightpink [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
                  [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-lightpink [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                  [&::-ms-thumb]:appearance-none [&::-ms-thumb]:bg-lightpink [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:rounded-full"
                />
                {/* Thanh progress */}
                <div
                  className="absolute z-10 top-1/2 left-0 h-2 bg-lightpink rounded-full -translate-y-1/2"
                  style={{
                    width: `${(currentTime / duration) * 100}%`,
                  }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

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
            {!!queueData?.result?.queue?.length &&
              queueData?.result?.queue?.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-lightpink text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {queueData?.result?.queue?.length}
                </span>
              )}
          </div>

          {/* Volume Control - Only show when there's a song playing */}
          {nowPlaying && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default ControlBar;
