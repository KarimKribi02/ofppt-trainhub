import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gray-50 py-12 overflow-hidden">
      {/* Fond créatif avec cercles abstraits */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg fill='%23f97316' fill-opacity='0.2'%3E%3Ccircle cx='200' cy='600' r='400'/%3E%3Ccircle cx='1400' cy='300' r='300'/%3E%3Ccircle cx='800' cy='700' r='200'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section Trainhub */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-500 tracking-tight">Trainhub</span>
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            </Link>
            <p className="text-gray-600 text-sm max-w-xs">
              Votre plateforme pour une formation professionnelle simplifiée et efficace.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:contact@trainhub.com"
                className="block text-gray-700 hover:text-orange-500 transition-colors duration-200"
              >
                contact@trainhub.com
              </a>
              <a
                href="tel:+212788888888"
                className="block text-gray-700 hover:text-orange-500 transition-colors duration-200"
              >
                +212 788 888 888
              </a>
            </div>
          </div>

          {/* Section Liens */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/benefits"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Bénéfices
                </Link>
              </li>
              <li>
                <Link
                  to="/our-courses"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Mes Formations
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Témoignages
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Trainhub. Tous droits réservés.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <span className="text-orange-500 text-xs animate-bounce">✨</span>
            <span className="text-gray-500 text-xs">Formez-vous avec passion</span>
            <span className="text-orange-500 text-xs animate-bounce">✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;