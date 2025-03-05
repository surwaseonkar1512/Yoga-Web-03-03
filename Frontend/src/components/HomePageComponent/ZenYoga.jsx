import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const ZenYoga = () => {
  const [offsetY, setOffsetY] = useState(20);

  // Handle scroll parallax effect
  const handleScroll = () => {
    setOffsetY(Math.min(window.scrollY * 0.2, 50)); // Restrict max movement
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { x: 500 }, // Start position (off-screen right)
        {
          x: -500, // End position (off-screen left)
          duration: 4,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%", // Start animation when 80% of the element is in view
            end: "bottom top", // End animation when the element exits the view
            scrub: 2, // Smooth transition
          },
        }
      );
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <div
        className="absolute -inset-1 bg-white "
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 100%)",
        }}
      ></div>{" "}
      <p
        ref={textRef}
        className="absolute text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 opacity-60 select-none tracking-wider"
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        YOGA FLOW
      </p>
      {/* Foreground PNG with Slow Bounce Animation */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="https://yoge-demo.pbminfotech.com/demo1/wp-content/uploads/sites/2/2023/09/img-01.png"
          alt="Yoga Pose"
          className="drop-shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default ZenYoga;
