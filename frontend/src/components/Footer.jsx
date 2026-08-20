// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-500 to-gray-400 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">Emergency Hub</h2>
            <p className="text-sm">
              A disaster management team succeeds through hard work, dedication,
              and courage to save lives and rebuild communities.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-xl text-white mb-2">Product</h4>
            <ul>
              <li>
                <Link to="/feature" className="text-sm hover:underline">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-bold text-xl text-white mb-2">Resources</h4>
            <ul>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-xl text-white mb-2">Company</h4>
            <ul>
              <li>
                <Link to="/about" className="text-sm hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Bottom Links */}
        <div className="mt-8 border-t border-gray-600 pt-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <a href="#" className="text-sm hover:underline">X</a>
            <a href="https://www.instagram.com/imzeeshan25" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/zeeshan-ansari-ab0b45294" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/zeeshan335530" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>

          <div className="text-sm text-center sm:text-right">
            <p>&copy; 2025. All rights reserved — Emergency Hub</p>
            <div className="mt-2">
              <Link to="/privacy" className="text-sm hover:underline mr-2">Privacy Policy</Link>|
              <Link to="/terms" className="text-sm hover:underline ml-2"> Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
