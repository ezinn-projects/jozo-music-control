import React from "react";

const Home: React.FC = () => {
  const tags = ["Sơn Tùng MTP", "BlackPink", "Taylor Swift", "Lê Bảo Bình"];
  const categories = ["Rap", "Pop", "Ballad", "Dance", "Indie"];

  return (
    <div className="p-4">
      {/* Tags Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Nghệ sĩ & Bài hát</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Thể loại âm nhạc</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-blue-100 text-blue-700 px-6 py-4 rounded-lg shadow-md hover:bg-blue-200"
            >
              {category}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
