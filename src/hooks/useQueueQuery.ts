import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useQueueQuery = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");

  return useQuery({
    queryKey: ["queue", roomId],
    queryFn: async () => {
      const response = await http.get<ApiResponse<Video[]>>(
        `/song-queue/${roomId}`
      );
      return response.data;
    },
    enabled: !!roomId,
  });
};
