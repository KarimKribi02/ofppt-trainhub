// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/home" className="text-gray-800 hover:text-orange-500">Home</Link>
            <Link to="/courses" className="text-gray-800 hover:text-orange-500">Courses</Link>
            <Link to="/about" className="text-gray-800 hover:text-orange-500">About</Link>
            <Link to="/contact" className="text-gray-800 hover:text-orange-500">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/signup" className="text-gray-800 hover:text-orange-500">Sign up</Link>
            <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
