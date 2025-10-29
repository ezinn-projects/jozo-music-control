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
  position?: "top" | "end"; // Vị trí trong queue (top hoặc end)
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

interface FnbVariant {
  _id: string;
  name: string;
  price: number;
  image?: string;
  inventory: {
    quantity: number;
    minStock?: number;
    maxStock?: number;
  };
}

interface FnbItem {
  _id: string;
  name: string;
  parentId?: string;
  hasVariant: boolean;
  price: number;
  description?: string;
  image?: string;
  category: string;
  inventory?: {
    quantity: number;
    lastUpdated: string;
  };
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  existingImage?: string;
  quantity?: string;
  variants?: FnbVariant[] | string; // Array of FnbVariant objects or JSON string (for backward compatibility)
}

interface FnbMenu {
  categories: FnbCategory[];
  items: FnbItem[];
}

interface OrderItem {
  itemId: string;
  category: string;
  variantId?: string; // For items with variants
  quantity: number;
  notes?: string;
}

interface FnbOrder {
  id: string;
  roomId: string;
  order: {
    drinks: Record<string, number>;
    snacks: Record<string, number>;
  };
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  updatedAt?: string;
}

interface CreateFnbOrderPayload {
  order: {
    drinks: Record<string, number>; // { "itemId": quantity }
    snacks: Record<string, number>; // { "itemId": quantity }
  };
}

interface Order {
  id?: string;
  items: OrderItem[];
  totalAmount: number;
  status?: "pending" | "processing" | "completed" | "cancelled";
  createdAt?: string;
}
