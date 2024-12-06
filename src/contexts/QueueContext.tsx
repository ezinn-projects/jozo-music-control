import React, { createContext, useContext, useState } from "react";

interface Song {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

interface QueueContextType {
  queue: Song[]; // Danh sách chờ
  nowPlaying: Song | null; // Bài hát đang phát
  addSongToTop: (song: Song) => void; // Thêm bài hát vào đầu
  addSongToEnd: (song: Song) => void; // Thêm bài hát vào cuối
  removeSong: (videoId: string) => void; // Xóa bài hát khỏi hàng đợi
  setNowPlaying: (song: Song) => void; // Đặt bài hát hiện tại
  clearQueue: () => void; // Xóa toàn bộ hàng đợi
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queue, setQueue] = useState<Song[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Song | null>(null);

  // Thêm bài hát vào đầu hàng đợi
  const addSongToTop = (song: Song) => {
    setQueue((prev) => [song, ...prev]);
  };

  // Thêm bài hát vào cuối hàng đợi
  const addSongToEnd = (song: Song) => {
    setQueue((prev) => [...prev, song]);
  };

  // Xóa bài hát khỏi hàng đợi
  const removeSong = (videoId: string) => {
    setQueue((prev) => prev.filter((song) => song.videoId !== videoId));
  };

  // Đặt bài hát hiện tại và xóa nó khỏi hàng đợi
  const handleSetNowPlaying = (song: Song) => {
    setNowPlaying(song);
    setQueue((prev) => prev.filter((s) => s.videoId !== song.videoId));
  };

  // Xóa toàn bộ hàng đợi
  const clearQueue = () => {
    setQueue([]);
    setNowPlaying(null);
  };

  return (
    <QueueContext.Provider
      value={{
        queue,
        nowPlaying,
        addSongToTop,
        addSongToEnd,
        removeSong,
        setNowPlaying: handleSetNowPlaying,
        clearQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) throw new Error("useQueue must be used within a QueueProvider");
  return context;
};
