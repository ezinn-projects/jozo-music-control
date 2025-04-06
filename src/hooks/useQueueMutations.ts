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
      >(`/room-music/${roomId}/queue`, {
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
      >(`/room-music/${roomId}/queue/${videoIndex}`);
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

export const usePlayChosenSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      roomId,
      videoIndex,
    }: {
      roomId: string;
      videoIndex: number;
    }) => {
      // Đây là API endpoint sẽ được thêm ở backend
      const response = await http.post(
        `/room-music/${roomId}/play-chosen-song`,
        { videoIndex }
      );
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

export const useRemoveAllSongs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roomId }: { roomId: string }) => {
      const response = await http.delete(`/room-music/${roomId}/queue`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Xóa tất cả bài hát thành công!");
      queryClient.removeQueries({
        queryKey: ["queue", variables.roomId],
      });
    },
  });
};

export const useUpdateQueueOrder = () => {
  return useMutation({
    mutationFn: async ({
      roomId,
      queue,
    }: {
      roomId: string;
      queue: Video[];
    }) => {
      const response = await http.put(`/room-music/${roomId}/queue`, {
        queue,
      });
      return response.data;
    },
  });
};
