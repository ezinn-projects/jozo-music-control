import axiosInstance from "@/utils/http";

/**
 * Hàm tìm kiếm bài hát
 * @param query - Từ khóa tìm kiếm
 * @param limit - Số lượng kết quả trả về (mặc định: 50)
 * @returns Danh sách các video tìm thấy
 */
export const searchSongs = async (
  query: string,
  roomId: string,
  limit: number = 50
): Promise<Video[]> => {
  if (!query) return [];

  try {
    const response = await axiosInstance.get<ApiResponse<Video[]>>(
      `/room-music/${roomId}/search-songs`,
      {
        params: {
          q: query, // Từ khóa tìm kiếm
          limit, // Giới hạn kết quả
        },
      }
    );

    // Định dạng lại kết quả trả về từ API
    return response?.data?.result && Array.isArray(response.data.result)
      ? response.data.result.map((item: Video) => ({
          video_id: item.video_id,
          title: item.title,
          thumbnail: item.thumbnail || "",
          author: item.author || "Unknown Artist",
          duration: item.duration || 0,
        }))
      : [];
    // ... existing code ...
  } catch (error) {
    console.error("Error in searchSongs:", error);
    throw error; // Cho phép React Query hoặc caller xử lý lỗi
  }
};
