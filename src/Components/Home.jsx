import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const container = useRef(null);
  const buttonsRef = useRef([]);
  const dotsContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // --- Initial States ---
      gsap.set(".badge-anim", { opacity: 0, x: 100 });
      gsap.set(".mern-text", { opacity: 0, x: -100 });
      gsap.set(".dev-text", { opacity: 0, y: 50 });
      gsap.set(".desc-text", { opacity: 0, y: 30 });
      gsap.set(buttonsRef.current, { opacity: 0, scale: 0.8 });

      // --- Timeline ---
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".badge-anim", { opacity: 1, x: 0, duration: 1.2 })
        .to(".mern-text", { opacity: 1, x: 0, duration: 1.2 }, "-=0.8")
        .to(".dev-text", { opacity: 1, y: 0, duration: 1 }, "-=0.8")
        .to(".desc-text", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(buttonsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }, "-=0.5");

      // Floating Badge
      gsap.to(".badge-float", { y: -6, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

      createDots();
    }, container);

    return () => ctx.revert();
  }, []);

  const createDots = () => {
    if (!dotsContainerRef.current) return;
    dotsContainerRef.current.innerHTML = "";
    for (let i = 0; i < 50; i++) {
      const dot = document.createElement("div");
      dot.className = "absolute rounded-full";
      const size = Math.random() * 3 + 1;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.background = `rgba(59,130,246,${Math.random() * 0.4})`;
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dotsContainerRef.current.appendChild(dot);
      gsap.to(dot, {
        y: gsap.utils.random(-30, 30),
        x: gsap.utils.random(-20, 20),
        duration: gsap.utils.random(6, 12),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  };

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={container}
      id="home"
      className="relative h-screen w-full bg-[#020617] overflow-hidden text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_70%)]" />
      <div ref={dotsContainerRef} className="absolute inset-0" />

      <main className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">

          {/* Badge */}
          <div className="badge-anim badge-float mb-6">
            <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs">
              Frontend Developer
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 overflow-hidden">
            <span className="block text-white mern-text">MERN Stack</span>
            <span className="block text-blue-400 mt-2 dev-text">Developer</span>
          </h1>

          {/* Description */}
          <p className="desc-text text-white/50 mb-10 max-w-xl mx-auto">
            Building scalable backends and modern frontends with clean code and thoughtful design.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              ref={(el) => (buttonsRef.current[0] = el)}
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition shadow-lg shadow-blue-500/30 font-medium"
            >
              View Projects
            </button>

            <button
              ref={(el) => (buttonsRef.current[1] = el)}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border border-blue-400/30 text-blue-300 rounded-md hover:bg-blue-500/10 transition font-medium"
            >
              Contact Me
            </button>
          </div>
        </div>
      </main>

      {/* Glow Effects */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-400/10 blur-3xl rounded-full"></div>
    </div>
  );
}