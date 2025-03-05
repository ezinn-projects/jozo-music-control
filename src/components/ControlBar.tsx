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
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  onToggleQueue: () => void;
};

interface Video {
  video_id: string;
  title: string;
  thumbnail: string;
  duration: number;
  author: string;
}

interface ApiResponse<T> {
  result: T;
  // thêm các trường khác nếu cần
}

const ControlBar: React.FC<Props> = ({ onToggleQueue }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const socketRef = useRef<typeof Socket | null>(null);
  const [params] = useSearchParams();
  const roomId = params.get("roomId") || "";
  const lastTimeUpdateRef = useRef<number>(0);
  const [volume, setVolume] = useState(50);

  const { data: queueData, refetch } = useQueueQuery();

  console.log("queueData", queueData);

  const { mutate: playNextSong } = usePlayNextSong();

  const duration = queueData?.result.nowPlaying?.duration || 0;

  const queryClient = useQueryClient();

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      query: { roomId },
    });

    socketRef.current.on("time_updated", (data: any) => {
      if (!isDragging) {
        const newTime = data.currentTime || 0;

        // Kiểm tra khi video gần kết thúc
        if (duration - data.currentTime <= 1.5) {
          console.log("Video sắp kết thúc!");

          if (queueData?.result?.queue?.length) {
            console.log("Còn bài trong queue, chuyển bài tiếp theo");
            socketRef.current?.emit("remove_current_song", { roomId });
            refetch();

            playNextSong(
              { roomId },
              {
                onSuccess: () => {
                  socketRef.current?.emit("next_song", { roomId });
                  setCurrentTime(0);
                  setIsPlaying(true);
                  queryClient.invalidateQueries({
                    queryKey: ["queue", roomId],
                  });
                },
              }
            );
          } else {
            console.log("Không còn bài trong queue, kết thúc phát nhạc");

            // Cập nhật trạng thái local trước
            queryClient.setQueryData(
              ["queue", roomId],
              (
                oldData:
                  | ApiResponse<{ nowPlaying: Video; queue: Video[] }>
                  | undefined
              ) => ({
                ...oldData,
                result: {
                  ...oldData?.result,
                  nowPlaying: null,
                  queue: [],
                },
              })
            );

            // Sau đó emit các sự kiện
            socketRef.current?.emit("remove_current_song", { roomId });
            socketRef.current?.emit("clear_room_data", { roomId });
            socketRef.current?.emit("song_ended", { roomId });

            // Reset trạng thái phát nhạc
            setCurrentTime(0);
            setIsPlaying(false);
          }
          return;
        }

        // Chỉ cập nhật currentTime khi:
        // 1. Sự khác biệt thời gian đủ lớn (>0.5s)
        // 2. Hoặc khi đang không phát (để đồng bộ chính xác vị trí khi pause)
        if (
          !isPlaying ||
          Math.abs(newTime - currentTime) > 0.5 ||
          Math.abs(newTime - lastTimeUpdateRef.current) > 0.5
        ) {
          setCurrentTime(newTime);
          lastTimeUpdateRef.current = newTime;
        }
      }
    });

    socketRef.current.on("video_event", (data: any) => {
      if (data.event === PlaybackState.PLAY) {
        setIsPlaying(true);
        // Chỉ cập nhật currentTime nếu có sự khác biệt đáng kể
        if (Math.abs(data.currentTime - currentTime) > 0.5) {
          setCurrentTime(data.currentTime || 0);
        }
      } else if (data.event === PlaybackState.PAUSE) {
        setIsPlaying(false);
        // Chỉ cập nhật currentTime nếu có sự khác biệt đáng kể
        if (Math.abs(data.currentTime - currentTime) > 0.5) {
          setCurrentTime(data.currentTime || 0);
        }
      } else if (data.event === PlaybackState.SEEK) {
        setCurrentTime(data.currentTime || 0);
      }
    });

    socketRef.current.on("play_song", (data: any) => {
      if (data) {
        setIsPlaying(true);
        setCurrentTime(0);
      }
    });

    socketRef.current.on("now_playing_cleared", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    socketRef.current.on("song_ended", () => {
      // Chỉ xóa now playing và reset trạng thái khi không còn bài hát nào trong queue
      if (!queueData?.result?.queue?.length) {
        socketRef.current?.emit("song_ended", {
          roomId,
        });

        console.log("song_ended");

        // Cập nhật lại trạng thái local
        queryClient.setQueryData(
          ["queue", roomId],
          (
            oldData:
              | ApiResponse<{ nowPlaying: Video; queue: Video[] }>
              | undefined
          ) => ({
            ...oldData,
            result: {
              ...oldData?.result,
              nowPlaying: null,
              queue: [], // Đảm bảo queue cũng được reset
            },
          })
        );

        // Reset các trạng thái phát nhạc
        setIsPlaying(false);
        setCurrentTime(0);
      }
    });

    socketRef.current.on("volumeChange", (newVolume: number) => {
      setVolume(newVolume);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [
    isDragging,
    roomId,
    playNextSong,
    queueData?.result?.queue?.length,
    queryClient,
    duration,
  ]);

  const handlePlayback = () => {
    if (!queueData?.result.nowPlaying) return;

    const action = isPlaying ? PlaybackState.PAUSE : PlaybackState.PLAY;
    setIsPlaying(!isPlaying);
    sendPlaybackEvent(action);
  };

  console.log("isPlaying", isPlaying);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleSeek = (time: number) => {
    setIsDragging(false);
    setCurrentTime(time);

    console.log("time", time);

    if (socketRef.current) {
      socketRef.current.emit("video_event", {
        roomId,
        videoId: queueData?.result.nowPlaying?.video_id,
        event: PlaybackState.SEEK,
        currentTime: time,
      });
    }
  };

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
    }, 200),
    [socketRef, roomId, queueData]
  );

  const handleDrag = (value: number) => {
    setCurrentTime(value);
    debouncedSeek(value);
  };

  const sendPlaybackEvent = (action: PlaybackState) => {
    if (socketRef.current && queueData?.result.nowPlaying) {
      socketRef.current.emit("video_event", {
        roomId,
        videoId: queueData.result.nowPlaying.video_id,
        event: action,
        currentTime: currentTime,
      });
    }
  };

  const formatTime = (seconds: number): string => {
    if (!queueData?.result.nowPlaying) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Thêm biến để kiểm tra
  const isNowPlaying = !!queueData?.result.nowPlaying;
  const displayCurrentTime = isNowPlaying ? currentTime : 0;
  const displayDuration = isNowPlaying ? duration : 0;

  const nowPlaying = queueData?.result.nowPlaying?.video_id;

  const handleNextSong = () => {
    socketRef.current?.emit("remove_current_song", { roomId });
    playNextSong(
      { roomId },
      {
        onSuccess: () => {
          socketRef.current?.emit("next_song", { roomId });
          socketRef.current?.emit("get_now_playing", { roomId });
          setCurrentTime(0);
          setIsPlaying(true);
        },
      }
    );
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    console.log("newVolume", newVolume);

    socketRef.current?.emit("adjustVolume", newVolume);
  };

  return (
    <>
      <div className="bg-black text-white px-6 py-3 flex items-center justify-between shadow-lg gap-x-6 rounded-3xl z-30">
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
        <div className="flex flex-col items-center w-full gap-y-4">
          <div className="flex items-center space-x-6">
            <button
              onClick={handlePlayback}
              disabled={!nowPlaying}
              className={
                !nowPlaying
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-80"
              }
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              onClick={handleNextSong}
              disabled={!nowPlaying || !queueData?.result?.queue?.length}
              className={
                !nowPlaying || !queueData?.result?.queue?.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-80"
              }
            >
              <ForwardIcon />
            </button>
          </div>

          {isNowPlaying ? (
            <div className="w-full flex items-center space-x-2 text-xs text-gray-400">
              <span>{formatTime(displayCurrentTime)}</span>
              <div className="relative flex-1">
                <div className="absolute top-1/2 left-0 h-2 w-full bg-gray-500 rounded-full -translate-y-1/2"></div>
                <input
                  type="range"
                  min={0}
                  max={displayDuration}
                  value={displayCurrentTime}
                  onMouseDown={handleDragStart}
                  onMouseUp={(e) => handleSeek(Number(e.currentTarget.value))}
                  onChange={(e) => handleDrag(Number(e.target.value))}
                  className="absolute z-20 w-full appearance-none bg-transparent h-2 cursor-pointer -translate-y-1/2 
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-lightpink [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-30 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                    [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-lightpink [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-30 [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
                    [&::-ms-thumb]:appearance-none [&::-ms-thumb]:bg-lightpink [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:relative [&::-ms-thumb]:z-30 [&::-ms-thumb]:transition-all [&::-ms-thumb]:duration-150"
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                />
                <div
                  className="absolute z-10 top-1/2 left-0 h-2 bg-lightpink rounded-full -translate-y-1/2 transition-all duration-75"
                  style={{
                    width: `${(displayCurrentTime / displayDuration) * 100}%`,
                  }}
                />
              </div>
              <span>{formatTime(displayDuration)}</span>
            </div>
          ) : (
            <div className="w-full h-4" />
          )}
        </div>

        <div className="flex items-center space-x-6">
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

          {nowPlaying && (
            <div className="flex items-center space-x-2">
              <span className="text-lg">🔊</span>
              <div className="relative w-24">
                <div className="absolute top-1/2 left-0 h-2 w-full bg-gray-500 rounded-full -translate-y-1/2"></div>
                <div
                  className="absolute z-10 top-1/2 left-0 h-2 bg-lightpink rounded-full -translate-y-1/2 transition-all duration-75"
                  style={{
                    width: `${volume}%`,
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="absolute z-20 w-full appearance-none bg-transparent h-2 cursor-pointer -translate-y-1/2
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-lightpink [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-30
                    [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-lightpink [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-30"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ControlBar;
