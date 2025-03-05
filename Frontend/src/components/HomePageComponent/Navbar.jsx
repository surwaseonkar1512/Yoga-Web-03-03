import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to apply blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Links (Hardcoded JSON)
  const navLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "About Us", link: "about-us" },
    { id: 3, name: "Contact Us", link: "contact-us" },
    { id: 4, name: "MeditationMusic", link: "meditation" },
    { id: 6, name: "Nutrition", link: "nutrition" },
    { id: 7, name: "Yoga Exercises", link: "yoga-exercises" },
  ];

  return (
    <nav
      className={`w-full fixed top-4 z-50 rounded-lg shadow-lg transition duration-300 ${
        isScrolled ? "bg-background/60 backdrop-blur-lg" : "bg-background"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-textPrimary text-2xl font-bold">YogaFlow</div>

        {/* Navigation Menu - Desktop */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(({ id, name, link }) => (
            <li key={id}>
              <a
                href={link}
                className="text-green-800 hover:text-accent transition font-bold duration-300"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <button className="bg-green-800 text-white px-5 py-2 rounded-lg font-medium  border border-primary transition duration-300 hidden md:block">
          Login
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-background shadow-lg py-4 space-y-4 text-center">
          {navLinks.map(({ id, name, link }) => (
            <li key={id}>
              <a
                href={link}
                className="text-green-800 hover:text-accent transition duration-300 text-lg block font-bold"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </a>
            </li>
          ))}
          <li>
            <button className="bg-green-800 text-white px-5 py-2 rounded-lg font-medium  border border-primary transition duration-300">
              Login
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
