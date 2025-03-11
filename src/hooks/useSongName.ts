import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { useSearchParams } from "react-router-dom";

interface UseSongNameOptions {
  enabled?: boolean;
}

export const useSongName = (query: string, options?: UseSongNameOptions) => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const karaoke = searchParams.get("karaoke") === "true";

  return useQuery({
    queryKey: ["songName", query, karaoke],
    queryFn: async () => {
      const response = await http.get<ApiResponse<string[]>>(
        `/room-music/${roomId}/autocomplete`,
        {
          params: {
            keyword: query,
            karaoke,
          },
        }
      );
      return response.data;
    },
    select: (data) => data.result,
    enabled: options?.enabled && query.length >= 2,
    staleTime: 1000 * 60, // Cache trong 1 phút
    refetchOnWindowFocus: false, // Không gọi lại khi focus window
  });
};
