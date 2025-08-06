interface ApiResponse<TData> {
  message: string;
  result: TData;
}

interface Video {
  video_id: string;
  title: string;
  thumbnail: string;
  author: string;
  duration: number; // Nếu cần thời lượng
  url?: string; // URL của video (optional)
}

interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchItem[];
}

interface YouTubeSearchItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

// type PlaybackState = "play" | "pause";

interface FnbCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface FnbItem {
  _id: string;
  name: string;
  price: string;
  description?: string;
  image?: string;
  category: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

interface FnbMenu {
  categories: FnbCategory[];
  items: FnbItem[];
}

interface OrderItem {
  itemId: string;
  quantity: number;
  notes?: string;
}

interface Order {
  id?: string;
  items: OrderItem[];
  totalAmount: number;
  status?: "pending" | "processing" | "completed" | "cancelled";
  createdAt?: string;
}
