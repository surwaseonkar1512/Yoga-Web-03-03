import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import { MdEmail, MdCall } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-3 gap-10">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <span className="text-white">YogaFlow</span>
            </h2>
            <p className="text-gray-400 mt-3 leading-relaxed">
              Far far away, behind the word mountains, far from countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                Pricing
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Become Instructor
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Courses
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Contact Us
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                FAQ
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Support Center
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p className="text-gray-400 mt-3">1810 Kings Way</p>
            <p className="text-gray-400">King Street, 5th Avenue, New York</p>
            <div className="flex items-center mt-3 space-x-2">
              <MdCall className="text-gray-400" />
              <p className="text-gray-400">1800-2355-2356</p>
            </div>
            <div className="flex items-center mt-2 space-x-2">
              <MdEmail className="text-gray-400" />
              <p className="text-gray-400">contact@YogaFlowyoga.co</p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-10 flex justify-center space-x-6 text-gray-400">
          <a href="#" className="hover:text-white transition text-xl">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white transition text-xl">
            <FaLinkedinIn />
          </a>
          <a href="#" className="hover:text-white transition text-xl">
            <FaPinterestP />
          </a>
          <a href="#" className="hover:text-white transition text-xl">
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-8">
          © 2025 GoodLayers. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
