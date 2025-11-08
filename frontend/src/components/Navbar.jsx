import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode, user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate(); // ✅ React Router navigation

  // ✅ Sync theme with <html>
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

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

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Upload", href: "/products/manage" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg border-b transition-colors duration-300 ${
        isDark
          ? "bg-gray-950/70 border-gray-800 text-gray-100"
          : "bg-white/70 border-gray-200 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-extrabold tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          Shop<span className="text-indigo-500">Sphere</span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative group transition-colors duration-200 ${
                isDark
                  ? "text-gray-200 hover:text-indigo-400"
                  : "text-gray-700 hover:text-indigo-500"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 bottom-0 w-0 h-[2px] ${
                  isDark ? "bg-indigo-400" : "bg-indigo-500"
                } group-hover:w-full transition-all duration-300`}
              />
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button
            className={`p-2 rounded-full transition ${
              isDark
                ? "hover:bg-gray-800 text-gray-200"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Search size={20} />
          </button>

          {/* 🛒 Cart Button */}
          <button
            onClick={() => navigate("/cart")}
            className={`p-2 rounded-full relative transition ${
              isDark
                ? "hover:bg-gray-800 text-gray-200"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            title="View Cart"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              2
            </span>
          </button>

          {/* User / Login / Logout */}
          {user ? (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  onLogout();
                }
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition
                ${
                  isDark
                    ? "bg-gray-800 hover:bg-red-600 text-gray-200 hover:text-white"
                    : "bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white"
                }`}
              title="Logout"
            >
              <User size={18} />
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="px-3 py-1.5 text-sm rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Login
            </a>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition ${
              isDark
                ? "hover:bg-gray-800 text-gray-200"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            title="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Icon */}
          <button
            className={`md:hidden p-2 rounded-full transition ${
              isDark
                ? "hover:bg-gray-800 text-gray-200"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden border-t ${
              isDark
                ? "bg-gray-900/95 border-gray-800 text-gray-200"
                : "bg-white/90 border-gray-200 text-gray-800"
            }`}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`transition-colors ${
                    isDark ? "hover:text-indigo-400" : "hover:text-indigo-500"
                  }`}
                >
                  {link.name}
                </a>
              ))}

              {user ? (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to logout?")) {
                      onLogout();
                      setMenuOpen(false);
                    }
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <a
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                  Login
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;   
