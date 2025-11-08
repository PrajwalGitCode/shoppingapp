import React, { useState, useEffect } from "react";
import { login, setAuthToken } from "../api";
import { Mail, Lock } from "lucide-react";
import { FaShoppingBag, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Login({ onLogin, onSwitchToSignup }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

  // ✅ Sync with global dark/light mode (same logic as footer)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setAuthToken(response.data.token);
      onLogin(response.data.user, response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center pt-20 transition-colors duration-500
      ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <main
        className={`relative flex flex-row w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden transition-colors duration-300
        ${isDark ? "bg-gray-800" : "bg-white"} 
        max-[900px]:flex-col`}
      >
        {/* Left Side */}
        <div
          className={`w-[50%] p-12 flex flex-col justify-between 
          ${isDark ? "bg-indigo-700 text-white" : "bg-indigo-600 text-white"} 
          max-[900px]:hidden`}
        >
          <span className="flex items-center gap-3 font-semibold text-lg">
            <FaShoppingBag className="text-2xl" />
            ShopEase
          </span>

          <div className="flex flex-col gap-6">
            <h2 className="text-[42px] font-semibold leading-tight">
              Discover, Shop & Save on your favorite products
            </h2>
            <button
              className={`w-[240px] h-[50px] rounded-full flex items-center justify-center gap-3 font-semibold
              ${isDark ? "bg-gray-900 hover:bg-gray-700" : "bg-white text-indigo-600 hover:bg-gray-100"}
              transition-all`}
            >
              <FaShoppingBag /> Start Shopping
            </button>
          </div>

          <p className="text-sm opacity-80 text-center">
            © 2025 ShopEase. All rights reserved.
          </p>
        </div>

        {/* Right Side (Login Form) */}
        <div
          className={`w-[50%] flex flex-col justify-center items-center p-10 max-[900px]:w-full
          ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Login
          </h2>
          <p
            className={`mb-6 text-center ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Welcome back! Log in to continue shopping
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-[350px] max-[900px]:w-[90%]"
          >
            <div
              className={`flex items-center px-3 rounded-md h-[45px] ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Mail className="text-gray-500 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 bg-transparent border-none outline-none px-3 text-sm"
              />
            </div>

            <div
              className={`flex items-center px-3 rounded-md h-[45px] ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Lock className="text-gray-500 w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="flex-1 bg-transparent border-none outline-none px-3 text-sm"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-100 dark:bg-red-900/30 p-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`py-2 rounded-md transition-all font-semibold
                ${isDark ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-700 text-white"}
              `}
            >
              Login
            </button>
          </form>

          <div
            className={`text-sm mt-4 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Don’t have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className={`font-semibold ${
                isDark
                  ? "text-indigo-400 hover:underline"
                  : "text-indigo-600 hover:underline"
              }`}
            >
              Sign up
            </button>
          </div>

          <div className="flex flex-col items-center mt-6">
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
              Or login with
            </p>
            <div className="flex gap-5 mt-2 text-2xl">
              <FaGoogle
                className="hover:text-[#ea4335] cursor-pointer transition-transform hover:scale-110"
                title="Google"
              />
              <FaFacebook
                className="hover:text-[#1877f2] cursor-pointer transition-transform hover:scale-110"
                title="Facebook"
              />
              <FaTwitter
                className="hover:text-[#1da1f2] cursor-pointer transition-transform hover:scale-110"
                title="Twitter"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
