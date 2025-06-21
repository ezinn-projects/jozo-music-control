import React from "react";
import SongCard from "@/components/SongCard";
import { useSearchParams, useNavigate } from "react-router-dom";

interface Video {
  video_id: string;
  title: string;
  duration: number;
  url: string;
  thumbnail: string;
  author: string;
}

const Home: React.FC = () => {
  const categories = [
    "Rap",
    "Pop",
    "Ballad",
    "Dance",
    "Indie",
    "Kpop",
    "Vpop",
    "US-UK",
  ];
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const roomId = params.get("roomId") || "";
  const isKaraoke = params.get("karaoke") || "true";

  // Hardcoded trending videos
  const trendingVideos = [
    {
      video_id: "VCZXHBXIUK0",
      title: "Drama By G-DRAGON (Karaoke Version With Backing Vocals)",
      duration: 231,
      url: "https://youtube.com/watch?v=VCZXHBXIUK0",
      thumbnail: "https://i.ytimg.com/vi/VCZXHBXIUK0/hq720.jpg",
      author: "Global Karaoke Vibez",
    },
    {
      video_id: "mFctG6MVgv0",
      title: "G-Dragon - Crooked Karaoke Lyrics Video",
      duration: 226,
      url: "https://youtube.com/watch?v=mFctG6MVgv0",
      thumbnail: "https://i.ytimg.com/vi/mFctG6MVgv0/hq720.jpg",
      author: "aristokrat",
    },
    {
      video_id: "K8392rnBRXM",
      title: "[KARAOKE] Haru Haru - Bigbang (Giữ giọng rap) Karaoke",
      duration: 257,
      url: "https://youtube.com/watch?v=K8392rnBRXM",
      thumbnail: "https://i.ytimg.com/vi/K8392rnBRXM/hq720.jpg",
      author: "Zhan Karaoke",
    },
    {
      video_id: "dEnguHPmv-c",
      title: "KARAOKE LỄ ĐƯỜNG - KAI ĐINH",
      duration: 249,
      url: "https://youtube.com/watch?v=dEnguHPmv-c",
      thumbnail: "https://i.ytimg.com/vi/dEnguHPmv-c/hq720.jpg",
      author: "Kai Dinh Official",
    },
    {
      video_id: "sT49aWnNDpA",
      title: "KARAOKE | Phép Màu - MAYDAYs, Minh Tốc (Beat gốc)",
      duration: 258,
      url: "https://youtube.com/watch?v=sT49aWnNDpA",
      thumbnail: "https://i.ytimg.com/vi/sT49aWnNDpA/hq720.jpg",
      author: "TDH",
    },
    {
      video_id: "oxa8z0Noh94",
      title: "KARAOKE | vạn vật như muốn ta bên nhau - Rio & 52Hz (Beat gốc)",
      duration: 186,
      url: "https://youtube.com/watch?v=oxa8z0Noh94",
      thumbnail: "https://i.ytimg.com/vi/oxa8z0Noh94/hq720.jpg",
      author: "TDH",
    },
    {
      video_id: "1Nwr24KDV5w",
      title: "KARAOKE | CoolKid - Sau Cơn Mưa (ft. Rhyder) | BEAT Chuẩn",
      duration: 154,
      url: "https://youtube.com/watch?v=1Nwr24KDV5w",
      thumbnail: "https://i.ytimg.com/vi/1Nwr24KDV5w/hq720.jpg",
      author: "Hát Cùng Orinn",
    },
    {
      video_id: "WO7qdqdXeBU",
      title: "HOÀNG DŨNG - PHONECERT (Vietnamese Version)",
      duration: 207,
      url: "https://youtube.com/watch?v=WO7qdqdXeBU",
      thumbnail: "https://i.ytimg.com/vi/WO7qdqdXeBU/hq720.jpg",
      author: "Hoàng Dũng",
    },
    {
      video_id: "UC6fgBSKyhg",
      title: "SOOBIN - Dancing In The Dark | Karaoke",
      duration: 237,
      url: "https://youtube.com/watch?v=UC6fgBSKyhg",
      thumbnail: "https://i.ytimg.com/vi/UC6fgBSKyhg/hq720.jpg",
      author: "SOOBIN Official",
    },
    {
      video_id: "EocTXiXX7FU",
      title: "[KARAOKE] Không Yêu Em Thì Yêu Ai? - Vũ. ft. Low G",
      duration: 239,
      url: "https://youtube.com/watch?v=EocTXiXX7FU",
      thumbnail: "https://i.ytimg.com/vi/EocTXiXX7FU/hq720.jpg",
      author: "Warner Music Vietnam",
    },
    {
      video_id: "1Nwr24KDV5w",
      title: "KARAOKE | CoolKid - Sau Cơn Mưa (ft. Rhyder) | BEAT Chuẩn",
      duration: 154,
      url: "https://youtube.com/watch?v=1Nwr24KDV5w",
      thumbnail: "https://i.ytimg.com/vi/1Nwr24KDV5w/hq720.jpg",
      author: "Hát Cùng Orinn",
    },
    {
      video_id: "cgRpJ1ZJGtU",
      title:
        "Karaoke WRONG TIMES - PUPPY & DANGRANGTO | Beat Chuẩn | ZKN Music",
      duration: 217,
      url: "https://youtube.com/watch?v=cgRpJ1ZJGtU",
      thumbnail: "https://i.ytimg.com/vi/cgRpJ1ZJGtU/hq720.jpg",
      author: "ZKN Music",
    },
    {
      video_id: "z7GPxYYlgXY",
      title:
        "[KARAOKE] có hẹn với thanh xuân - GREY D, Hoàng Dũng, Orange, Suni Hạ Linh & tlinh | Hương Mùa Hè",
      duration: 225,
      url: "https://youtube.com/watch?v=z7GPxYYlgXY",
      thumbnail: "https://i.ytimg.com/vi/z7GPxYYlgXY/hq720.jpg",
      author: "SOULIE STUDIOS",
    },
    {
      video_id: "SYaummoWIV0",
      title:
        "[Karaoke] Em Không Hiểu - Changg (ft. Minh Huy) | Có rap - Hạ tone",
      duration: 237,
      url: "https://youtube.com/watch?v=SYaummoWIV0",
      thumbnail: "https://i.ytimg.com/vi/SYaummoWIV0/hq720.jpg",
      author: "May Birddy",
    },
    {
      video_id: "TWKuHcEwIfE",
      title: "Hẹn Gặp Em Dưới Ánh Trăng - Karaoke (Vocal 30%) KEN 20250108001",
      duration: 222,
      url: "https://youtube.com/watch?v=TWKuHcEwIfE",
      thumbnail: "https://i.ytimg.com/vi/TWKuHcEwIfE/hqdefault.jpg",
      author: "Duy Khánh Nguyễn",
    },
    {
      video_id: "CVlYc2KLzkQ",
      title: "Sau Ngần Ấy Năm - Hà Nhi | Karaoke Tone Nữ",
      duration: 281,
      url: "https://youtube.com/watch?v=CVlYc2KLzkQ",
      thumbnail: "https://i.ytimg.com/vi/CVlYc2KLzkQ/hq720.jpg",
      author: "Hà Nhi Official",
    },
    {
      video_id: "jjBEffDzr1A",
      title:
        "Karaoke Tràn Bộ Nhớ - Dương Domic - Karaoke Nhạc Trẻ Hay Nhất 2024",
      duration: 209,
      url: "https://youtube.com/watch?v=jjBEffDzr1A",
      thumbnail: "https://i.ytimg.com/vi/jjBEffDzr1A/hq720.jpg",
      author: "MEOW MUSIC",
    },
    {
      video_id: "jjBEffDzr1A",
      title:
        "Karaoke Tràn Bộ Nhớ - Dương Domic - Karaoke Nhạc Trẻ Hay Nhất 2024",
      duration: 209,
      url: "https://youtube.com/watch?v=jjBEffDzr1A",
      thumbnail: "https://i.ytimg.com/vi/jjBEffDzr1A/hq720.jpg",
      author: "MEOW MUSIC",
    },
    {
      video_id: "AoIIyiZIoIw",
      title: "Trình - Karaoke (Beat) Hiếu Thứ Hai",
      duration: 277,
      url: "https://youtube.com/watch?v=AoIIyiZIoIw",
      thumbnail: "https://i.ytimg.com/vi/AoIIyiZIoIw/hq720.jpg",
      author: "BiiMex Beat",
    },
    {
      video_id: "a1eRYInA7lo",
      title:
        "[KARAOKE] KIM PHÚT KIM GIỜ - Negav, Pháp Kiều, ISAAC, HIEUTHUHAI, HURRYKNG | Anh Trai Say Hi",
      duration: 316,
      url: "https://youtube.com/watch?v=a1eRYInA7lo",
      thumbnail: "https://i.ytimg.com/vi/a1eRYInA7lo/hq720.jpg",
      author: "HT Audio",
    },
    {
      video_id: "1PHw9fglz-M",
      title:
        "Nước Mắt Cá Sấu | HIEUTHUHAI | Karaoke Beat Gốc Chất Lượng Cao | Nhạc Sống Nguyên Cường",
      duration: 227,
      url: "https://youtube.com/watch?v=1PHw9fglz-M",
      thumbnail: "https://i.ytimg.com/vi/1PHw9fglz-M/hq720.jpg",
      author: "Karaoke Nguyên Cường",
    },
    {
      video_id: "y7YiSVSlCpM",
      title:
        "[Karaoke Beat] TỪNG - LyLy, Lâm Bảo Ngọc, Liu Grace, Danmy, Han Sara (Beat Chuẩn Có Bè Có Rap)",
      duration: 265,
      url: "https://youtube.com/watch?v=y7YiSVSlCpM",
      thumbnail: "https://i.ytimg.com/vi/y7YiSVSlCpM/hq720.jpg",
      author: "Hoàng Anh Potatoes",
    },
    {
      video_id: "e42KpOhsKyI",
      title: "Hà Nhi - Vì Em Chưa Bao Giờ Khóc I Karaoke Beat Gốc",
      duration: 265,
      url: "https://youtube.com/watch?v=e42KpOhsKyI",
      thumbnail: "https://i.ytimg.com/vi/e42KpOhsKyI/hq720.jpg",
      author: "Hà Nhi Official",
    },
    {
      video_id: "0O5sOHNZVUM",
      title:
        "Rồi Em Sẽ Gặp Một Chàng Trai Khác | Karaoke Beat Gốc | HippoHappy",
      duration: 305,
      url: "https://youtube.com/watch?v=0O5sOHNZVUM",
      thumbnail: "https://i.ytimg.com/vi/0O5sOHNZVUM/hq720.jpg",
      author: "LuxKara Official",
    },
    {
      video_id: "wt1agg-bd2k",
      title:
        "[KARAOKE] 'một đời' - 14 Casper & Bon Nghiêm (feat. buitruonglinh) (Official)",
      duration: 329,
      url: "https://youtube.com/watch?v=wt1agg-bd2k",
      thumbnail: "https://i.ytimg.com/vi/wt1agg-bd2k/hq720.jpg",
      author: "14 Casper",
    },
    {
      video_id: "-l9LmjVXiwA",
      title: "ĐỪNG YÊU NỮA EM MỆT RỒI [ KARAOKE BEAT CHUẨN ] - MIN",
      duration: 285,
      url: "https://youtube.com/watch?v=-l9LmjVXiwA",
      thumbnail: "https://i.ytimg.com/vi/-l9LmjVXiwA/hq720.jpg",
      author: "Phúc Lê",
    },
    {
      video_id: "Iy_I3fnK8ts",
      title: "[Karaoke] Đưa Nhau Đi Trốn - Đen ft. Linh Cáo [Beat]",
      duration: 191,
      url: "https://youtube.com/watch?v=Iy_I3fnK8ts",
      thumbnail: "https://i.ytimg.com/vi/Iy_I3fnK8ts/hq720.jpg",
      author: "Nam NewTitan 2nd",
    },
    {
      video_id: "1URLjUqf5fE",
      title: "Một triệu like -ĐenVâu[Karaoke]",
      duration: 262,
      url: "https://youtube.com/watch?v=1URLjUqf5fE",
      thumbnail: "https://i.ytimg.com/vi/1URLjUqf5fE/hqdefault.jpg",
      author: "Music Channel",
    },
    {
      video_id: "-DAP25F4N0c",
      title: "BEAT PHỐI | ĐI VỀ NHÀ | ĐEN VÂU | JUSTATEE | KARAOKE",
      duration: 207,
      url: "https://youtube.com/watch?v=-DAP25F4N0c",
      thumbnail: "https://i.ytimg.com/vi/-DAP25F4N0c/hq720.jpg",
      author: "Pink Studio",
    },
    {
      video_id: "8m9jqHt8sY0",
      title:
        "Muoi Nam - Lon Xon 3 - Den Vau Karaoke Beat Chuẩn nhưng mình đang lag cần beat phải trchậm",
      duration: 274,
      url: "https://youtube.com/watch?v=8m9jqHt8sY0",
      thumbnail: "https://i.ytimg.com/vi/8m9jqHt8sY0/hq720.jpg",
      author: "Just a Love Fan - Stoner Journey",
    },
    {
      video_id: "D1wW7Pff6B0",
      title: "KARAOKE ║ LỐI NHỎ   ĐEN║ BEAT W Hook Phương Anh Đào",
      duration: 224,
      url: "https://youtube.com/watch?v=D1wW7Pff6B0",
      thumbnail: "https://i.ytimg.com/vi/D1wW7Pff6B0/hqdefault.jpg",
      author: "Vlog Karaoke",
    },
  ];

  return (
    <div className="p-4 space-y-8">
      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Thể loại âm nhạc</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm shadow-sm hover:bg-pink-200 transition-colors animate-pulse`}
              style={{ animationDelay: `${index * 400}ms` }}
              onClick={() => {
                navigate(
                  `/search?roomId=${roomId}&query=${encodeURIComponent(
                    category.trim()
                  )}&karaoke=${isKaraoke}`
                );
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Videos Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Bài Hát Đang Hot</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingVideos?.map((video: Video) => (
            <SongCard key={video.video_id} {...video} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
