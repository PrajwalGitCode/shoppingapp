import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  Star,
  ArrowRight,
  Shield,
  Heart,
  Tag,
  Gift,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";

const LandingPage = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

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

  const features = [
    { icon: Truck, title: "Fast Delivery", desc: "Get your orders delivered in record time, every time." },
    { icon: Star, title: "Top Quality", desc: "Curated, verified, and top-rated products only." },
    { icon: ShoppingBag, title: "Hassle-Free Shopping", desc: "Intuitive experience designed for seamless checkout." },
  ];

  const highlights = [
    { icon: Shield, title: "Secure Payments", desc: "Your transactions are encrypted and safe with us." },
    { icon: Heart, title: "Loved by Customers", desc: "Thousands of happy customers across the globe." },
    { icon: Tag, title: "Exclusive Deals", desc: "Unbeatable prices & discounts updated daily." },
  ];

  const brands = [
    { icon: Globe, title: "Global Reach", desc: "Delivering happiness to 50+ countries." },
    { icon: Gift, title: "Loyalty Rewards", desc: "Earn points & enjoy exclusive membership perks." },
    { icon: Users, title: "Community Driven", desc: "Join a style community that shares your passion." },
  ];

  return (
    <div
      className={`transition-colors duration-500 min-h-screen pt-20 pb-20 ${
        isDark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 md:px-12 py-20 relative overflow-hidden">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-10 right-10 w-48 h-48 rounded-full blur-3xl opacity-40
            ${isDark ? "bg-indigo-500/10" : "bg-indigo-500/20"}`}
        />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
        >
          Where <span className="text-indigo-500">Style</span> Meets{" "}
          <span className="text-pink-500">Comfort</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`max-w-2xl mx-auto text-lg mb-8 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Discover curated essentials for modern living — fashion, gadgets, and lifestyle items built for today’s world.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-xl flex items-center gap-2 font-semibold transition bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
        >
          Shop Now <ArrowRight size={18} />
        </motion.button>
      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 py-16">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className={`p-8 rounded-2xl border shadow-md text-center transition-all duration-300 ${
              isDark ? "bg-gray-900 border-gray-800 hover:border-indigo-500/30"
              : "bg-white border-gray-200 hover:border-indigo-400/40"
            }`}
          >
            <f.icon className={`w-10 h-10 mx-auto mb-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* PRODUCT HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-10"
        >
          Why Choose <span className="text-pink-500">Us</span>?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-8 rounded-2xl shadow-md border ${
                isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <item.icon
                className={`w-10 h-10 mx-auto mb-4 ${isDark ? "text-pink-400" : "text-pink-600"}`}
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRENDING COLLECTIONS */}
      <section
        className={`py-20 px-6 md:px-12 text-center transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900"
            : "bg-gradient-to-r from-indigo-50 via-pink-50 to-indigo-100"
        }`}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          Trending <span className="text-indigo-500">Collections</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl overflow-hidden shadow-md border ${
                isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
              }`}
            >
              <img
                src={`https://source.unsplash.com/random/800x600?fashion,${i}`}
                alt="Collection"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Collection #{i}</h3>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Explore the latest trends and unique finds curated for you.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BRAND PROMISE */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-10"
        >
          Our <span className="text-indigo-500">Brand Promise</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {brands.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl shadow-lg border ${
                isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <item.icon className={`w-10 h-10 mx-auto mb-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        className={`text-center py-24 px-6 md:px-12 rounded-3xl mx-6 md:mx-20 shadow-lg transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-r from-indigo-900 via-gray-900 to-gray-950"
            : "bg-gradient-to-r from-indigo-100 via-pink-50 to-indigo-50"
        }`}
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Join Our <span className="text-indigo-500">Community</span> Today
        </motion.h2>
        <p
          className={`max-w-2xl mx-auto mb-8 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Get exclusive offers, early access to collections, and personalized style recommendations.
        </p>
        <div className="flex justify-center flex-col sm:flex-row gap-4 sm:gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className={`px-5 py-3 rounded-xl w-full sm:w-80 focus:outline-none ${
              isDark
                ? "bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700"
                : "bg-white text-gray-900 placeholder-gray-400 border border-gray-300"
            }`}
          />
          <button
            className={`px-6 py-3 font-semibold rounded-xl transition flex items-center justify-center gap-2
              ${isDark ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
          >
            Subscribe <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* FOOTER BANNER */}
      <footer className="mt-20 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Vibe Commerce. Crafted with <Sparkles className="inline w-4 h-4 text-pink-500" /> passion.
      </footer>
    </div>
  );
};

export default LandingPage;
