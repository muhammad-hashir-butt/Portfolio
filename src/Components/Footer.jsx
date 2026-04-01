import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaRocket } from "react-icons/fa";

const GlowingDot = () => (
  <motion.span
    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="inline-block w-1.5 h-1.5 bg-blue-400/60 rounded-full mx-2"
  />
);

const FooterLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.15, y: -4 }}
    whileTap={{ scale: 0.95 }}
    className="p-3 rounded-full bg-blue-900/20 border border-blue-900/20 text-blue-200/50 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

export default function Footer() {
  const dotsContainerRef = useRef(null);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (!dotsContainerRef.current) return;
    dotsContainerRef.current.innerHTML = "";

    for (let i = 0; i < 40; i++) {
      const dot = document.createElement("div");

      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.2 + 0.05;

      dot.className = "absolute rounded-full pointer-events-none";
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      // 🔥 SAME AS ALL SECTIONS
      dot.style.background = `rgba(0,102,255,${opacity})`;
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.boxShadow = `0 0 ${Math.random() * 3 + 1}px rgba(0,102,255,0.3)`;

      dotsContainerRef.current.appendChild(dot);
    }
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/yourusername", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:hashirbutt303@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative bg-[#020617] text-white overflow-hidden font-['Inter',sans-serif]">
      
      {/* 🔥 SAME DOTS */}
      <div ref={dotsContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* 🔥 SAME CLEAN GLOW */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">

        {/* Top */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="inline-block p-4 rounded-full bg-blue-500/10 mb-6"
          >
            <FaRocket className="w-8 h-8 text-blue-400" />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-light mb-3 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            Let's Connect
          </h2>

          <div className="h-px w-16 bg-gradient-to-r from-blue-400/40 to-blue-200/20 mx-auto mb-5"></div>

          <p className="text-blue-200/40 text-sm font-light max-w-md mx-auto">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-6 mb-10"
        >
          {socialLinks.map((link, idx) => (
            <FooterLink key={idx} {...link} />
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent my-8"></div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-blue-200/40 text-sm">©</span>
            <span className="text-blue-200/40 text-sm font-light">
              {currentYear} M. Hashir Butt
            </span>
            <GlowingDot />
            <span className="text-blue-200/40 text-sm font-light">
              All rights reserved
            </span>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 hover:bg-blue-500/20 transition text-sm"
          >
            ↑ Back to Top
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-900/20 py-4 text-center">
        <p className="text-blue-200/30 text-xs font-light">
          Built with React & Tailwind CSS
        </p>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
      `}</style>
    </footer>
  );
}