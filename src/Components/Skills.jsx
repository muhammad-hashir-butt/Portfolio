import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase, FaJs, FaHtml5 } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

export default function Skills() {
  const dotsContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Blue-themed gray dots background
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
      dot.style.background = `rgba(0, 102, 255, ${opacity})`; // blue dots
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.boxShadow = `0 0 ${Math.random() * 4 + 2}px rgba(0,102,255,0.3)`; // blue glow
      dotsContainerRef.current.appendChild(dot);
    }
  }, []);

  const skills = [
    { name: "HTML & CSS", icon: <FaHtml5 /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "React.js", icon: <FaReact /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "Express.js", icon: <FaNodeJs /> },
    { name: "MongoDB", icon: <FaDatabase /> },
    { name: "Node.js", icon: <FaNodeJs /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [skills.length]);

  const loopedSkills = [...skills, ...skills, ...skills];

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#020617] text-white overflow-visible font-['Inter',sans-serif]"
    >
      {/* Gray/Blue dots */}
      <div ref={dotsContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* Glow Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-blue-500/10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-blue-500/10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto text-center mb-16">
        <h2 className="inline-block text-4xl sm:text-5xl md:text-6xl font-light mb-6 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
          My <span className="text-blue-300/80">Skills</span>
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="h-px w-48 bg-gradient-to-r from-blue-400/40 to-blue-200/20 mx-auto mb-8 rounded-full"
        />
        <p className="text-lg text-blue-200/50 font-light max-w-3xl mx-auto">
          Technologies I specialize in for building modern web applications
        </p>
      </div>

      {/* Infinite Marquee */}
      <div className="relative overflow-hidden py-8">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0A0A1A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0A0A1A] to-transparent z-10" />

        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 md:gap-8"
        >
          {loopedSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.1,
                rotateY: 180,
                boxShadow: "0 0 40px rgba(0,102,255,0.4)",
              }}
              className="flex-none w-48 sm:w-64 bg-blue-900/20 backdrop-blur-xl border border-blue-900/20 rounded-2xl p-6 flex flex-col items-center gap-4 min-w-[180px]"
            >
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="text-5xl sm:text-6xl text-blue-400/70"
              >
                {skill.icon}
              </motion.div>

              <motion.h3
                className="text-lg sm:text-xl font-light text-center text-blue-300/80"
                animate={{ color: ["#66b2ff", "#3399ff", "#66b2ff"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {skill.name}
              </motion.h3>

              {/* Progress bar */}
              <div className="w-full h-px rounded-full overflow-hidden bg-blue-500/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400/60 to-blue-200/30"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Active Skill Indicator */}
      <div className="mt-16 text-center">
        <div className="inline-block px-6 py-3 rounded-full bg-blue-900/20 border border-blue-400/20">
          <div className="flex items-center gap-3 justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-blue-400/50 rounded-full"
            />
            <span className="text-sm font-light text-blue-300/50">Currently Highlighted: </span>
            <span className="font-light text-blue-200/80">{skills[activeIndex]?.name}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
      `}</style>
    </section>
  );
}
