import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Facebook,
  Instagram,
  Twitter,
  Github,
  Mail,
  ArrowUp,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // ✅ Detect dark mode from localStorage and listen for changes
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
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

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Github, href: "https://github.com" },
    { icon: Mail, href: "mailto:support@shopsphere.com" },
  ];

  const shopLinks = [
    { name: "New Arrivals", href: "/shop" },
    { name: "Best Sellers", href: "/shop" },
    { name: "On Sale", href: "/deals" },
    { name: "Gift Cards", href: "/giftcards" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  const helpLinks = [
    { name: "Customer Service", href: "/help" },
    { name: "Returns", href: "/returns" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`border-t relative overflow-hidden transition-colors duration-300
        ${isDark ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"}
      `}
    >
      {/* floating gradient circle background */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={`absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl 
          ${isDark ? "bg-indigo-400/10" : "bg-indigo-500/10"}
        `}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-14 relative z-10">
        {/* Top section: logo + promise badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-12"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className={`w-7 h-7 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Shop<span className="text-indigo-500">Sphere</span>
            </h2>
          </div>

          <div className={`flex flex-wrap justify-center sm:justify-end gap-6 text-sm 
            ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              Secure Payments
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-500" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-500" />
              Easy Returns
            </div>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
          {[{ title: "Shop", links: shopLinks },
          { title: "Company", links: companyLinks },
          { title: "Help", links: helpLinks },
          ].map((section, i) => (
            <motion.div key={i} variants={itemVariants} className="space-y-4">
              <h4 className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`text-sm transition-colors 
                        ${isDark
                          ? "text-gray-300 hover:text-indigo-400"
                          : "text-gray-600 hover:text-indigo-500"}
                      `}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Socials */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              Follow Us
            </h4>
            <div className="flex justify-center sm:justify-start gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full transition
                    ${isDark
                      ? "bg-gray-800 text-gray-300 hover:text-indigo-400"
                      : "bg-gray-200 text-gray-600 hover:text-indigo-500"}
                  `}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className={`mt-10 border-t pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 text-sm 
            ${isDark
              ? "border-gray-700 text-gray-400"
              : "border-gray-300 text-gray-500"}
          `}
        >
          <p>© {currentYear} ShopSphere. All rights reserved.</p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition
              ${isDark
                ? "border-gray-700 bg-gray-800 hover:text-indigo-400"
                : "border-gray-300 bg-gray-50 hover:text-indigo-500"}
            `}
          >
            Back to Top
            <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowUp className="w-3 h-3" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
