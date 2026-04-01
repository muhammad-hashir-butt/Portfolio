import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const dotsContainerRef = useRef(null);
  const formRef = useRef(null);

  // 🔥 Background dots
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
      dot.style.background = `rgba(0,102,255,${opacity})`;
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.boxShadow = `0 0 ${Math.random() * 4 + 2}px rgba(0,102,255,0.3)`;

      dotsContainerRef.current.appendChild(dot);
    }
  }, []);

  // 🔥 Contact Info (Gmail compose OPEN)
  const contactInfo = [
    {
      icon: <Mail size={18} />,
      value: "hashirbutt303@gmail.com",
      link: "mailto:hashirbutt303@gmail.com"
    },
    {
      icon: <MapPin size={18} />,
      value: "Karachi, Pakistan",
    },
  ];

  // 🔥 Submit handler (EmailJS)
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_h95ekel",     // ✅ your service ID
        "template_spqn2cf",    // ✅ your template ID
        formRef.current,
        "f7zFTJFOLxeIwQX3f"    // ✅ your public key
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
          setTimeout(() => setStatus("idle"), 3000);
        },
        (error) => {
          console.log("Email error:", error.text);
          setStatus("idle");
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 bg-[#020617] text-white overflow-hidden font-['Inter',sans-serif]"
    >
      {/* Background */}
      <div ref={dotsContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* Glow Effects */}
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

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/3 space-y-10 text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Let's <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text italic">
              Connect
            </span>
          </h2>

          <p className="text-xs uppercase tracking-[0.3em] text-blue-200/40">
            Ready to build something amazing
          </p>

          <div className="space-y-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 justify-center lg:justify-start"
              >
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-blue-200/70 hover:text-blue-400 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-900/20 border border-blue-900/20 flex items-center justify-center hover:bg-blue-500/20 transition">
                      {item.icon}
                    </div>
                    {item.value}
                  </a>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-900/20 border border-blue-900/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <p className="text-blue-200/70">{item.value}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 justify-center lg:justify-start">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="text-blue-200/40 hover:text-blue-400 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="text-blue-200/40 hover:text-blue-400 transition" />
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-2/3 w-full bg-blue-900/20 border border-blue-900/20 backdrop-blur-2xl rounded-3xl p-8 md:p-12 space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="text"
                name="from_name"
                required
                placeholder=" "
                className="peer w-full bg-transparent border-b border-blue-200/20 py-3 focus:outline-none focus:border-blue-400"
              />
              <label className="absolute left-0 top-3 text-blue-200/40 peer-focus:-top-3 peer-focus:text-xs transition-all">
                Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="from_email"
                required
                placeholder=" "
                className="peer w-full bg-transparent border-b border-blue-200/20 py-3 focus:outline-none focus:border-blue-400"
              />
              <label className="absolute left-0 top-3 text-blue-200/40 peer-focus:-top-3 peer-focus:text-xs transition-all">
                Email
              </label>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows="4"
              name="message"
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b border-blue-200/20 py-3 focus:outline-none focus:border-blue-400 resize-none"
            />
            <label className="absolute left-0 top-3 text-blue-200/40 peer-focus:-top-3 peer-focus:text-xs transition-all">
              Message
            </label>
          </div>

          <button
            disabled={status !== "idle"}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition disabled:opacity-50"
          >
            <AnimatePresence mode="wait">
              {status === "idle" ? (
                <motion.div key="idle" className="flex items-center gap-2">
                  Send <Send size={14} />
                </motion.div>
              ) : (
                <motion.div key={status}>
                  {status === "sending" ? "Sending..." : "Message Sent! ✅"}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.form>
      </div>
    </section>
  );
}