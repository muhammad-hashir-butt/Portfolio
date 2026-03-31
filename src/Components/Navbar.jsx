import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const navItems = [
    { name: "Home", link: "#home", icon: <FaHome /> },
    { name: "About", link: "#about", icon: <FaUser /> },
    { name: "Skills", link: "#skills", icon: <FaCode /> },
    { name: "Projects", link: "#projects", icon: <FaProjectDiagram /> },
    { name: "Contact", link: "#contact", icon: <FaEnvelope /> },
  ];

  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      navItems.forEach((item) => {
        const el = document.querySelector(item.link);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(item.name);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const handleClick = (item) => {
    setActive(item.name);
    setMenuOpen(false);

    // Timeout ensures mobile menu closes before scrolling
    setTimeout(() => {
      const target = document.querySelector(item.link);
      if (target) {
        const yOffset = -70; // Adjust based on navbar height
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const childItemVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          background: scrolled ? "rgba(10, 15, 30, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? "0 6px 25px rgba(0,0,0,0.5)" : "none",
        }}
        className="fixed top-0 left-0 w-full z-50 transition-colors duration-300"
      >
        <div className="relative max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-white font-bold text-xl md:hidden">
            Portfolio
          </motion.div>

          {/* Desktop Nav */}
          <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="hidden md:flex items-center gap-1 mx-auto">
            <LayoutGroup>
              {navItems.map((item, index) => (
                <motion.li key={index} variants={childItemVariants} whileHover={{ y: -3 }} className="relative">
                  <button
                    onClick={() => handleClick(item)}
                    className={`relative px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm transition-all duration-300 ${
                      active === item.name ? "text-blue-400" : "text-white/50 hover:text-blue-300"
                    }`}
                  >
                    <span className={`text-lg transition-transform ${active === item.name ? "scale-110" : ""}`}>{item.icon}</span>
                    {item.name}
                    {active === item.name && (
                      <motion.div
                        layoutId="navGlow"
                        className="absolute inset-0 rounded-lg bg-blue-500/10 border border-blue-400/20 shadow-[0_0_20px_rgba(59,130,246,0.2)] -z-10"
                      />
                    )}
                  </button>
                </motion.li>
              ))}

              {/* Resume Button */}
              <motion.li variants={childItemVariants} className="ml-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  download
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-medium shadow-lg shadow-blue-500/20 block"
                >
                  Resume
                </motion.a>
              </motion.li>
            </LayoutGroup>
          </motion.ul>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-blue-500/10 text-white border border-blue-400/20"
          >
            <AnimatePresence mode="wait">
              <motion.div key={menuOpen ? "close" : "open"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mx-3 mt-2 bg-[#020617]/95 backdrop-blur-lg rounded-xl overflow-hidden"
            >
              <div className="py-2">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(item)}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-sm ${
                      active === item.name ? "bg-blue-500/10 text-blue-400 font-bold" : "text-white/60 hover:bg-blue-500/5"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
                <div className="h-px bg-blue-500/10 my-2"></div>
                <a href="/resume.pdf" download className="block w-full px-4 py-3 text-blue-400 text-sm font-medium">
                  📄 Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}