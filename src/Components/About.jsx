import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaBriefcase, FaCode, FaRocket } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import hashirPic from "../assets/hashirpic.jpeg";

// Glow Orb Component
const GlowOrb = ({ position, color, floatSpeed = 5 }) => (
  <motion.div
    className={`absolute rounded-full ${color} blur-3xl`}
    style={position}
    animate={{
      scale: [1, 1.2, 1],
      y: [0, 20, 0],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{ duration: floatSpeed, repeat: Infinity, ease: "easeInOut" }}
  />
);

// Tech Stack Item Component
const TechStackItem = ({ Icon, label, index }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: index * 0.1,
    }}
    viewport={{ once: true }}
    whileHover={{
      scale: 1.1,
      rotate: 3,
      boxShadow: "0 0 40px rgba(59,130,246,0.5)",
      backgroundColor: "rgba(59,130,246,0.1)",
    }}
    className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur border border-white/10 rounded-2xl cursor-pointer group relative"
  >
    <Icon className="w-10 h-10 text-white/70 mb-3 group-hover:text-white transition-all duration-300" />
    <span className="text-xs text-white/50 group-hover:text-white/80 font-light">{label}</span>
  </motion.div>
);

export default function About() {
  const dotsContainerRef = useRef(null);

  useEffect(() => {
    const createDots = () => {
      if (!dotsContainerRef.current) return;
      dotsContainerRef.current.innerHTML = "";
      for (let i = 0; i < 80; i++) {
        const dot = document.createElement("div");
        dot.className = "absolute rounded-full pointer-events-none";
        const size = Math.random() * 3 + 1;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.background = `rgba(59,130,246,${Math.random() * 0.3 + 0.1})`;
        dot.style.left = Math.random() * 100 + "%";
        dot.style.top = Math.random() * 100 + "%";
        dotsContainerRef.current.appendChild(dot);
      }
    };
    createDots();
  }, []);

  const experience = [
    {
      icon: <FaBriefcase />,
      role: "MERN Stack Developer",
      company: "Techxudo",
      year: "2025 – Present",
      description: "Working as a MERN Stack Developer with focus on React.js, JavaScript, and basic backend skills.",
      tech: ["React.js", "JavaScript", "MongoDB", "Node.js"],
    },
    {
      icon: <FaCode />,
      role: "Frontend Web Developer",
      company: "Self-Employed",
      year: "2024 – Present",
      description: "Creating responsive and interactive frontends with React.js and Tailwind CSS.",
      tech: ["React.js", "JavaScript", "Tailwind CSS"],
    },
  ];

  const education = [
    {
      icon: <FaUniversity />,
      degree: "Bachelor in IST",
      institution: "University of Karachi",
      year: "2022 – Present",
      highlights: ["Programming", "Databases", "Networks"],
    },
    {
      icon: <FaRocket />,
      degree: "ADSE Diploma",
      institution: "Aptech",
      year: "2022 – Present",
      highlights: ["Web Dev", "Full Stack Basics", "Projects"],
    },
  ];

  const techStack = [
    { Icon: SiReact, label: "React.js" },
    { Icon: SiJavascript, label: "JavaScript" },
    { Icon: SiHtml5, label: "HTML5" },
    { Icon: SiCss3, label: "CSS3" },
    { Icon: SiTailwindcss, label: "Tailwind" },
    { Icon: SiMongodb, label: "MongoDB" },
    { Icon: SiNodedotjs, label: "Node.js" },
  ];

  // --- ANIMATION VARIANTS ---
  
  const leftSlideVariants = {
    hidden: { opacity: 0, x: -150 }, // Left side se bahar
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2, // Stagger effect: cards ek ke baad ek aayenge
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    }),
  };

  const rightSlideVariants = {
    hidden: { opacity: 0, x: 150 }, // Right side se bahar
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2, 
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    }),
  };

  return (
    <section id="about" className="relative min-h-screen py-24 px-4 bg-[#020617] text-white overflow-hidden">
      {/* Background Decor */}
      <div ref={dotsContainerRef} className="absolute inset-0 pointer-events-none" />
      <GlowOrb position={{ top: "10%", left: "5%", width: "300px", height: "300px" }} color="bg-blue-600/20" />
      
      {/* Top Profile Section */}
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 mb-20">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-blue-500/30 overflow-hidden shadow-2xl"
        >
          <img src={hashirPic} alt="Hashir" className="w-full h-full object-cover" />
        </motion.div>

        <div className="flex-1 text-center lg:text-left">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <p className="text-xl text-white/60 font-light">
            I am a <span className="text-blue-400">MERN Stack Developer</span> specializing in building modern user interfaces.
          </p>
        </div>
      </div>

      {/* Experience & Education Grid */}
      {/* overflow-x-hidden is important to prevent scrollbar during animation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto overflow-x-hidden px-4">
        
        {/* Experience - COMING FROM LEFT */}
        <div>
          <h3 className="text-3xl font-light mb-8 text-blue-400/80">Experience</h3>
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              custom={idx} // Passing index for staggered delay
              variants={leftSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl text-blue-400">{exp.icon}</div>
                <div>
                  <h4 className="text-xl font-bold">{exp.role}</h4>
                  <p className="text-sm text-white/50">{exp.company} • {exp.year}</p>
                </div>
              </div>
              <p className="text-sm text-white/60 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-[10px] text-blue-300">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education - COMING FROM RIGHT */}
        <div>
          <h3 className="text-3xl font-light mb-8 text-blue-400/80">Education</h3>
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              custom={idx} // Passing index for staggered delay
              variants={rightSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl text-blue-400">{edu.icon}</div>
                <div>
                  <h4 className="text-xl font-bold">{edu.degree}</h4>
                  <p className="text-sm text-white/50">{edu.institution} • {edu.year}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-white/50 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-20 max-w-7xl mx-auto text-center">
        <h3 className="text-3xl font-light mb-12">My Tech Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {techStack.map((tech, idx) => (
            <TechStackItem key={idx} index={idx} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
}