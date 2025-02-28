// Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4 md:px-6 lg:px-8 shadow-sm">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Contact Information */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="mb-6">
              <div className="bg-orange-500 w-14 h-14 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-600" />
                <span className="text-gray-700">hello@skillbridge.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-600" />
                <span className="text-gray-700">+91 91813 23 2309</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-gray-600" />
                <span className="text-gray-700">Somewhere in the World</span>
              </div>
            </div>
          </div>
          
          {/* Home Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Home</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Benefits</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Our Courses</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Our Testimonials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Our FAQ</a></li>
            </ul>
          </div>
          
          {/* About Us Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Company</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Achievements</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Our Goals</a></li>
            </ul>
          </div>
          
          {/* Social Profiles */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Social Profiles</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaTwitter size={22} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-100">
          <p className="text-gray-600 text-center">© 2023 Skillbridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;