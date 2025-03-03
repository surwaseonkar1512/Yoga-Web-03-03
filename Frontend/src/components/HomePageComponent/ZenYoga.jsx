import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ZenYoga = () => {
  const [offsetY, setOffsetY] = useState(20);

  const handleScroll = () => {
    setOffsetY(Math.min(window.scrollY * 0.2, 50)); // Restrict max movement
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r overflow-hidden">
      {/* Background Text with Fixed Parallax Effect */}
      <p
        className="absolute text-[250px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 opacity-60 select-none tracking-wider"
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
