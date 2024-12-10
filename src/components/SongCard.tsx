import React, { useState } from "react";
import Modal from "@/components/Modal";
import { useQueueMutations } from "@/hooks/useQueueMutations"; // Đường dẫn file hook

interface SongCardProps {
  video_id: string;
  title: string;
  thumbnail: string;
  author: string;
  duration: number;
}

const SongCard: React.FC<SongCardProps> = ({
  video_id,
  title,
  thumbnail,
  author,
  duration,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addSongToQueue } = useQueueMutations();

  const roomId = "1"; // Lấy roomId từ context hoặc prop

  const handleAddToTop = () => {
    addSongToQueue.mutate({
      song: { video_id, title, thumbnail, author, duration },
      position: "top",
      roomId,
    });
    setIsModalOpen(false);
  };

  const handleAddToEnd = () => {
    addSongToQueue.mutate({
      song: { video_id, title, thumbnail, author, duration },
      position: "end",
      roomId,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-1 line-clamp-2 min-h-10">
            {title}
          </h3>
          <p className="text-xs text-gray-500 truncate">{author}</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToTop={handleAddToTop}
        onAddToEnd={handleAddToEnd}
        songTitle={title}
      />
    </>
  );
};

export default SongCard;
