// src/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Attach/remove token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token); // persist token
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// Load token automatically on refresh
const token = localStorage.getItem("token");
if (token) setAuthToken(token);

// ===== Auth API =====
export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);

// ===== Products API =====
export const fetchProducts = () => api.get("/products"); // headers already attached via api instance
export const createProduct = (payload) => api.post("/products", payload);
export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const fetchMyProducts = () => api.get("/products/my");

//====Cart API====
export const fetchCart = () => api.get("/cart");
export const addToCart = (productId, quantity) =>
  api.post("/cart", { productId, quantity });
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`);
export const clearCart = () => api.delete("/cart/clear");
// ===== Checkout API =====
export const checkout = (selectedItems) => api.post("/checkout", { selectedItems });

export default api;
