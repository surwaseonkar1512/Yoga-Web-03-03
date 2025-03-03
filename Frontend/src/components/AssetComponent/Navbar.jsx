import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to detect scroll and apply blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-4  z-50 rounded-lg shadow-lg transition duration-300 ${
        isScrolled ? "bg-background/60 backdrop-blur-lg" : "bg-background"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-textPrimary text-2xl font-bold">YogaFlow</div>

        {/* Navigation Menu - Desktop */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "About", "Classes", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-primary hover:text-accent transition duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <button className="bg-accent text-primary px-5 py-2 rounded-lg font-medium hover:bg-background border border-primary transition duration-300 hidden md:block">
          Login
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-background shadow-lg py-4 space-y-4 text-center">
          {["Home", "About", "Classes", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-primary hover:text-accent transition duration-300 text-lg block"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <button className="bg-accent text-primary px-5 py-2 rounded-lg font-medium hover:bg-background border border-primary transition duration-300">
              Login
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
