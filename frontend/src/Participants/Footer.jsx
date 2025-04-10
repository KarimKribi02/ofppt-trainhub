// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-orange-500">Trainhub</span>
            </Link>
            <div className="space-y-2">
              <a href="mailto:hello@trainhub.com" className="block text-gray-600 hover:text-orange-500">contact@trainhub.com</a>
              <a href="tel:+19198232209" className="block text-gray-600 hover:text-orange-500">+212 788 888 888</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Home</h3>
            <ul className="space-y-2">
              <li><Link to="/benefits" className="text-gray-600 hover:text-orange-500">Bénéfices</Link></li>
              <li><Link to="/our-courses" className="text-gray-600 hover:text-orange-500">Mes Formations</Link></li>
              <li><Link to="/testimonials" className="text-gray-600 hover:text-orange-500">Our Testimonials</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-orange-500">Our FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link to="/company" className="text-gray-600 hover:text-orange-500">Campany</Link></li>
              <li><Link to="/achievements" className="text-gray-600 hover:text-orange-500">Archievement</Link></li>
              <li><Link to="/goals" className="text-gray-600 hover:text-orange-500">Our Goals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Social Profiles</h3>
            <div className="flex space-x-4">
              {/* Icônes ici... (tu peux les garder identiques) */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600">© 2023 Trainhub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
