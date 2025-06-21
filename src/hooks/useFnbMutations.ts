import http from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFnbMutations = () => {
  const queryClient = useQueryClient();

  // Mutation để đặt đơn hàng
  const submitOrder = useMutation({
    mutationFn: async (order: Omit<Order, "id" | "createdAt" | "status">) => {
      const response = await http.post<ApiResponse<Order>>("/orders", order);
      return response.data.result;
    },
    onSuccess: () => {
      // Sau khi đặt hàng thành công, invalidate các query liên quan
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  // Mutation để cập nhật đơn hàng (nếu cần)
  const updateOrder = useMutation({
    mutationFn: async (order: Order) => {
      const response = await http.put<ApiResponse<Order>>(
        `/orders/${order.id}`,
        order
      );
      return response.data.result;
    },
    onSuccess: (data) => {
      // Sau khi cập nhật đơn hàng thành công, invalidate các query liên quan
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", data.id] });
    },
  });

  // Mutation để hủy đơn hàng (nếu cần)
  const cancelOrder = useMutation({
    mutationFn: async (orderId: string) => {
      const response = await http.delete<ApiResponse<boolean>>(
        `/orders/${orderId}`
      );
      return response.data.result;
    },
    onSuccess: (_, orderId) => {
      // Sau khi hủy đơn hàng thành công, invalidate các query liên quan
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
    },
  });

  return {
    submitOrder,
    updateOrder,
    cancelOrder,
  };
};
