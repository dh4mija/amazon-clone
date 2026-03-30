"use client";

import { useState } from "react";
import { addToWishlist } from "@/lib/wishlist";
import { useWishlistNotification } from "@/context/WishlistContext";

export function AddToListButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const { showWishlistNotification } = useWishlistNotification();

  const handleAdd = async () => {
    setLoading(true);
    try {
      await addToWishlist(productId);
      showWishlistNotification("Item saved to Wishlist");
    } catch (e) {
      console.error("Failed to add to wishlist", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="w-full text-left text-sm py-1.5 px-3 border border-gray-300 rounded shadow-sm bg-gray-50 hover:bg-gray-100 disabled:opacity-50 mt-3"
    >
      {loading ? "Adding..." : "Add to Wish List"}
    </button>
  );
}
