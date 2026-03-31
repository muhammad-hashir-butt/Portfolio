import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Projects() {
  const dotsContainerRef = useRef(null);

  useEffect(() => {
    if (!dotsContainerRef.current) return;
    dotsContainerRef.current.innerHTML = "";

    for (let i = 0; i < 60; i++) {
      const dot = document.createElement("div");

      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.3 + 0.1;

      dot.className = "absolute rounded-full pointer-events-none";
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      // 🔥 SAME AS SKILLS
      dot.style.background = `rgba(0,102,255,${opacity})`;
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.boxShadow = `0 0 ${Math.random() * 4 + 2}px rgba(0,102,255,0.3)`;

      dotsContainerRef.current.appendChild(dot);
    }
  }, []);

  const projects = [
    {
      name: "Portfolio Website",
      desc: "Modern responsive portfolio using React & Tailwind",
      link: "#",
    },
    {
      name: "E-commerce App",
      desc: "Full MERN stack online shopping system",
      link: "#",
    },
    {
      name: "Blog Platform",
      desc: "Dynamic blog with Node.js & MongoDB",
      link: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-24 px-6 bg-[#020617] text-white overflow-hidden font-['Inter',sans-serif]"
    >
      {/* 🔥 Background Dots */}
      <div
        ref={dotsContainerRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 🔥 Glow Orbs (same as skills) */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-blue-500/10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-blue-500/10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* 🔥 Header */}
      <div className="relative text-center mb-16 z-10">
        <h2 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
          My <span className="text-blue-300/80">Projects</span>
        </h2>

        <div className="h-px w-24 bg-gradient-to-r from-blue-400/40 to-blue-200/20 mx-auto mb-6"></div>

        <p className="text-blue-200/50 max-w-2xl mx-auto">
          Some of my recent work showcasing modern design and scalable development
        </p>
      </div>

      {/* 🔥 Project Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            whileHover={{
              scale: 1.05,
              y: -10,
              boxShadow: "0 0 40px rgba(0,102,255,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="group p-8 rounded-2xl bg-blue-900/20 backdrop-blur-xl border border-blue-900/20 transition-all duration-500"
          >
            {/* Title */}
            <h3 className="text-2xl font-medium text-blue-200/80 mb-3 group-hover:text-white transition">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-blue-200/50 mb-6 group-hover:text-white/70 transition">
              {project.desc}
            </p>

            {/* Link */}
            <div className="flex items-center gap-2 text-blue-300/60 group-hover:text-white transition">
              <span className="text-sm">View Project</span>
              <span className="group-hover:translate-x-1 transition">→</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* 🔥 Button */}
      <div className="text-center mt-16 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-200 hover:bg-blue-500/20 hover:text-white transition duration-300"
        >
          View All Projects
        </motion.button>
      </div>

      {/* Font */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
      `}</style>
    </section>
  );
}