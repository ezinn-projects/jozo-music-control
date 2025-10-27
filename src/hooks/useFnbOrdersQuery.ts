import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";

export const useFnbOrdersQuery = (roomId: string) => {
  return useQuery({
    queryKey: ["fnb-orders", roomId],
    queryFn: async () => {
      // API mới trả về một object FnbOrder thay vì mảng
      const response = await http.get<ApiResponse<FnbOrder>>(
        `/client/fnb/orders/room/${roomId}`
      );
      const order = response.data.result;

      // Convert object thành mảng để giữ compatibility với component hiện tại
      // Nếu không có order (null/undefined), trả về mảng rỗng
      if (!order) return [];
      return [order];
    },
    enabled: !!roomId, // Chỉ fetch khi có roomId
  });
};
