import React, { useState, useEffect } from "react";
import { useFnbMenuQuery } from "@/hooks/useFnbMenuQuery";
import { useFnbMutations } from "@/hooks/useFnbMutations";
import { toast } from "@/components/ToastContainer";
import FnbMenuItem from "@/components/FnbMenuItem";
import { useSearchParams } from "react-router-dom";

const FnbOrder: React.FC = () => {
  const { data: fnbMenu, isLoading, isError } = useFnbMenuQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "";
  const { submitOrder } = useFnbMutations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<FnbCategory[]>([]);

  // Tạo danh sách categories từ items
  useEffect(() => {
    if (fnbMenu?.items) {
      const uniqueCategories = Array.from(
        new Set(fnbMenu.items.map((item) => item.category))
      ).filter(Boolean) as string[]; // Đảm bảo các giá trị là string

      const categoryList: FnbCategory[] = uniqueCategories.map((category) => ({
        id: category, // category đã là string nên id chắc chắn là string
        name:
          category === "snacks"
            ? "Snacks"
            : category === "drinks"
            ? "Drinks"
            : category,
      }));

      setCategories(categoryList);

      // Nếu có categories và chưa có category được chọn, chọn category đầu tiên
      if (categoryList.length > 0 && !selectedCategory) {
        setSelectedCategory(categoryList[0].id);
      }
    }
  }, [fnbMenu, selectedCategory]);

  // Temporarily disabled - feature under development
  // const handleAddToCart = (item: FnbItem) => {
  //   const existingItem = cart.find((cartItem) => cartItem.itemId === item._id);
  //   if (existingItem) {
  //     // Increase quantity if item already in cart
  //     setCart(
  //       cart.map((cartItem) =>
  //         cartItem.itemId === item._id
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItem
  //       )
  //     );
  //   } else {
  //     // Add new item to cart
  //     setCart([...cart, { itemId: item._id, quantity: 1 }]);
  //   }
  //   toast.success(`Đã thêm ${item.name} vào giỏ hàng`);
  // };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.itemId !== itemId));
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.itemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleUpdateNotes = (itemId: string, notes: string) => {
    setCart(
      cart.map((item) => (item.itemId === itemId ? { ...item, notes } : item))
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, cartItem) => {
      const item = fnbMenu?.items.find((i) => i._id === cartItem.itemId);
      if (!item) return total;

      // Chuyển đổi price từ string sang number
      const itemPrice = parseFloat(
        item.price.replace(/\./g, "").replace(",", ".")
      );
      return total + itemPrice * cartItem.quantity;
    }, 0);
  };

  const handleSubmitOrder = () => {
    if (cart.length === 0) {
      toast.error("Vui lòng thêm món ăn vào giỏ hàng trước khi đặt hàng");
      return;
    }

    setIsSubmitting(true);
    const orderData = {
      items: cart,
      totalAmount: calculateTotal(),
      roomId: roomId,
    };

    submitOrder.mutate(
      orderData as Omit<Order, "id" | "createdAt" | "status">,
      {
        onSuccess: () => {
          toast.success("Đã gửi đơn hàng thành công!");
          setCart([]);
          setIsSubmitting(false);
        },
        onError: (error) => {
          toast.error("Đặt hàng thất bại. Vui lòng thử lại sau!");
          setIsSubmitting(false);
          console.error("Order error:", error);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">
          Không thể tải menu. Vui lòng thử lại sau.
        </div>
      </div>
    );
  }

  const filteredItems = fnbMenu?.items.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-lightpink">
        Đặt Đồ Ăn & Thức Uống
      </h1>

      {/* Notice Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Thông báo:</strong> Chức năng đặt hàng đang được phát
              triển. Hiện tại quý khách có thể xem menu và giá để tham khảo.
              <br />
              <strong>💡 Để đặt hàng:</strong> Vui lòng bấm nút chuông 🔔 ở góc
              trên để gọi nhân viên hỗ trợ.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Categories */}
        <div className="lg:col-span-1 sticky top-4 self-start">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-semibold mb-4 text-lightpink">
              Danh Mục
            </h2>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`p-3 rounded-md text-left transition-all ${
                    selectedCategory === category.id
                      ? "bg-lightpink text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-lightpink"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h2 className="text-xl font-semibold text-lightpink mb-4">
              Giỏ Hàng
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Giỏ hàng trống</p>
            ) : (
              <div>
                <div className="max-h-[50vh] overflow-y-auto">
                  {cart.map((cartItem) => {
                    const item = fnbMenu?.items.find(
                      (i) => i._id === cartItem.itemId
                    );
                    if (!item) return null;

                    // Tính toán giá tiền
                    const itemPrice = parseFloat(
                      item.price.replace(/\./g, "").replace(",", ".")
                    );
                    const totalItemPrice = (
                      itemPrice * cartItem.quantity
                    ).toLocaleString("vi-VN");

                    return (
                      <div
                        key={item._id}
                        className="mb-4 border-b pb-3 last:border-b-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-lightpink">
                              {item.name}
                            </p>
                            <p className="text-gray-600">{totalItemPrice}đ</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item._id,
                                  cartItem.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            <span className="text-lightpink font-medium px-2">
                              {cartItem.quantity}
                            </span>
                            <button
                              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item._id,
                                  cartItem.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Notes input */}
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Ghi chú đặc biệt (vd: không cay, ít đường...)"
                            value={cartItem.notes || ""}
                            onChange={(e) =>
                              handleUpdateNotes(item._id, e.target.value)
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-lightpink"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Tổng cộng:</span>
                    <span>{calculateTotal().toLocaleString("vi-VN")}đ</span>
                  </div>
                  <button
                    className={`w-full mt-4 py-2 rounded-md transition-colors ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-lightpink text-white hover:bg-lightpink/80"
                    }`}
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang xử lý...
                      </span>
                    ) : (
                      "Đặt Hàng"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Menu Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">
              {categories.find((c) => c.id === selectedCategory)?.name ||
                "Menu"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems?.map((item) => (
                <FnbMenuItem key={item._id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FnbOrder;
