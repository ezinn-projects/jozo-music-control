import { categoryImages } from "@/assets/images/categories";
import { CategoriesId } from "@/assets/images/categories";

export interface Video {
  video_id: string;
  title: string;
  duration: number;
  url: string;
  thumbnail: string;
  author: string;
}

export interface CategoryData {
  id: string;
  name: string;
  image?: string; // Hình ảnh cho category (optional)
  videos: Video[];
}

export const SHOW_CATEGORIES: CategoryData[] = [
  {
    id: CategoriesId.HOT_SONGS,
    image: categoryImages[CategoriesId.HOT_SONGS],
    name: "Tháng Mười Cho Người Thương",
    videos: [
      {
        video_id: "S0Cb_p2UUT4",
        title: "KARAOKE MỘT NGÀY NÀO ĐÓ - HOÀNG DŨNG & ĐEN",
        duration: 257,
        url: "https://youtube.com/watch?v=S0Cb_p2UUT4",
        thumbnail: "https://i.ytimg.com/vi/S0Cb_p2UUT4/hq720.jpg",
        author: "LINGORR 9",
      },
      {
        video_id: "IDm9AIT-GYU",
        title: "KARAOKE | Không Thời Gian - Dương Domic | Y T KALAKOLE",
        duration: 219,
        url: "https://youtube.com/watch?v=IDm9AIT-GYU",
        thumbnail: "https://i.ytimg.com/vi/IDm9AIT-GYU/hqdefault.jpg",
        author: "Y T KALAKOLE",
      },
      {
        video_id: "hyuH35Ox530",
        title: "caraoke | Kho Báu - (S)TRONG Trọng Hiếu x Rhymastic (tone nữ)",
        duration: 194,
        url: "https://youtube.com/watch?v=hyuH35Ox530",
        thumbnail: "https://i.ytimg.com/vi/hyuH35Ox530/hq720.jpg",
        author: "Cà Rà",
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
        video_id: "SEjte5NIXZU",
        title:
          "[KARAOKE TONE NAM] ERIK - 'Dù cho tận thế (vẫn yêu em)' | Instrumental/Beat gốc",
        duration: 242,
        url: "https://youtube.com/watch?v=SEjte5NIXZU",
        thumbnail: "https://i.ytimg.com/vi/SEjte5NIXZU/hq720.jpg",
        author: "ERIK Official",
      },
      {
        video_id: "3mQuD8xcmUw",
        title: "[KARAOKE] MƠ - Vũ Cát Tường Tone nữ [Beat chuẩn giọng nữ]",
        duration: 263,
        url: "https://youtube.com/watch?v=3mQuD8xcmUw",
        thumbnail: "https://i.ytimg.com/vi/3mQuD8xcmUw/hq720.jpg",
        author: "Trung Nguyen",
      },
      {
        video_id: "wD09Vil2FAo",
        title:
          "Karaoke ĐỪNG LÀM TRÁI TIM ANH ĐAU | Unofficial Karaoke | Beat gốc có bè",
        duration: 280,
        url: "https://youtube.com/watch?v=wD09Vil2FAo",
        thumbnail: "https://i.ytimg.com/vi/wD09Vil2FAo/hq720.jpg",
        author: "Nguyễn Minh Tâm VN",
      },
      {
        video_id: "xmneAJY0ZLQ",
        title:
          "Tùng Dương - TÁI SINH (Karaoke Tone Nam) | Tăng Duy Tân x Drum7 | Album Multiverse",
        duration: 240,
        url: "https://youtube.com/watch?v=xmneAJY0ZLQ",
        thumbnail: "https://i.ytimg.com/vi/xmneAJY0ZLQ/hq720.jpg",
        author: "TUNG DUONG OFFICIAL",
      },
      {
        video_id: "if3Ui1hLIoY",
        title:
          "WREN EVANS Từng Quen LOI CHOI The First Album ft itsnk Karaoke Beat Chuẩn Tone",
        duration: 175,
        url: "https://youtube.com/watch?v=if3Ui1hLIoY",
        thumbnail: "https://i.ytimg.com/vi/if3Ui1hLIoY/hqdefault.jpg",
        author: "Tiger Music Studio",
      },
      {
        video_id: "NqkZxe0tC4k",
        title: "𝐊𝔸𝐑𝔸𝐎𝕂𝐄 HẠ TONE | ANH LÀ NGOẠI LỆ CỦA EM - PHƯƠNG LY",
        duration: 193,
        url: "https://youtube.com/watch?v=NqkZxe0tC4k",
        thumbnail: "https://i.ytimg.com/vi/NqkZxe0tC4k/hq720.jpg",
        author: "Yaourtt MêLy",
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
        video_id: "oqjM7Rf6Sxg",
        title: "Phía Sau Một Cô Gái Karaoke HD  Hiếu's Louis",
        duration: 271,
        url: "https://youtube.com/watch?v=oqjM7Rf6Sxg",
        thumbnail: "https://i.ytimg.com/vi/oqjM7Rf6Sxg/hq720.jpg",
        author: "Hiếu Nguyễn",
      },
      {
        video_id: "MDLOZiUExRI",
        title:
          "[Karaoke Beat Tone Nam] KHÔNG ĐAU NỮA RỒI - 52Hz, Orange, Mỹ Mỹ, Châu Bùi, Pháp Kiều (Beat Có Bè)",
        duration: 292,
        url: "https://youtube.com/watch?v=MDLOZiUExRI",
        thumbnail: "https://i.ytimg.com/vi/MDLOZiUExRI/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "Qb1KESTtueU",
        title: "Orange - ' Gặp Lại Năm ta 60 ' Karaoke Tone Nữ - Beat Gốc",
        duration: 329,
        url: "https://youtube.com/watch?v=Qb1KESTtueU",
        thumbnail: "https://i.ytimg.com/vi/Qb1KESTtueU/hq720.jpg",
        author: "Orange Singer Official",
      },
      {
        video_id: "riT7g1ufOhE",
        title:
          "[KARAOKE BEAT GỐC] -  DƯỚI TÁN CÂY KHÔ HOA NỞ ( KARAOKE ) | OFFICIAL VISUALIZER | Track No.1",
        duration: 281,
        url: "https://youtube.com/watch?v=riT7g1ufOhE",
        thumbnail: "https://i.ytimg.com/vi/riT7g1ufOhE/hq720.jpg",
        author: "Fortune Ngo",
      },
      {
        video_id: "0R1NPIV0f58",
        title: "Karaoke | 24h - LyLy ft. Magazine  ✅",
        duration: 256,
        url: "https://youtube.com/watch?v=0R1NPIV0f58",
        thumbnail: "https://i.ytimg.com/vi/0R1NPIV0f58/hq720.jpg",
        author: "Dương Trung KTV",
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
        video_id: "TWKuHcEwIfE",
        title:
          "Hẹn Gặp Em Dưới Ánh Trăng - Karaoke (Vocal 30%) KEN 20250108001",
        duration: 222,
        url: "https://youtube.com/watch?v=TWKuHcEwIfE",
        thumbnail: "https://i.ytimg.com/vi/TWKuHcEwIfE/hqdefault.jpg",
        author: "Duy Khánh Nguyễn",
      },
      {
        video_id: "riT7g1ufOhE",
        title:
          "[KARAOKE BEAT GỐC] -  DƯỚI TÁN CÂY KHÔ HOA NỞ ( KARAOKE ) | OFFICIAL VISUALIZER | Track No.1",
        duration: 281,
        url: "https://youtube.com/watch?v=riT7g1ufOhE",
        thumbnail: "https://i.ytimg.com/vi/riT7g1ufOhE/hq720.jpg",
        author: "Fortune Ngo",
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
        video_id: "LvAEgcdbgbc",
        title: "KARAOKE | Dương Domic - Mất Kết Nối | EP 'Dữ Liệu Quý'",
        duration: 202,
        url: "https://youtube.com/watch?v=LvAEgcdbgbc",
        thumbnail: "https://i.ytimg.com/vi/LvAEgcdbgbc/hq720.jpg",
        author: "SInger",
      },
      {
        video_id: "3Ug0w06Zm1w",
        title: "[KARAOKE] RƠI TỰ DO - LyHan l ( BEAT CHUẨN )",
        duration: 212,
        url: "https://youtube.com/watch?v=3Ug0w06Zm1w",
        thumbnail: "https://i.ytimg.com/vi/3Ug0w06Zm1w/hq720.jpg",
        author: "NHL Entertainment",
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
        video_id: "wt1agg-bd2k",
        title:
          "[KARAOKE] 'một đời' - 14 Casper & Bon Nghiêm (feat. buitruonglinh) (Official)",
        duration: 329,
        url: "https://youtube.com/watch?v=wt1agg-bd2k",
        thumbnail: "https://i.ytimg.com/vi/wt1agg-bd2k/hq720.jpg",
        author: "14 Casper",
      },
      {
        video_id: "MHGiBATIxyM",
        title:
          "[Karaoke Beat] EASIER - MAIQUINN, Ngô Lan Hương, Muộii, Đào Tử A1J, Saabirose (Beat Có Bè)",
        duration: 199,
        url: "https://youtube.com/watch?v=MHGiBATIxyM",
        thumbnail: "https://i.ytimg.com/vi/MHGiBATIxyM/hq720.jpg",
        author: "Hoàng Anh Potatoes",
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
      {
        video_id: "iOxvOlCyaVM",
        title: "Ghé Qua - Dick x PC x Tofu | Karaoke.",
        duration: 235,
        url: "https://youtube.com/watch?v=iOxvOlCyaVM",
        thumbnail: "https://i.ytimg.com/vi/iOxvOlCyaVM/hq720.jpg",
        author: "Đức Studio",
      },
      {
        video_id: "hyB4iyq2tmw",
        title: "Jessie J ft. B.o.B - Price Tag (Karaoke Version)",
        duration: 246,
        url: "https://youtube.com/watch?v=hyB4iyq2tmw",
        thumbnail: "https://i.ytimg.com/vi/hyB4iyq2tmw/hqdefault.jpg",
        author: "Sing King",
      },
      {
        video_id: "ODEN6ICWr0g",
        title: "I do - 911 Band - Karaoke tiếng Anh",
        duration: 201,
        url: "https://youtube.com/watch?v=ODEN6ICWr0g",
        thumbnail: "https://i.ytimg.com/vi/ODEN6ICWr0g/hq720.jpg",
        author: "Key Means Online English 1 Kèm 1",
      },
      {
        video_id: "fZyW-T0w0X4",
        title: "BEAUTIFUL IN WHITE - Westlife (HD Karaoke)",
        duration: 250,
        url: "https://youtube.com/watch?v=fZyW-T0w0X4",
        thumbnail: "https://i.ytimg.com/vi/fZyW-T0w0X4/hq720.jpg",
        author: "Atomic Karaoke... ",
      },
    ],
  },
  {
    id: CategoriesId.EM_XINH_SAY_HI,
    name: "Em Xinh Say Hi",
    image: categoryImages[CategoriesId.EM_XINH_SAY_HI],
    videos: [
      {
        video_id: "-KnFLfPSrTw",
        title:
          "[KARAOKE] GÃ SĂN CÁ - Quang Hùng MasterD, Saabirose, Lâm Bảo Ngọc, MAIQUINN, Quỳnh Anh Shyn | EXSH",
        duration: 248,
        url: "https://youtube.com/watch?v=-KnFLfPSrTw",
        thumbnail: "https://i.ytimg.com/vi/-KnFLfPSrTw/hqdefault.jpg",
        author: "Vie Channel - MUSIC",
      },
      {
        video_id: "2XHcd7TTOos",
        title:
          "[KARAOKE] NOT MY FAULT - Mỹ Mỹ, LyHan, MaiQuinn, Liu Grace l EXSH ( BEAT CHUẨN )",
        duration: 255,
        url: "https://youtube.com/watch?v=2XHcd7TTOos",
        thumbnail: "https://i.ytimg.com/vi/2XHcd7TTOos/hq720.jpg",
        author: "NHL Entertainment",
      },
      {
        video_id: "rO41XI57ySM",
        title:
          "NOT MY FAULT - Mỹ Mỹ, Liu Grace, MAIQUINN, LyHan | Em Xinh Say Hi [Performance]",
        duration: 337,
        url: "https://youtube.com/watch?v=rO41XI57ySM",
        thumbnail: "https://i.ytimg.com/vi/rO41XI57ySM/hq720.jpg",
        author: "Vie Channel - MUSIC",
      },
      {
        video_id: "g12fgmdRL24",
        title:
          "QUẢ CHÍN QUÁ - EM XINH SAY HI - Karaoke [BEAT CHUẨN] | Beat Không Lời | Karaoke HD",
        duration: 276,
        url: "https://youtube.com/watch?v=g12fgmdRL24",
        thumbnail: "https://i.ytimg.com/vi/g12fgmdRL24/hq720.jpg",
        author: "SingZone",
      },
      {
        video_id: "ftgzwMqP4rM",
        title:
          "[Karaoke Beat] HỀ - Phương Mỹ Chi, Phương Ly, Pháo, Chi Xê, WEAN (Beat Chuẩn Có Bè)",
        duration: 267,
        url: "https://youtube.com/watch?v=ftgzwMqP4rM",
        thumbnail: "https://i.ytimg.com/vi/ftgzwMqP4rM/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "R_sRKgQZNPo",
        title:
          "[KARAOKE] SO ĐẬM - Phương Ly, Vũ Thảo My, Muộii, Châu Bùi | EXSH",
        duration: 168,
        url: "https://youtube.com/watch?v=R_sRKgQZNPo",
        thumbnail: "https://i.ytimg.com/vi/R_sRKgQZNPo/hq720.jpg",
        author: "NHL Entertainment",
      },
      {
        video_id: "3gkhZkhK8h8",
        title:
          "[KARAOKE] I'LL BE THERE - Orange, Phương Mỹ Chi, Han Sara, Lamoon l EXSH",
        duration: 238,
        url: "https://youtube.com/watch?v=3gkhZkhK8h8",
        thumbnail: "https://i.ytimg.com/vi/3gkhZkhK8h8/hq720.jpg",
        author: "NHL Entertainment",
      },
      {
        video_id: "SLsxoLoer6U",
        title:
          "[KARAOKE] EM CHỈ LÀ - Bích Phương, Tăng Duy Tân, LyHan, Muộii, Hoàng Duyên | Em Xinh Say Hi",
        duration: 322,
        url: "https://youtube.com/watch?v=SLsxoLoer6U",
        thumbnail: "https://i.ytimg.com/vi/SLsxoLoer6U/hq720.jpg",
        author: "Vie Channel - MUSIC",
      },
      {
        video_id: "PtRAzaA0lV8",
        title:
          "[Karaoke Beat] CẦM KỲ THI HOẠ -Bích Phương, Tiên Tiên, Lamoon, Phương Mỹ Chi, Bảo Anh (Beat Có Bè)",
        duration: 227,
        url: "https://youtube.com/watch?v=PtRAzaA0lV8",
        thumbnail: "https://i.ytimg.com/vi/PtRAzaA0lV8/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "5zMhhfGfWfY",
        title:
          "[Karaoke Beat] AAA - Liên Quân 2 | Em Xinh Say Hi (Beat Chuẩn Có Bè)",
        duration: 237,
        url: "https://youtube.com/watch?v=5zMhhfGfWfY",
        thumbnail: "https://i.ytimg.com/vi/5zMhhfGfWfY/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "A_Uu--GVXjo",
        title:
          "[Karaoke Beat] WE BELONG TOGETHER - Miu Lê, Juky San, Lyly, Danmy, Dương Domic (Beat Chuẩn Có Bè)",
        duration: 285,
        url: "https://youtube.com/watch?v=A_Uu--GVXjo",
        thumbnail: "https://i.ytimg.com/vi/A_Uu--GVXjo/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "_6__EHyWHX4",
        title:
          "[Karaoke Beat] RUN - Châu Bùi, Ánh Sáng AZA, 52Hz, Yeolan, LyHan (Beat Chuẩn Có Bè)",
        duration: 248,
        url: "https://youtube.com/watch?v=_6__EHyWHX4",
        thumbnail: "https://i.ytimg.com/vi/_6__EHyWHX4/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "LB8ol59NFZc",
        title:
          "[Karaoke Beat] ĐỒNG DAO XINH GÁI - Quỳnh Anh Shyn, Vũ Thảo My, Miu Lê, Orange, Mỹ Mỹ (Beat Có Bè)",
        duration: 222,
        url: "https://youtube.com/watch?v=LB8ol59NFZc",
        thumbnail: "https://i.ytimg.com/vi/LB8ol59NFZc/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "dE8sWAGmtbM",
        title:
          "[Karaoke Beat] ĐÃ XINH LẠI CÒN THÔNG MINH - Liên Quân 1 | Em Xinh Say Hi (Beat Chuẩn Có Bè)",
        duration: 237,
        url: "https://youtube.com/watch?v=dE8sWAGmtbM",
        thumbnail: "https://i.ytimg.com/vi/dE8sWAGmtbM/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "ZpCBN6CUpgo",
        title:
          "[KARAOKE] EM KHÔNG CÓ ƯA - Tiên Tiên, Bảo Anh, Saabirose, Ánh Sáng AZA | EXSH",
        duration: 181,
        url: "https://youtube.com/watch?v=ZpCBN6CUpgo",
        thumbnail: "https://i.ytimg.com/vi/ZpCBN6CUpgo/hq720.jpg",
        author: "NHL Entertainment",
      },
      {
        video_id: "HHtm4Kb3u0U",
        title:
          "[KARAOKE] LỜI THẬT LÒNG KHI SAY - Miu Lê, Bích Phương, Juky San, Quỳnh Anh Shyn | EXSH",
        duration: 177,
        url: "https://youtube.com/watch?v=HHtm4Kb3u0U",
        thumbnail: "https://i.ytimg.com/vi/HHtm4Kb3u0U/hq720.jpg",
        author: "NHL Entertainment",
      },
      {
        video_id: "Bfjbi62auSE",
        title:
          "[Karaoke Beat] RED FLAG - Yeolan, Ngô Lan Hương, Han Sara, Lamoon, Jsol (Beat Chuẩn Có Bè)",
        duration: 235,
        url: "https://youtube.com/watch?v=Bfjbi62auSE",
        thumbnail: "https://i.ytimg.com/vi/Bfjbi62auSE/hq720.jpg",
        author: "Hoàng Anh Potatoes",
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
        video_id: "e5Jlu1k-mBw",
        title: "[Color Coded Lyrics] THE REAL AURA - Theme Song Em Xinh Say Hi",
        duration: 324,
        url: "https://youtube.com/watch?v=e5Jlu1k-mBw",
        thumbnail: "https://i.ytimg.com/vi/e5Jlu1k-mBw/hq720.jpg",
        author: "Vie Channel - MUSIC",
      },
      {
        video_id: "PI3QvOg5Gog",
        title:
          "[Karaoke Beat] Em Xinh Em Bling - Pháo, Phương Ly, Juky San, Chi Xê, Hoàng Duyên (Beat Có Bè)",
        duration: 203,
        url: "https://youtube.com/watch?v=PI3QvOg5Gog",
        thumbnail: "https://i.ytimg.com/vi/PI3QvOg5Gog/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "lLmr0Ao6_KE",
        title:
          "[KARAOKE]ĐIỀU EM LUÔN MONG MUỐN - Đào Tử A1J,Vũ Thảo My,Tiên Tiên,Hùng Huỳnh|PonxVie|Bản quyền€VieON",
        duration: 197,
        url: "https://youtube.com/watch?v=lLmr0Ao6_KE",
        thumbnail: "https://i.ytimg.com/vi/lLmr0Ao6_KE/hq720.jpg",
        author: "PonPTGamer",
      },
    ],
  },
  {
    id: CategoriesId.ANH_TRAI_SAY_HI,
    name: "Anh Trai Say Hi",
    image: categoryImages[CategoriesId.ANH_TRAI_SAY_HI],
    videos: [
      {
        video_id: "XPBFoHE0U3o",
        title:
          "Karaoke - 'Tình Đầu Quá Chén' - Quang Hùng MasterD (ft. Negav, Erik, Pháp Kiều)",
        duration: 292,
        url: "https://youtube.com/watch?v=XPBFoHE0U3o",
        thumbnail: "https://i.ytimg.com/vi/XPBFoHE0U3o/hq720.jpg",
        author: "Quang Hùng MasterD",
      },
      {
        video_id: "GGto2sCQE9Q",
        title:
          "[Karaoke] Kim Phút Kim Giờ - ATSH (HIEUTHUHAI, Pháp Kiều, Negav, HURRYKNG, Isaac) | Vie Offical",
        duration: 293,
        url: "https://youtube.com/watch?v=GGto2sCQE9Q",
        thumbnail: "https://i.ytimg.com/vi/GGto2sCQE9Q/hq720.jpg",
        author: "Vie Official",
      },
      {
        video_id: "a6wg-XhA4fk",
        title:
          "(KARAOKE) HÀO QUANG - Rhyder, Dương Domic, Pháp Kiều | Anh Trai Say Hi ( BEAT CHUẨN )",
        duration: 243,
        url: "https://youtube.com/watch?v=a6wg-XhA4fk",
        thumbnail: "https://i.ytimg.com/vi/a6wg-XhA4fk/hq720.jpg",
        author: "Sunemee Karaoke",
      },
      {
        video_id: "NQeBDu_W8Yw",
        title:
          "KARAOKE Chân Thành  Rhyder, Ali Hoàng Dương, Quang Hùng, Wean Lê, Captain",
        duration: 253,
        url: "https://youtube.com/watch?v=NQeBDu_W8Yw",
        thumbnail: "https://i.ytimg.com/vi/NQeBDu_W8Yw/hq720.jpg",
        author: "Hihi",
      },
      {
        video_id: "0nAcgYCM-8I",
        title: "Karaoke - 'Trói Em Lại' - Quang Hùng MasterD",
        duration: 267,
        url: "https://youtube.com/watch?v=0nAcgYCM-8I",
        thumbnail: "https://i.ytimg.com/vi/0nAcgYCM-8I/hq720.jpg",
        author: "Quang Hùng MasterD",
      },
      {
        video_id: "MCqsm3a69bE",
        title:
          "[KARAOKE - Beat Chuẩn] Sao Hạng A - HIEUTHUHAI, Jsol, Song Luân, Dương Domic | Anh Trai Say Hi",
        duration: 252,
        url: "https://youtube.com/watch?v=MCqsm3a69bE",
        thumbnail: "https://i.ytimg.com/vi/MCqsm3a69bE/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "iy8YBm0LBuY",
        title:
          "KARAOKE CATCH ME IF YOU CAN - Negav, Quang Hùng MasterD, Nicky, Công Dương",
        duration: 257,
        url: "https://youtube.com/watch?v=iy8YBm0LBuY",
        thumbnail: "https://i.ytimg.com/vi/iy8YBm0LBuY/hq720.jpg",
        author: "LK Music",
      },
      {
        video_id: "u1h5l3LkryY",
        title:
          "[KARAOKE] I'M THINKING ABOUT YOU (Beat Chuẩn) - Rhyder, Wean, Đức Phúc, Hùng Huỳnh ft. Tlinh",
        duration: 196,
        url: "https://youtube.com/watch?v=u1h5l3LkryY",
        thumbnail: "https://i.ytimg.com/vi/u1h5l3LkryY/hq720.jpg",
        author: "LK Music",
      },
      {
        video_id: "6uuN1eG72E8",
        title:
          "[Karaoke Beat] REGRET - LÂM BẢO NGỌC, QUÂN A.P, QUANG TRUNG, ALI HOÀNG DƯƠNG, PHÁP KIỀU (Beat Chuẩn)",
        duration: 253,
        url: "https://youtube.com/watch?v=6uuN1eG72E8",
        thumbnail: "https://i.ytimg.com/vi/6uuN1eG72E8/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "pS8QPIiFTFs",
        title:
          "[KARAOKE] BAO LỜI CON CHƯA NÓI (Beat chuẩn, bè)- Atus, Quang Trung, Anh Tú, Dương Domic, Song Luân",
        duration: 298,
        url: "https://youtube.com/watch?v=pS8QPIiFTFs",
        thumbnail: "https://i.ytimg.com/vi/pS8QPIiFTFs/hq720.jpg",
        author: "LK Music",
      },
      {
        video_id: "5udDeOooLM4",
        title:
          "[KARAOKE - Bè Rap] Cứ Để Anh Ta Rời Đi - Song Luân, Bảo Anh, Dương Domic, Quang Hùng, Lou Hoàng",
        duration: 274,
        url: "https://youtube.com/watch?v=5udDeOooLM4",
        thumbnail: "https://i.ytimg.com/vi/5udDeOooLM4/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "0qTp5VlLCZw",
        title:
          "[Karaoke Beat] ĐỀU LÀ CỦA EM - ANH TÚ, ATUS, SONG LUÂN, DƯƠNG DOMIC, QUANG TRUNG (Beat Chuẩn Có Bè)",
        duration: 239,
        url: "https://youtube.com/watch?v=0qTp5VlLCZw",
        thumbnail: "https://i.ytimg.com/vi/0qTp5VlLCZw/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "bxCxQBae-k8",
        title: "Karaoke Don't Care - Anh Trai Say 2 | Beat Chuẩn 2035",
        duration: 260,
        url: "https://youtube.com/watch?v=bxCxQBae-k8",
        thumbnail: "https://i.ytimg.com/vi/bxCxQBae-k8/hq720.jpg",
        author: "SFC V-pop",
      },
      {
        video_id: "VcYBtUIvRec",
        title:
          "(KARAOKE) ĐẦU ĐỘI SỪNG - HURRYKNG x Quân AP x Gemini Hùng Huỳnh | ANH TRAI SAY HI (BEAT CHUẨN)",
        duration: 215,
        url: "https://youtube.com/watch?v=VcYBtUIvRec",
        thumbnail: "https://i.ytimg.com/vi/VcYBtUIvRec/hq720.jpg",
        author: "Sunemee Karaoke",
      },
      {
        video_id: "CFm_nCPUgec",
        title: "[Karaoke Beat Chuẩn] QUAY ĐI QUAY LẠI - Hieuthuhai",
        duration: 210,
        url: "https://youtube.com/watch?v=CFm_nCPUgec",
        thumbnail: "https://i.ytimg.com/vi/CFm_nCPUgec/hq720.jpg",
        author: "Vkaraoke",
      },
      {
        video_id: "N0SSCuPFK_Q",
        title:
          "[KARAOKE - Bè Rap] WALK - HIEUTHUHAI, Hurrykng, Negav, Isaac, Pháp Kiều | Anh Trai Say Hi - VieOn",
        duration: 230,
        url: "https://youtube.com/watch?v=N0SSCuPFK_Q",
        thumbnail: "https://i.ytimg.com/vi/N0SSCuPFK_Q/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "0qTp5VlLCZw",
        title:
          "[Karaoke Beat] ĐỀU LÀ CỦA EM - ANH TÚ, ATUS, SONG LUÂN, DƯƠNG DOMIC, QUANG TRUNG (Beat Chuẩn Có Bè)",
        duration: 239,
        url: "https://youtube.com/watch?v=0qTp5VlLCZw",
        thumbnail: "https://i.ytimg.com/vi/0qTp5VlLCZw/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "9vbdBhlfvD8",
        title:
          "KARAOKE LOVE SAND   HIEUTHUHAI, Jsol, Ali Hoàng Dương, Vũ Thịnh so hot   Anh Trai Say Hi",
        duration: 236,
        url: "https://youtube.com/watch?v=9vbdBhlfvD8",
        thumbnail: "https://i.ytimg.com/vi/9vbdBhlfvD8/hqdefault.jpg",
        author: "Hihi",
      },
      {
        video_id: "1orzFFpbQx0",
        title:
          "[Karaoke Beat] THI SĨ - ERIK, ĐỨC PHÚC, PHẠM ANH DUY, TAGE (Beat Chuẩn Có Bè)",
        duration: 289,
        url: "https://youtube.com/watch?v=1orzFFpbQx0",
        thumbnail: "https://i.ytimg.com/vi/1orzFFpbQx0/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "xqXeRi5tAJI",
        title: "NGÁO NGƠ KARAOKE ( CÓ BÈ ) HIEUTHUHAI X JSOL X ERIK X ANH TÚ",
        duration: 253,
        url: "https://youtube.com/watch?v=xqXeRi5tAJI",
        thumbnail: "https://i.ytimg.com/vi/xqXeRi5tAJI/hq720.jpg",
        author: "Huy Cùi Music",
      },
      {
        video_id: "q52wqJ8rEds",
        title: '[KARAOKE] TRÀN BỘ NHỚ - DƯƠNG DOMIC | EP "DỮ LIỆU QUÝ"',
        duration: 191,
        url: "https://youtube.com/watch?v=q52wqJ8rEds",
        thumbnail: "https://i.ytimg.com/vi/q52wqJ8rEds/hq720.jpg",
        author: "Internity",
      },
      {
        video_id: "40_mQYQpIts",
        title: "[KARAOKE] Anh Biết Rồi - RHYDER | Anh Trai Say Hi - VieOn",
        duration: 260,
        url: "https://youtube.com/watch?v=40_mQYQpIts",
        thumbnail: "https://i.ytimg.com/vi/40_mQYQpIts/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "B3vI4AVk3eg",
        title:
          "[KARAOKE - Bè Rap] S.O.S - Rhyder, WEAN, Quang Hùng MasterD, Ali Hoàng  Dương, Captain | ATSH",
        duration: 267,
        url: "https://youtube.com/watch?v=B3vI4AVk3eg",
        thumbnail: "https://i.ytimg.com/vi/B3vI4AVk3eg/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "vq0-ln9Ixj4",
        title:
          "[KARAOKE] SAU ĐÊM NAY (Beat chuẩn) - Erik, Quân A.P, Jsol, Đức Phúc, Hùng Huỳnh | Anh Trai Say Hi",
        duration: 290,
        url: "https://youtube.com/watch?v=vq0-ln9Ixj4",
        thumbnail: "https://i.ytimg.com/vi/vq0-ln9Ixj4/hq720.jpg",
        author: "LK Music",
      },
      {
        video_id: "_p5oXFD_ceU",
        title:
          "[KARAOKE - Bè Rap] Anh Trai Nước Việt - Erik, Quân AP, Jsol, Đức Phúc, Hùng Huỳnh Gemini | ATSH",
        duration: 273,
        url: "https://youtube.com/watch?v=_p5oXFD_ceU",
        thumbnail: "https://i.ytimg.com/vi/_p5oXFD_ceU/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "Y1xqah8JKtU",
        title:
          "KARAOKE NGÂN NGA   Vũ Thảo My, Isaac, Negav, HURRYKNG, Gin Tuấn Kiệt   Anh Trai Say Hi",
        duration: 279,
        url: "https://youtube.com/watch?v=Y1xqah8JKtU",
        thumbnail: "https://i.ytimg.com/vi/Y1xqah8JKtU/hqdefault.jpg",
        author: "Hihi",
      },
      {
        video_id: "iN1yPLPJohY",
        title:
          "[Karaoke Beat] SÓNG VỖ VỠ BỜ - ANH TÚ, ERIK, ANH DUY, JSOL, DƯƠNG DOMIC (Beat Chuẩn Có Bè)",
        duration: 324,
        url: "https://youtube.com/watch?v=iN1yPLPJohY",
        thumbnail: "https://i.ytimg.com/vi/iN1yPLPJohY/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "OVkZDNH0CXw",
        title:
          "[Karaoke Beat] NGƯỜI TÌNH CỦA NẮNG - ANH TÚ, CAPTAIN, VŨ THỊNH, HẢI ĐĂNG DOO, LYLY (Beat Chuẩn)",
        duration: 241,
        url: "https://youtube.com/watch?v=OVkZDNH0CXw",
        thumbnail: "https://i.ytimg.com/vi/OVkZDNH0CXw/hq720.jpg",
        author: "Hoàng Anh Potatoes",
      },
      {
        video_id: "2Nii_byePuA",
        title:
          "KARAOKE HÍT  DRAMA    Isaac, Anh Tú, WEAN, Đỗ Phú Quí   Anh Trai Say Hi",
        duration: 294,
        url: "https://youtube.com/watch?v=2Nii_byePuA",
        thumbnail: "https://i.ytimg.com/vi/2Nii_byePuA/hq720.jpg",
        author: "Hihi",
      },
      {
        video_id: "Ni7gmi6rEBk",
        title: "Karaoke 10/10 - Anh Trai Say 2 | Beat Siu Chuẩn",
        duration: 217,
        url: "https://youtube.com/watch?v=Ni7gmi6rEBk",
        thumbnail: "https://i.ytimg.com/vi/Ni7gmi6rEBk/hq720.jpg",
        author: "SFC V-pop",
      },
      {
        video_id: "Zu5ftKf1B-o",
        title: "Karaoke HÚT - Anh Trai Say 2 | Beat Chuẩn 2036",
        duration: 206,
        url: "https://youtube.com/watch?v=Zu5ftKf1B-o",
        thumbnail: "https://i.ytimg.com/vi/Zu5ftKf1B-o/hq720.jpg",
        author: "SFC V-pop",
      },
      {
        video_id: "f_-PouKaJ1U",
        title:
          "Nỗi Đau Ngây Dại Karaoke ( Beat Chuẩn ) Đức Phúc - HIEUTHUHAI - Công Dương",
        duration: 259,
        url: "https://youtube.com/watch?v=f_-PouKaJ1U",
        thumbnail: "https://i.ytimg.com/vi/f_-PouKaJ1U/hq720.jpg",
        author: "Huy Cùi Music",
      },
      {
        video_id: "GV7kowYXC8s",
        title: "Karaoke BẢNH - Anh Trai Say 2 | Beat Chuẩn 2025",
        duration: 232,
        url: "https://youtube.com/watch?v=GV7kowYXC8s",
        thumbnail: "https://i.ytimg.com/vi/GV7kowYXC8s/hqdefault.jpg",
        author: "SFC V-pop",
      },
      {
        video_id: "_1tnihIaX80",
        title: "Karaoke I.C.O.N - Anh Trai Say 2 | Beat Chuan 2024",
        duration: 214,
        url: "https://youtube.com/watch?v=_1tnihIaX80",
        thumbnail: "https://i.ytimg.com/vi/_1tnihIaX80/hq720.jpg",
        author: "SFC V-pop",
      },
      {
        video_id: "r-7OxdD_16w",
        title: "Karaoke NGẠO NGHỄ   Anh Trai Say 2    Chuẩn 2024",
        duration: 201,
        url: "https://youtube.com/watch?v=r-7OxdD_16w",
        thumbnail: "https://i.ytimg.com/vi/r-7OxdD_16w/hq720.jpg",
        author: "TH STUDIO PRO",
      },
      {
        video_id: "0I-JdbDf8lc",
        title:
          "[KARAOKE] ĐÓA HỒNG CHƠI VƠI - Anh Tú | Cứ ngỡ bông hoa xinh tươi chẳng cô đơn... | ANH TRAI SAY HI",
        duration: 315,
        url: "https://youtube.com/watch?v=0I-JdbDf8lc",
        thumbnail: "https://i.ytimg.com/vi/0I-JdbDf8lc/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "R37Kx8XmyXs",
        title:
          "ĐOÁ PHÙ DUNG CUỐI CÙNG (Karaoke) - ĐỨC PHÚC | OFFICIAL KARAOKE |  INSTRUMENTAL",
        duration: 325,
        url: "https://youtube.com/watch?v=R37Kx8XmyXs",
        thumbnail: "https://i.ytimg.com/vi/R37Kx8XmyXs/hq720.jpg",
        author: "ĐỨC PHÚC OFFICIAL",
      },
      {
        video_id: "wk0nPyAbYyM",
        title:
          "[KARAOKE - Bè Rap] Chàng Khờ Thủy Cung - Negav, Grey D | Anh Trai Say Hi - VieOn",
        duration: 307,
        url: "https://youtube.com/watch?v=wk0nPyAbYyM",
        thumbnail: "https://i.ytimg.com/vi/wk0nPyAbYyM/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "kyagrgGZy9U",
        title: "[KARAOKE] Tình Cuối Cùng - JSOL | Anh Trai Say Hi - VieOn",
        duration: 231,
        url: "https://youtube.com/watch?v=kyagrgGZy9U",
        thumbnail: "https://i.ytimg.com/vi/kyagrgGZy9U/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "cNS9wp-mXxc",
        title:
          "[KARAOKE - Bè Rap] Em Không Muốn Một Mình - Anh Tú Atus | Anh Trai Say Hi - VieOn",
        duration: 190,
        url: "https://youtube.com/watch?v=cNS9wp-mXxc",
        thumbnail: "https://i.ytimg.com/vi/cNS9wp-mXxc/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "sz-EsVDLFBc",
        title: "[KARAOKE] Khiêu Vũ Dưới Trăng - Erik | Anh Trai Say Hi - VieOn",
        duration: 264,
        url: "https://youtube.com/watch?v=sz-EsVDLFBc",
        thumbnail: "https://i.ytimg.com/vi/sz-EsVDLFBc/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "10EMalRcchQ",
        title: "GỌI CHO ANH - ISAAC (KARAOKE)",
        duration: 175,
        url: "https://youtube.com/watch?v=10EMalRcchQ",
        thumbnail: "https://i.ytimg.com/vi/10EMalRcchQ/hqdefault.jpg",
        author: "Levi",
      },
      {
        video_id: "dAy3D2CkkAQ",
        title: "[KARAOKE BEAT CHUẨN] KIM TỰ THÁP - CAPTAIN BOY",
        duration: 271,
        url: "https://youtube.com/watch?v=dAy3D2CkkAQ",
        thumbnail: "https://i.ytimg.com/vi/dAy3D2CkkAQ/hq720.jpg",
        author: "Tủ đồ của Đức Duy",
      },
      {
        video_id: "zc4wkjyYuek",
        title:
          "[KARAOKE - Bè Rap] COLORS - Pháp Kiều | Anh Trai Say Hi - VieOn",
        duration: 228,
        url: "https://youtube.com/watch?v=zc4wkjyYuek",
        thumbnail: "https://i.ytimg.com/vi/zc4wkjyYuek/hq720.jpg",
        author: "Moonlight 2",
      },
      {
        video_id: "o7tumI1A2cc",
        title:
          "[KARAOKE] AIRPLANE MODE - HURRYKNG cùng WEAN quẩy nhiệt cùng dàn anh | Anh Trai Say Hi",
        duration: 204,
        url: "https://youtube.com/watch?v=o7tumI1A2cc",
        thumbnail: "https://i.ytimg.com/vi/o7tumI1A2cc/hq720.jpg",
        author: "Channel_12.6.9",
      },
      {
        video_id: "C2hgqyetXH8",
        title:
          "[ KARAOKE CÓ BÈ ] Say Hi Never Say Goodbye - 30 Anh Trai | Anh Trai Say Hi",
        duration: 295,
        url: "https://youtube.com/watch?v=C2hgqyetXH8",
        thumbnail: "https://i.ytimg.com/vi/C2hgqyetXH8/hq720.jpg",
        author: "MEOW MUSIC",
      },
    ],
  },
  {
    id: CategoriesId.RAP_VIET,
    name: "Rap Việt",
    image: categoryImages[CategoriesId.RAP_VIET],
    videos: [
      {
        video_id: "ed3Z2x5qyYM",
        title:
          "[Karaoke] Khu tao sống - Wowy ft. Karik (Beat Phối chuẩn) - Http://newtitanvn.com",
        duration: 245,
        url: "https://youtube.com/watch?v=ed3Z2x5qyYM",
        thumbnail: "https://i.ytimg.com/vi/ed3Z2x5qyYM/hq720.jpg",
        author: "Hồng Nguyễn",
      },
      {
        video_id: "gWsRNHprJFI",
        title: "[ KARAOKE ] HAI THẾ GIỚI - WOWY x KARIK | VN KARA",
        duration: 279,
        url: "https://youtube.com/watch?v=gWsRNHprJFI",
        thumbnail: "https://i.ytimg.com/vi/gWsRNHprJFI/hq720.jpg",
        author: "VN KARAOKE ",
      },
      {
        video_id: "-sBLkqkDeKI",
        title:
          "Karaoke Nàng - OgeNus - Team BigDaddy | Rap Việt 2023 | ZKN Music",
        duration: 199,
        url: "https://youtube.com/watch?v=-sBLkqkDeKI",
        thumbnail: "https://i.ytimg.com/vi/-sBLkqkDeKI/hq720.jpg",
        author: "ZKN Music",
      },
      {
        video_id: "iOxvOlCyaVM",
        title: "Ghé Qua - Dick x PC x Tofu | Karaoke.",
        duration: 235,
        url: "https://youtube.com/watch?v=iOxvOlCyaVM",
        thumbnail: "https://i.ytimg.com/vi/iOxvOlCyaVM/hq720.jpg",
        author: "Đức Studio",
      },
      {
        video_id: "t0fPV7RUWvo",
        title:
          "Karaoke QUA TỪNG KHUNG HÌNH (Có Bè) - NGẮN và Robber | Beat Chuẩn | ZKN Music",
        duration: 241,
        url: "https://youtube.com/watch?v=t0fPV7RUWvo",
        thumbnail: "https://i.ytimg.com/vi/t0fPV7RUWvo/hq720.jpg",
        author: "ZKN Music",
      },
      {
        video_id: "maMcxtZvOj8",
        title:
          "Karaoke Cao Ốc 20 (Có Hook) | B RAY x DatG (ft MASEW x K-ICM) | ZKN Music",
        duration: 255,
        url: "https://youtube.com/watch?v=maMcxtZvOj8",
        thumbnail: "https://i.ytimg.com/vi/maMcxtZvOj8/hq720.jpg",
        author: "ZKN Music 2",
      },
      {
        video_id: "woBak43AtJk",
        title:
          "Karaoke Westside Squad (Beat Gốc) tụi mày chỉ biết hút không chịu đi khám phá",
        duration: 181,
        url: "https://youtube.com/watch?v=woBak43AtJk",
        thumbnail: "https://i.ytimg.com/vi/woBak43AtJk/hq720.jpg",
        author: "G5R Karaoke",
      },
      {
        video_id: "TWKuHcEwIfE",
        title:
          "Hẹn Gặp Em Dưới Ánh Trăng - Karaoke (Vocal 30%) KEN 20250108001",
        duration: 222,
        url: "https://youtube.com/watch?v=TWKuHcEwIfE",
        thumbnail: "https://i.ytimg.com/vi/TWKuHcEwIfE/hqdefault.jpg",
        author: "Anh thợ văn phòng dzui zẻ",
      },
      {
        video_id: "PhVO-g7i4OM",
        title: "KARAOKE RAP ĐÔI MẮT | GDUCKY ft ANH TÚ",
        duration: 151,
        url: "https://youtube.com/watch?v=PhVO-g7i4OM",
        thumbnail: "https://i.ytimg.com/vi/PhVO-g7i4OM/hq720.jpg",
        author: "Cảnh Mai Đức",
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
        video_id: "2XyvUlEUU_s",
        title: "Karaoke TUYẾT TRÊN PHỐ - GILL | Karaoke Beat Chuẩn | ZKN Music",
        duration: 223,
        url: "https://youtube.com/watch?v=2XyvUlEUU_s",
        thumbnail: "https://i.ytimg.com/vi/2XyvUlEUU_s/hq720.jpg",
        author: "ZKN Music",
      },
      {
        video_id: "CiBcniXakOE",
        title:
          "Karaoke Tuyết Yêu Thương Remix - Giang Jolee | Từng Bông Tuyết Trắng Rơi Bên Thềm Remix TikTok",
        duration: 213,
        url: "https://youtube.com/watch?v=CiBcniXakOE",
        thumbnail: "https://i.ytimg.com/vi/CiBcniXakOE/hq720.jpg",
        author: "H2O Karaoke",
      },
      {
        video_id: "bzJc8mq9ZiM",
        title: "Karaoke Khi Cơn Mơ Dần Phai   Tez, Myra Trần",
        duration: 189,
        url: "https://youtube.com/watch?v=bzJc8mq9ZiM",
        thumbnail: "https://i.ytimg.com/vi/bzJc8mq9ZiM/hq720.jpg",
        author: "Dong Tam",
      },
      {
        video_id: "jfar0_FTtt8",
        title: "Mamma Mia (Karaoke) - Gerdnang",
        duration: 224,
        url: "https://youtube.com/watch?v=jfar0_FTtt8",
        thumbnail: "https://i.ytimg.com/vi/jfar0_FTtt8/hqdefault.jpg",
        author: "Đổi tên để dễ hát Karaoke",
      },
      {
        video_id: "cigkq3A5mbU",
        title:
          "KARAOKE | ĐỔI TƯ THẾ - BÌNH GOLD x ANDREE RIGHT HAND | ORIGINAL INSTRUMENTAL",
        duration: 246,
        url: "https://youtube.com/watch?v=cigkq3A5mbU",
        thumbnail: "https://i.ytimg.com/vi/cigkq3A5mbU/hq720.jpg",
        author: "Bâus & Cánh Gà",
      },
      {
        video_id: "feJR9mAm0z8",
        title:
          "Ổ QUỶ - DMT, Nguyễn Băng Qua, Trần Lả Lướt, Rocky CDE - Official MV",
        duration: 248,
        url: "https://youtube.com/watch?v=feJR9mAm0z8",
        thumbnail: "https://i.ytimg.com/vi/feJR9mAm0z8/hq720.jpg",
        author: "Ruv",
      },
      {
        video_id: "GyPk5Ygn2IU",
        title: "TETVOVEN (KARAOKE)- Wxrdie ft Andree Right Hand & Machiot",
        duration: 221,
        url: "https://youtube.com/watch?v=GyPk5Ygn2IU",
        thumbnail: "https://i.ytimg.com/vi/GyPk5Ygn2IU/hqdefault.jpg",
        author: "Đức Thịnh",
      },
      {
        video_id: "0FFXAKMRyjg",
        title: "tlinh - nếu lúc đó | karaoke",
        duration: 264,
        url: "https://youtube.com/watch?v=0FFXAKMRyjg",
        thumbnail: "https://i.ytimg.com/vi/0FFXAKMRyjg/hq720.jpg",
        author: "tlinh",
      },
      {
        video_id: "iXKw9cFV2ts",
        title: "Pháo | SỰ NGHIỆP CHƯỚNG - KARAOKE",
        duration: 201,
        url: "https://youtube.com/watch?v=iXKw9cFV2ts",
        thumbnail: "https://i.ytimg.com/vi/iXKw9cFV2ts/hq720.jpg",
        author: "Một bài Dizz",
      },
      {
        video_id: "4n33PVZ3OQ0",
        title: "Karaoke Chạy - GDucky, Tez | Rap Việt Mùa 1 | ZKN Music",
        duration: 223,
        url: "https://youtube.com/watch?v=4n33PVZ3OQ0",
        thumbnail: "https://i.ytimg.com/vi/4n33PVZ3OQ0/hq720.jpg",
        author: "ZKN Music",
      },
      {
        video_id: "fqJ99WLuBWE",
        title: "[karaoke] Thương- karik ft Uyên pim",
        duration: 176,
        url: "https://youtube.com/watch?v=fqJ99WLuBWE",
        thumbnail: "https://i.ytimg.com/vi/fqJ99WLuBWE/hqdefault.jpg",
        author: "Bay Boy Love",
      },
    ],
  },

  {
    id: CategoriesId.SONG_CA,
    name: "Song Ca",
    image: categoryImages[CategoriesId.SONG_CA],
    videos: [
      {
        video_id: "IpSeS7bdOa4",
        title:
          "[KARAOKE SONG CA] - NƠI TÌNH YÊU BẮT ĐẦU - Bằng Kiều ft Lam Anh",
        duration: 282,
        url: "https://youtube.com/watch?v=IpSeS7bdOa4",
        thumbnail: "https://i.ytimg.com/vi/IpSeS7bdOa4/hq720.jpg",
        author: "Yêu Ca Hát",
      },
      {
        video_id: "FDdqvu0dpH8",
        title:
          "Cơn Mưa Tình Yêu - Karaoke - Song Ca - Hà Anh Tuấn ft Phương Linh",
        duration: 292,
        url: "https://youtube.com/watch?v=FDdqvu0dpH8",
        thumbnail: "https://i.ytimg.com/vi/FDdqvu0dpH8/hq720.jpg",
        author: "Yeah ! Smile",
      },
      {
        video_id: "q0ALJx-XM5M",
        title: "Karaoke Ngày Hạnh Phúc Hồ Ngọc Hà ft nhóm VMusic",
        duration: 311,
        url: "https://youtube.com/watch?v=q0ALJx-XM5M",
        thumbnail: "https://i.ytimg.com/vi/q0ALJx-XM5M/hq720.jpg",
        author: "Chin Anh",
      },
      {
        video_id: "eFnvhFpM2pA",
        title: "TA LÀ CỦA NHAU KARAOKE ( BEAT CHUẨN )",
        duration: 179,
        url: "https://youtube.com/watch?v=eFnvhFpM2pA",
        thumbnail: "https://i.ytimg.com/vi/eFnvhFpM2pA/hq720.jpg",
        author: "NEIL HÀ OFFICIAL",
      },
      {
        video_id: "Qu9cT38Cjds",
        title:
          "KARAOKE Cưới Nhau Đi (Beat Chuẩn không bè)  Yes I Do - Bùi Anh Tuấn if Hiền Hồ",
        duration: 263,
        url: "https://youtube.com/watch?v=Qu9cT38Cjds",
        thumbnail: "https://i.ytimg.com/vi/Qu9cT38Cjds/hq720.jpg",
        author: "Hoàng Nhật",
      },
      {
        video_id: "5nwYi1mxNVI",
        title:
          "KARAOKE| CHỈ LÀ KHÔNG CÙNG NHAU (Nhạc Hoa Lời Việt) | TĂNG PHÚC ft TRƯƠNG THẢO NHI | BEAT CHUẨN",
        duration: 235,
        url: "https://youtube.com/watch?v=5nwYi1mxNVI",
        thumbnail: "https://i.ytimg.com/vi/5nwYi1mxNVI/hq720.jpg",
        author: "TĂNG PHÚC OFFICIAL",
      },
      {
        video_id: "NVV2ysFeaPo",
        title:
          "[Karaoke] Bốn Chữ Lắm - Trúc Nhân ft. Trương Thảo Nhi [Song Ca]",
        duration: 260,
        url: "https://youtube.com/watch?v=NVV2ysFeaPo",
        thumbnail: "https://i.ytimg.com/vi/NVV2ysFeaPo/hq720.jpg",
        author: "Tài Nguyễn",
      },
      {
        video_id: "Wr9Xh3pzmUI",
        title: "[Karaoke] Tình về nơi đâu Full_Ken.Wasabi",
        duration: 250,
        url: "https://youtube.com/watch?v=Wr9Xh3pzmUI",
        thumbnail: "https://i.ytimg.com/vi/Wr9Xh3pzmUI/hqdefault.jpg",
        author: "kenny hpu",
      },
      {
        video_id: "LlkX6gcZy6A",
        title: "[Karaoke] Tình Yêu Ngủ Quên - Hoàng Tôn ft LyHan",
        duration: 188,
        url: "https://youtube.com/watch?v=LlkX6gcZy6A",
        thumbnail: "https://i.ytimg.com/vi/LlkX6gcZy6A/hqdefault.jpg",
        author: "QuyenAnh HD Official",
      },
      {
        video_id: "WpuLgWJcqrs",
        title:
          "Karaoke Nỗi Nhớ Đầy Vơi (Beat Gốc Bè) - Noo Phước Thịnh ft Hồ Ngọc Hà",
        duration: 306,
        url: "https://youtube.com/watch?v=WpuLgWJcqrs",
        thumbnail: "https://i.ytimg.com/vi/WpuLgWJcqrs/hq720.jpg",
        author: "N KTV",
      },
      {
        video_id: "CMVu3j5GznE",
        title: "[Karaoke] Mùa ta đã yêu-Hồng Phước Idol,Hương Giang Idol",
        duration: 229,
        url: "https://youtube.com/watch?v=CMVu3j5GznE",
        thumbnail: "https://i.ytimg.com/vi/CMVu3j5GznE/hqdefault.jpg",
        author: "kiên lê",
      },
      {
        video_id: "8vD-4doSzDs",
        title:
          "[KARAOKE] EX'S HATE ME (PART 2) - AMEE x B RAY | Instrumental/Beat Gốc (Tone Nữ)",
        duration: 217,
        url: "https://youtube.com/watch?v=8vD-4doSzDs",
        thumbnail: "https://i.ytimg.com/vi/8vD-4doSzDs/hq720.jpg",
        author: "AMEE",
      },
      {
        video_id: "Kgn2AErRfZQ",
        title: "Gác lại âu lo - Da LAB ft. Miu Lê (Official Karaoke Video)",
        duration: 307,
        url: "https://youtube.com/watch?v=Kgn2AErRfZQ",
        thumbnail: "https://i.ytimg.com/vi/Kgn2AErRfZQ/hq720.jpg",
        author: "Da LAB Official",
      },
      {
        video_id: "u62xH5MlRX8",
        title: "[Karaoke] Người Lạ Ơi",
        duration: 218,
        url: "https://youtube.com/watch?v=u62xH5MlRX8",
        thumbnail: "https://i.ytimg.com/vi/u62xH5MlRX8/hq720.jpg",
        author: "Thing",
      },
      {
        video_id: "76YTAIkq3NU",
        title:
          "KARAOKE | Ngôi Nhà Hoa Hồng - Quang Vinh x Bảo Thy | Beat phối mới chuẩn TONE GỐC ( Tone G - B )",
        duration: 340,
        url: "https://youtube.com/watch?v=76YTAIkq3NU",
        thumbnail: "https://i.ytimg.com/vi/76YTAIkq3NU/hq720.jpg",
        author: "Sang Bùi Studio OFFICIAL",
      },
      {
        video_id: "kAIuVahi9wU",
        title: "Karaoke Một Vòng Trái Đất ( Song Ca )",
        duration: 262,
        url: "https://youtube.com/watch?v=kAIuVahi9wU",
        thumbnail: "https://i.ytimg.com/vi/kAIuVahi9wU/hq720.jpg",
        author: "Tiên Over",
      },
      {
        video_id: "DcETDzRvPmg",
        title: "KARAOKE Xe đạp - Thùy Chi M4U",
        duration: 286,
        url: "https://youtube.com/watch?v=DcETDzRvPmg",
        thumbnail: "https://i.ytimg.com/vi/DcETDzRvPmg/hq720.jpg",
        author: "Karaoke Việt HD",
      },
      {
        video_id: "w7EGe320XU8",
        title:
          "[ Karaoke Song Ca ] Tận Cùng Nỗi Nhớ - Will ft Hansara (Beat chuẩn)",
        duration: 287,
        url: "https://youtube.com/watch?v=w7EGe320XU8",
        thumbnail: "https://i.ytimg.com/vi/w7EGe320XU8/hq720.jpg",
        author: "Hồng Ân Karaoke",
      },
      {
        video_id: "-CvSREY1I10",
        title: "Chưa Bao giờ Mẹ Kể full beat karaoke Min; Erik",
        duration: 259,
        url: "https://youtube.com/watch?v=-CvSREY1I10",
        thumbnail: "https://i.ytimg.com/vi/-CvSREY1I10/hq720.jpg",
        author: "Hàng Nhật Bãi VLOG",
      },
      {
        video_id: "Jox18WfgTV8",
        title: "Karaoke Bánh Mì Không - Beat Chuẩn || ĐạtG x DuUyên x QuangT",
        duration: 216,
        url: "https://youtube.com/watch?v=Jox18WfgTV8",
        thumbnail: "https://i.ytimg.com/vi/Jox18WfgTV8/hq720.jpg",
        author: "QuangT Official",
      },
      {
        video_id: "q9J-dM_fSUs",
        title: "[KARAOKE SONG CA] - ĐỪNG NHƯ THÓI QUEN - Jaykii ft Sara Lưu",
        duration: 275,
        url: "https://youtube.com/watch?v=q9J-dM_fSUs",
        thumbnail: "https://i.ytimg.com/vi/q9J-dM_fSUs/hq720.jpg",
        author: "Yêu Ca Hát",
      },
      {
        video_id: "m8qN8a5kNJ0",
        title:
          "Sài Gòn Đau Lòng Quá Karaoke Tone Nữ | Hứa Kim Tuyền | Tuấn Lê Piano",
        duration: 308,
        url: "https://youtube.com/watch?v=m8qN8a5kNJ0",
        thumbnail: "https://i.ytimg.com/vi/m8qN8a5kNJ0/hq720.jpg",
        author: "Tuấn Lê Piano",
      },
      {
        video_id: "yP27mIX5nh4",
        title: "[KARAOKE SONG CA] KHÓ VẼ NỤ CƯỜI - ĐẠTG x DU UYÊN | BEAT CHUẨN",
        duration: 319,
        url: "https://youtube.com/watch?v=yP27mIX5nh4",
        thumbnail: "https://i.ytimg.com/vi/yP27mIX5nh4/hq720.jpg",
        author: "Internity",
      },
      {
        video_id: "IpSeS7bdOa4",
        title:
          "[KARAOKE SONG CA] - NƠI TÌNH YÊU BẮT ĐẦU - Bằng Kiều ft Lam Anh",
        duration: 282,
        url: "https://youtube.com/watch?v=IpSeS7bdOa4",
        thumbnail: "https://i.ytimg.com/vi/IpSeS7bdOa4/hq720.jpg",
        author: "Yêu Ca Hát",
      },
      {
        video_id: "SsLiKrTTcwo",
        title: "Karaoke Yêu Một Người Có Lẽ   Miu Lê ft  Lou Hoàng Beat",
        duration: 251,
        url: "https://youtube.com/watch?v=SsLiKrTTcwo",
        thumbnail: "https://i.ytimg.com/vi/SsLiKrTTcwo/hq720.jpg",
        author: "thuong hieu vuive channel",
      },
      {
        video_id: "qNbXYIVhqoo",
        title: "[KARAOKE] KHI EM LỚN _Orange x Hoàng Dũng - Beat chuẩn (maN)",
        duration: 228,
        url: "https://youtube.com/watch?v=qNbXYIVhqoo",
        thumbnail: "https://i.ytimg.com/vi/qNbXYIVhqoo/hq720.jpg",
        author: "Nguyễn Hà Nam",
      },
      {
        video_id: "oUUT0cPsJQc",
        title:
          "KHÁC BIỆT TO LỚN (OFFICIAL KARAOKE) | TRỊNH THĂNG BÌNH - LIZ KIM CƯƠNG |",
        duration: 250,
        url: "https://youtube.com/watch?v=oUUT0cPsJQc",
        thumbnail: "https://i.ytimg.com/vi/oUUT0cPsJQc/hq720.jpg",
        author: "PLAN B",
      },
      {
        video_id: "whv4DdSLMCU",
        title: "SÀI GÒN HÔM NAY MƯA - JSOL & HOÀNG DUYÊN | Karaoke Version",
        duration: 248,
        url: "https://youtube.com/watch?v=whv4DdSLMCU",
        thumbnail: "https://i.ytimg.com/vi/whv4DdSLMCU/hq720.jpg",
        author: "DreamS Entertainment",
      },
      {
        video_id: "DpuPTjEGxms",
        title:
          "TĂNG DUY TÂN & HÒA MINZY - BẬT TÌNH YÊU LÊN - KARAOKE  | BEAT CHUẨN CÓ AD LIB | icT Sound",
        duration: 201,
        url: "https://youtube.com/watch?v=DpuPTjEGxms",
        thumbnail: "https://i.ytimg.com/vi/DpuPTjEGxms/hq720.jpg",
        author: "icT Sound",
      },
    ],
  },
];
