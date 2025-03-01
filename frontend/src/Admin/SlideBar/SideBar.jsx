import React, { useState } from "react";
import { FiGrid, FiLayers, FiMessageSquare, FiLogOut } from "react-icons/fi"; // Import des icônes

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour fermer le menu en cliquant en dehors
  const handleClickOutside = (event) => {
    if (isOpen && event.target.id === "sidebar-overlay") {
      setIsOpen(false);
    }
  };

  return (
    <div>
      {/* Bouton de Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm bg-orange-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Overlay transparent qui ferme le menu quand on clique dessus */}
      {isOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 bg-amber-5 bg-opacity-2 backdrop-blur-sm z-30 sm:hidden"
          onClick={handleClickOutside}
        ></div>
      )}

      {/* Sidebar Responsive */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-orange-500`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Logo */}
          
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Trainhub</span>
          

          {/* Menu Items */}
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FiLayers className="w-5 h-5 text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Ajouter Formation</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FiGrid className="w-5 h-5 text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Overview</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FiMessageSquare className="w-5 h-5 text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Chat</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FiLogOut className="w-5 h-5 text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Déconnexion</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
