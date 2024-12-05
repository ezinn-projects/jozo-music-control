import React, { createContext, useContext, useState } from "react";

interface Song {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  isPlaying: boolean;
}

interface QueueContextType {
  queue: Song[];
  addSongToEnd: (song: Song) => void;
  addSongToTop: (song: Song) => void;
  removeSong: (videoId: string) => void;
  clearQueue: () => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queue, setQueue] = useState<Song[]>([]);

  const addSongToEnd = (song: Song) => {
    setQueue((prev) => [...prev, song]);
  };

  const addSongToTop = (song: Song) => {
    setQueue((prev) => [song, ...prev]);
  };

  const removeSong = (videoId: string) => {
    setQueue((prev) => prev.filter((song) => song.videoId !== videoId));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <QueueContext.Provider
      value={{ queue, addSongToEnd, addSongToTop, removeSong, clearQueue }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = (): QueueContextType => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
};
