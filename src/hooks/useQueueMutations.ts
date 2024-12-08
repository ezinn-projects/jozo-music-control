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
      const response = await http.post<ApiResponse<Video[]>>(
        `/song-queue/${roomId}`,
        {
          ...song,
          position,
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      const { song } = variables;
      console.log("Song added:", data);
      alert(
        `Thêm bài hát "${song.title}" thành công vào ${
          variables.position === "top" ? "đầu" : "cuối"
        } danh sách!`
      );
      queryClient.setQueryData(
        ["queue", variables.roomId],
        (oldData: ApiResponse<Video[]> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            result: data.result,
          };
        }
      );
    },
    onError: (error: AxiosError, variables) => {
      console.error("Error adding song to queue:", error);
      alert(`Không thể thêm bài hát "${variables.song.title}" vào danh sách.`);
    },
  });

  return { addSongToQueue };
};
