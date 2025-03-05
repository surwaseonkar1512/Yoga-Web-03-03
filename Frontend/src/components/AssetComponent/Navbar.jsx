import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  // Detect scroll to apply blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Links
  const navLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "About Us", link: "/about-us" },
    { id: 3, name: "Contact Us", link: "/contact-us" },
    { id: 4, name: "Meditation Music", link: "/meditation" },
    { id: 6, name: "Nutrition", link: "/nutrition" },
    { id: 7, name: "Yoga Exercises", link: "/yoga-exercises" },
  ];

  // Logout function
  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    console.log("User logged out");

    // Redirect to home page
    navigate("/");
  };

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
              <Link
                to={link}
                className="text-green-800 hover:text-accent transition font-bold duration-300"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Authentication Buttons */}
        {token ? (
          <div className="flex gap-4">
            <Link to="/profile">
              <button className="bg-green-800 text-white px-5 py-2 rounded-lg font-medium border border-primary transition duration-300 hidden md:block">
                Profile
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded-lg font-medium border border-primary transition duration-300 hidden md:block"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-1">
            <Link to="/signup">
              <button className="text-green-800 bg-white px-5 py-2 rounded-lg font-medium border border-primary transition duration-300 hidden md:block">
                SignUp
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-green-800 text-white px-5 py-2 rounded-lg font-medium border border-primary transition duration-300 hidden md:block">
                Login
              </button>
            </Link>
          </div>
        )}

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
              <Link
                to={link}
                className="text-green-800 hover:text-accent transition duration-300 text-lg block font-bold"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/login">
              <button className="bg-green-800 text-white px-5 py-2 rounded-lg font-medium border border-primary transition duration-300">
                Login
              </button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
