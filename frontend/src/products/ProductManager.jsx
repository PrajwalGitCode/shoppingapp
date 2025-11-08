import React, { useEffect, useState } from "react";
import {
  fetchMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api";
import { Pencil, Trash2, PlusCircle, Save, X } from "lucide-react";

const ProductManager = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    if (!user) return;
    try {
      const { data } = await fetchMyProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to load your products. Please check your connection and try again.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert("Product name and price are required fields");

    try {
      setLoading(true);
      if (editId) await updateProduct(editId, form);
      else await createProduct(form);
      setForm({ name: "", price: "", description: "", image: "" });
      setEditId(null);
      await loadProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      alert(err.response?.data?.message || "Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert(err.response?.data?.message || "Failed to delete product. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: "", price: "", description: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-white mb-2">Product Management</h1>
            <p className="text-gray-300 text-lg">Manage your product catalog and inventory</p>
          </div>
          <button
            onClick={cancelEdit}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            <PlusCircle size={20} />
            Add New Product
          </button>
        </div>

        {/* Add/Edit Form */}
        {user && (
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 mb-10 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">
              {editId ? "Edit Product Details" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter price in rupees"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Product Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your product features and details"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-4 rounded-xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Product Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                {editId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 rounded-xl border border-gray-500 text-gray-300 hover:bg-gray-700 transition-all duration-200 flex items-center gap-2 font-medium"
                  >
                    <X size={18} /> Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editId ? <Save size={18} /> : <PlusCircle size={18} />}
                  {loading ? "Processing..." : editId ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Your Products</h2>
          <p className="text-gray-300 mb-6">You have {products.length} product{products.length !== 1 ? 's' : ''} in your catalog</p>
          
          {products.length === 0 ? (
            <div className="bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-700">
              <div className="text-gray-500 mb-4">
                <PlusCircle size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">No Products Yet</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Start building your product catalog by adding your first product using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700"
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-56 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-blue-400 mb-3">₹{product.price}</p>
                    <p className="text-gray-300 text-sm mb-6 line-clamp-3 min-h-[60px]">
                      {product.description || "No description provided"}
                    </p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      <span className="text-xs text-gray-400 font-medium">
                        ID: {product._id.slice(-8)}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-3 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded-xl transition-all duration-200"
                          title="Edit product"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-3 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-xl transition-all duration-200"
                          title="Delete product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;