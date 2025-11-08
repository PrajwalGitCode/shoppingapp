import React, { useEffect, useState } from "react";
import { fetchCart, removeFromCart, clearCart } from "../api";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, CheckCircle, Circle } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      setLoading(true);
      const { data } = await fetchCart();
      setCart(data);
    } catch (err) {
      console.error("Error loading cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, []);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === cart.items.length) {
      setSelected([]);
    } else {
      setSelected(cart.items.map(item => item.product._id));
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      await loadCart();
      setSelected(prev => prev.filter(itemId => itemId !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleClear = async () => {
    if (!window.confirm("Are you sure you want to clear your entire cart?")) return;
    try {
      await clearCart();
      await loadCart();
      setSelected([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const handleBuySelected = () => {
    const itemsToBuy = cart.items.filter(item => selected.includes(item.product._id));
    if (itemsToBuy.length === 0) {
      alert("Please select at least one item to purchase");
      return;
    }
    navigate("/checkout", { state: { cartItems: itemsToBuy } });
  };

  const handleBuyAll = () => {
    navigate("/checkout", { state: { cartItems: cart.items } });
  };

  const selectedTotal = cart.items
    .filter(item => selected.includes(item.product._id))
    .reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🛒 Shopping Cart</h1>
          <p className="text-gray-300">Review and manage your items</p>
        </div>

        {loading ? (
          <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-300 mt-4">Loading your cart...</p>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
            <ShoppingBag size={64} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">Add some products to get started</p>
            <button 
              onClick={() => navigate("/products")}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
            {/* Cart Header */}
            <div className="p-6 border-b border-gray-700 bg-gray-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    {selected.length === cart.items.length ? (
                      <CheckCircle size={20} className="text-blue-400" fill="currentColor" />
                    ) : (
                      <Circle size={20} className="text-gray-400" />
                    )}
                    <span className="font-medium">
                      {selected.length === cart.items.length ? 'Deselect All' : 'Select All'}
                    </span>
                  </button>
                  <span className="text-gray-400">
                    {selected.length} of {cart.items.length} selected
                  </span>
                </div>
                <button
                  onClick={handleClear}
                  className="text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors"
                >
                  <Trash2 size={18} />
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-gray-700">
              {cart.items.map((item) => (
                <div key={item.product._id} className="p-6 hover:bg-gray-750 transition-colors">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleSelect(item.product._id)}
                      className="flex-shrink-0"
                    >
                      {selected.includes(item.product._id) ? (
                        <CheckCircle size={24} className="text-blue-400" fill="currentColor" />
                      ) : (
                        <Circle size={24} className="text-gray-400 hover:text-gray-300" />
                      )}
                    </button>

                    {item.product.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-400">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-gray-400 text-sm">
                        ₹{item.product.price} each
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-400/10 transition-all"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="p-6 border-t border-gray-700 bg-gray-900/50">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="text-center lg:text-left">
                  <p className="text-gray-300">
                    {selected.length} item{selected.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ₹{selectedTotal.toFixed(2)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Total for selected items
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleBuySelected}
                    disabled={selected.length === 0}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                  >
                    <CheckCircle size={18} />
                    Buy Selected ({selected.length})
                  </button>
                  
                  <button
                    onClick={handleBuyAll}
                    className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-gray-700"
                  >
                    Buy All Items
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Cart Total:</span>
                  <span className="text-2xl font-bold text-green-400">
                    ₹{cart.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;