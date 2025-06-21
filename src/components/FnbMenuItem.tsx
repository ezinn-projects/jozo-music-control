import React from "react";

interface FnbMenuItemProps {
  item: FnbItem;
  // onAddToCart: (item: FnbItem) => void; // Disabled for now
}

const FnbMenuItem: React.FC<FnbMenuItemProps> = ({ item }) => {
  const defaultImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden">
        <img
          src={item.image || defaultImage}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-lightpink">{item.price}đ</span>
          <button
            className="bg-gray-400 text-gray-600 px-3 py-1 rounded-md cursor-not-allowed flex items-center gap-1"
            disabled={true}
            title="Chức năng đang được phát triển"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Sắp có
          </button>
        </div>
      </div>
    </div>
  );
};

export default FnbMenuItem;
