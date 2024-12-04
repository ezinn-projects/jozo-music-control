function SongCard({ videoId, thumbnail, title, channelTitle }: Video) {
  return (
    <div
      key={videoId}
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-1 truncate">{title}</h3>
        <p className="text-xs text-gray-500 truncate">{channelTitle}</p>
      </div>
    </div>
  );
}

export default SongCard;
