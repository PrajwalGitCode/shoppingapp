import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkout } from "../api";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, CreditCard, Package, Calendar, Receipt } from "lucide-react";

const Checkout = () => {
    const { state } = useLocation();
    const cartItems = state?.cartItems || [];
    const [loading, setLoading] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((sum, item) => 
        sum + (item.product?.price || 0) * item.quantity, 0
    );

    const handlePayment = async () => {
        if (!cartItems.length) return alert("No items to checkout.");
        setLoading(true);
        try {
            const payload = cartItems.map((item) => item.product?._id?.toString());
            const { data } = await checkout(payload);
            setReceipt(data.receipt);
        } catch (err) {
            console.error("Checkout error:", err);
            alert(err.response?.data?.message || "Checkout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-8 px-4">
            <div className="max-w-4xl mx-auto">
                {!receipt ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gray-900/50 p-6 border-b border-gray-700">
                            <h1 className="text-3xl font-bold text-white text-center mb-2">Checkout</h1>
                            <p className="text-gray-300 text-center">
                                Complete your purchase for <b>{cartItems.length}</b> item{cartItems.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        <div className="p-6 lg:p-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Order Summary */}
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <Package size={20} />
                                        Order Summary
                                    </h2>
                                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600 max-h-80 overflow-y-auto">
                                        {cartItems.map((item, idx) => (
                                            <div key={item.product?._id || idx} 
                                                className="flex items-center gap-3 py-3 border-b border-gray-600 last:border-b-0">
                                                {item.product?.image && (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-12 h-12 object-cover rounded-lg border border-gray-500"
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-medium truncate">
                                                        {item.product?.name || "Unknown Product"}
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        Qty: {item.quantity} × ₹{item.product?.price || 0}
                                                    </p>
                                                </div>
                                                <p className="text-green-400 font-bold">
                                                    ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <CreditCard size={20} />
                                        Payment Details
                                    </h2>
                                    <div className="bg-gray-750 rounded-xl p-6 border border-gray-600">
                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between text-gray-300">
                                                <span>Subtotal</span>
                                                <span>₹{totalAmount.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-300">
                                                <span>Shipping</span>
                                                <span className="text-green-400">FREE</span>
                                            </div>
                                            <div className="flex justify-between text-gray-300">
                                                <span>Tax</span>
                                                <span>₹{(totalAmount * 0.18).toFixed(2)}</span>
                                            </div>
                                            <div className="border-t border-gray-600 pt-4">
                                                <div className="flex justify-between text-lg font-bold text-white">
                                                    <span>Total</span>
                                                    <span className="text-blue-400">
                                                        ₹{(totalAmount * 1.18).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={handlePayment} 
                                            disabled={loading || cartItems.length === 0}
                                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allied text-white py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle size={20} />
                                                    Pay ₹{(totalAmount * 1.18).toFixed(2)}
                                                </>
                                            )}
                                        </button>

                                        <button 
                                            onClick={() => navigate(-1)}
                                            className="w-full mt-3 border border-gray-500 text-gray-300 hover:text-white hover:border-gray-400 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:bg-gray-700"
                                        >
                                            <ArrowLeft size={18} />
                                            Back to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden"
                    >
                        {/* Success Header */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center">
                            <CheckCircle size={64} className="mx-auto text-white mb-4" />
                            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
                            <p className="text-emerald-100 text-lg">Your order has been confirmed</p>
                        </div>

                        <div className="p-6 lg:p-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Order Details */}
                                <div className="bg-gray-750 rounded-xl p-6 border border-gray-600">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <Receipt size={20} />
                                        Order Details
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Order ID:</span>
                                            <span className="text-white font-mono font-bold">
                                                {receipt.orderId || `ORD-${Date.now()}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Date:</span>
                                            <span className="text-white flex items-center gap-1">
                                                <Calendar size={16} />
                                                {receipt.date ? new Date(receipt.date).toLocaleString() : new Date().toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-lg pt-3 border-t border-gray-600">
                                            <span className="text-gray-300 font-semibold">Total Paid:</span>
                                            <span className="text-green-400 font-bold text-xl">
                                                ₹{receipt.total ? receipt.total.toFixed(2) : totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Items Purchased */}
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Items Purchased</h2>
                                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600 max-h-60 overflow-y-auto">
                                        {(receipt.items || cartItems).map((item, idx) => (
                                            <div key={item.product?._id || idx} 
                                                className="flex items-center gap-3 py-3 border-b border-gray-600 last:border-b-0">
                                                {item.product?.image && (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-10 h-10 object-cover rounded-lg border border-gray-500"
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-medium truncate">
                                                        {item.product?.name || "Unknown Product"}
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        Qty: {item.quantity} × ₹{item.price || item.product?.price || 0}
                                                    </p>
                                                </div>
                                                <p className="text-green-400 font-bold">
                                                    ₹{((item.price || item.product?.price || 0) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                                <button 
                                    onClick={() => navigate("/products")}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <Package size={18} />
                                    Continue Shopping
                                </button>
                                <button 
                                    onClick={() => navigate("/")}
                                    className="border border-gray-500 text-gray-300 hover:text-white hover:border-gray-400 px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-gray-700"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Checkout;