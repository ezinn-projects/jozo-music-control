import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";

const useRoom = () => {
  return useMutation({
    mutationFn: ({ roomId, message }: { roomId: string; message: string }) => {
      return http.post(`/room-music/${roomId}/send-notification`, { message });
    },
  });
};

export default useRoom;
