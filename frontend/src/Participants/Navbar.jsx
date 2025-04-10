import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const onLogout = () => {
    if (handleLogout) {
      handleLogout();
    }
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-500 tracking-tight">Trainhub</span>
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          </Link>

          {/* Menu pour écrans larges */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 relative group"
            >
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 relative group"
            >
              Formations
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 relative group"
            >
              À propos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Bouton de connexion/déconnexion pour écrans larges */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-orange-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Connexion
              </Link>
            ) : (
              <button
                onClick={onLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Déconnexion
              </button>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-orange-500 focus:outline-none transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                Accueil
              </Link>
              <Link
                to="/courses"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                Formations
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="bg-orange-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-orange-600 transition-all duration-300 text-center"
                  onClick={toggleMobileMenu}
                >
                  Connexion
                </Link>
              ) : (
                <button
                  onClick={() => {
                    onLogout();
                    toggleMobileMenu();
                  }}
                  className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-600 transition-all duration-300"
                >
                  Déconnexion
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;