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
