import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";

export const useFnbOrdersQuery = (roomId: string) => {
  return useQuery({
    queryKey: ["fnb-orders", roomId],
    queryFn: async () => {
      const response = await http.get<ApiResponse<FnbOrder[]>>(
        `/client/fnb/orders/room/${roomId}`
      );
      return response.data.result;
    },
    enabled: !!roomId, // Chỉ fetch khi có roomId
  });
};
