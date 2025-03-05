import RemoveIcon from "@/assets/icons/RemoveIcon";
import {
  useRemoveAllSongs,
  useRemoveSongFromQueue,
  useUpdateQueueOrder,
} from "@/hooks/useQueueMutations";
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
import DragHandleIcon from "@/assets/icons/DragHandleIcon";
// import DragHandleIcon from "@/assets/icons/DragHandleIcon";

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
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center space-x-4 mb-4"
    >
      <div className="flex items-center space-x-4 w-full">
        <div
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-white"
        >
          <DragHandleIcon />
        </div>
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div className="flex justify-between items-center w-full max-w-[calc(100%-56px)]">
          <div className="flex-1 min-w-0">
            <p className="font-bold truncate marquee hover:marquee-animation max-w-[200px]">
              {song.title}
            </p>
            <p className="text-sm text-gray-400 truncate marquee-text hover:marquee-animation">
              {song.author}
            </p>
          </div>
          <button
            className="p-2 text-gray-400 hover:text-white transition-colors flex items-center"
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

  const { mutate: removeAllSongs } = useRemoveAllSongs();

  const { mutate: updateQueueOrder } = useUpdateQueueOrder();

  const handleRemoveAll = () => {
    removeAllSongs({ roomId: roomId });
  };

  React.useEffect(() => {
    setItems(queueData?.result?.queue || []);
  }, [queueData?.result?.queue]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(
        (item, idx) => `${idx}-${item.title}` === active.id
      );
      const newIndex = items.findIndex(
        (item, idx) => `${idx}-${item.title}` === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        const result = arrayMove(items, oldIndex, newIndex);
        setItems(result);
        updateQueueOrder({
          roomId: roomId,
          queue: result,
        });
      }
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

        {/* Waiting Queue - phần scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div
            className="p-4"
            style={{
              paddingBottom: `${Math.max(
                48,
                (queueData?.result?.queue?.length || 0) * 10
              )}px`,
            }}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-semibold text-gray-400">
                Danh sách chờ
              </h3>
              {!!queueData?.result?.queue?.length && (
                <button
                  className="text-gray-400 hover:text-white flex items-center gap-x-3"
                  onClick={handleRemoveAll}
                >
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
