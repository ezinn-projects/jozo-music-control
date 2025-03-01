import { toast } from "@/components/ToastContainer";
import { PlaybackState } from "@/constant/enum";
import http from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useQueueMutations = () => {
  const queryClient = useQueryClient();

  const addSongToQueue = useMutation({
    mutationFn: async ({
      song,
      position,
      roomId,
    }: {
      song: Video;
      position: "top" | "end";
      roomId: string;
    }) => {
      const response = await http.post<
        ApiResponse<{ queue: Video[]; nowPlaying: Video }>
      >(`/room-music/${roomId}`, {
        ...song,
        position,
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      const { song } = variables;
      toast.success(
        `Thêm bài hát "${song.title}" thành công vào ${
          variables.position === "top" ? "đầu" : "cuối"
        } danh sách!`
      );
      queryClient.setQueryData(
        ["queue", variables.roomId],
        (
          oldData:
            | ApiResponse<{
                nowPlaying: Video;
                queue: Video[];
              }>
            | undefined
        ) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            result: {
              ...oldData.result,
              ...data.result,
            },
          };
        }
      );
    },
    onError: (_: AxiosError, variables) => {
      toast.error(
        `Không thể thêm bài hát "${variables.song.title}" vào danh sách.`
      );
    },
  });

  return { addSongToQueue };
};

export const useRemoveSongFromQueue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      videoIndex,
      roomId,
    }: {
      videoIndex: number;
      roomId: string;
    }) => {
      const response = await http.delete<
        ApiResponse<{ queue: Video[]; nowPlaying: Video }>
      >(`/room-music/${roomId}/${videoIndex}`);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["queue", variables.roomId],
        (
          oldData:
            | ApiResponse<{
                nowPlaying: Video;
                queue: Video[];
              }>
            | undefined
        ) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            result: {
              ...oldData.result,
              queue: data.result.queue,
              // nowPlaying: data.result.nowPlaying,
            },
          };
        }
      );
    },
  });
};

export const usePlaybackMutations = () => {
  return useMutation({
    mutationFn: async ({
      roomId,
      action,
      seekTime,
    }: {
      roomId: string;
      action: PlaybackState;
      seekTime?: number;
    }) => {
      const response = await http.post<ApiResponse<{ action: PlaybackState }>>(
        `/room-music/${roomId}/playback/${action}`,
        { seekTime }
      );

      return response.data;
    },
  });
};

export const usePlayNextSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roomId }: { roomId: string }) => {
      const response = await http.post(`/room-music/${roomId}/play-next-song`);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["queue", variables.roomId],
        (
          oldData:
            | ApiResponse<{
                nowPlaying: Video;
                queue: Video[];
              }>
            | undefined
        ) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            result: {
              ...oldData.result,
              ...data.result,
            },
          };
        }
      );
    },
  });
};
