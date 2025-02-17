import RemoveIcon from "@/assets/icons/RemoveIcon";
import { useRemoveSongFromQueue } from "@/hooks/useQueueMutations";
import { useQueueQuery } from "@/hooks/useQueueQuery";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface QueueSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Song {
  title: string;
  author: string;
  thumbnail: string;
  video_id: string;
}

const SortableQueueItem = ({
  song,
  idx,
  onRemove,
}: {
  song: Song;
  idx: number;
  onRemove: (idx: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `${idx}-${song.title}`,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center space-x-4 mb-4 cursor-grab active:cursor-grabbing"
    >
      <div {...listeners} className="flex items-center space-x-4 w-full">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div className="flex justify-between items-center w-full max-w-[calc(100%-56px)]">
          <div className="flex-1 min-w-0">
            <p className="font-bold truncate">{song.title}</p>
            <p className="text-sm text-gray-400 truncate">{song.author}</p>
          </div>
          <button
            className="p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => onRemove(idx)}
          >
            <RemoveIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const QueueSidebar: React.FC<QueueSidebarProps> = ({ isOpen, onClose }) => {
  const { data: queueData } = useQueueQuery();

  const { mutate: removeSongFromQueue } = useRemoveSongFromQueue();

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "";

  const [items, setItems] = React.useState(queueData?.result?.queue || []);

  React.useEffect(() => {
    setItems(queueData?.result?.queue || []);
  }, [queueData?.result?.queue]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(
        (item, idx) => `${idx}-${item.title}` === active.id
      );
      const newIndex = items.findIndex(
        (item, idx) => `${idx}-${item.title}` === over.id
      );

      setItems(arrayMove(items, oldIndex, newIndex));
      // Ở đây bạn có thể thêm API call để cập nhật thứ tự trên server
    }
  };

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
                  {queueData?.result?.nowPlaying?.author}
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
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map((song, idx) => `${idx}-${song.title}`)}
                strategy={verticalListSortingStrategy}
              >
                {items.map((song, idx) => (
                  <SortableQueueItem
                    key={`${idx}-${song.title}`}
                    song={song}
                    idx={idx}
                    onRemove={(idx) => {
                      removeSongFromQueue({
                        videoIndex: idx,
                        roomId: roomId,
                      });
                    }}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueSidebar;
