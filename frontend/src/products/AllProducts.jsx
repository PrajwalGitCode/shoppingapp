// src/components/AllProducts.jsx
import React, { useEffect, useState } from "react";
import { fetchProducts, addToCart } from "../api";
import { ShoppingCart, CreditCard, Star } from "lucide-react";

const AllProducts = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    load();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    
    try {
      setAddingToCart(productId);
      await addToCart(productId);
      alert("✅ Product added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setAddingToCart(null);
    }
  };

  const handleBuyNow = async (productId) => {
    if (!user) {
      alert("Please login to purchase products");
      return;
    }
    try {
      alert("🛒 Redirecting to checkout...");
      // You can navigate to /checkout or /buy/:id if needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">🛍️ All Products</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our curated collection of premium products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-gray-600 group"
            >
              {/* Product Image */}
              {product.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star size={14} fill="currentColor" />
                    <span>4.5</span>
                  </div>
                </div>
              )}

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-2xl font-bold text-blue-400 mb-3">₹{product.price}</p>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {product.description || "Premium quality product with excellent features"}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    disabled={addingToCart === product._id}
                    onClick={() => handleAddToCart(product._id)}
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25"
                  >
                    <ShoppingCart size={18} />
                    {addingToCart === product._id ? "Adding..." : "Add to Cart"}
                  </button>
                  
                  <button
                    onClick={() => handleBuyNow(product._id)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                  >
                    <CreditCard size={18} />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-800 rounded-2xl p-12 max-w-md mx-auto border border-gray-700">
              <div className="text-gray-500 mb-4">
                <ShoppingCart size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">No Products Available</h3>
              <p className="text-gray-400">
                Check back later for new product arrivals
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;