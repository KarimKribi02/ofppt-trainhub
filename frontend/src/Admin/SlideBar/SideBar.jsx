import React, { useState } from "react";
import { FiGrid, FiLayers, FiMessageSquare, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function SideBar({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (isOpen && event.target.id === "sidebar-overlay") {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const menuItems = {
    CDC: [
      { to: "ajouter-formation", icon: <FiLayers />, label: "Ajouter Formation" },
      { to: "overview", icon: <FiGrid />, label: "Overview" },
      { to: "chat", icon: <FiMessageSquare />, label: "Chat" },
    ],
    DREF: [
      { to: "formations", icon: <FiGrid />, label: "Formations" },
      { to: "chat", icon: <FiMessageSquare />, label: "Chat" },
    ],
    ANIMATEUR: [
      { to: "formationsAnimateur", icon: <FiGrid />, label: "formationsAnimateur" },
    ],
  };

  const currentMenu = menuItems[role] || [];

  return (
    <div>
      {/* Bouton pour ouvrir le menu sur mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm bg-orange-500 rounded-lg sm:hidden hover:bg-orange-600 transition"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      {/* Overlay en arrière-plan pour fermer le menu en mobile */}
      {isOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-30 sm:hidden"
          onClick={handleClickOutside}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-orange-500`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Trainhub</span>

          <ul className="space-y-2 font-medium mt-5">
            {currentMenu.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="flex items-center p-2 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  <span className="w-5 h-5">{item.icon}</span>
                  <span className="ms-3">{item.label}</span>
                </Link>
              </li>
            ))}
            
            {/* Bouton Déconnexion */}
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-2 text-white rounded-lg hover:bg-red-600 transition"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="ms-3">Déconnexion</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
