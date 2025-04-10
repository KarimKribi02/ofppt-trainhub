import React, { useState, useEffect } from "react";
import { FiGrid, FiLayers, FiMessageSquare, FiLogOut, FiMenu, FiX, FiPlusCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function SideBar({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Définir l'élément actif en fonction de l'URL actuelle
    const path = window.location.pathname;
    const currentPath = path.split("/").pop();
    setActiveItem(currentPath);
  }, []);

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
      { to: "ajouter-formation", icon: <FiPlusCircle className="w-5 h-5" />, label: "Ajouter Formation" },
      { to: "overview", icon: <FiGrid className="w-5 h-5" />, label: "Tableau de bord" },
      { to: "chat", icon: <FiMessageSquare className="w-5 h-5" />, label: "Messagerie" },
    ],
    DREF: [
      { to: "formations", icon: <FiLayers className="w-5 h-5" />, label: "Formations" },
      { to: "chat", icon: <FiMessageSquare className="w-5 h-5" />, label: "Messagerie" },
    ],
    ANIMATEUR: [
      { to: "formationsAnimateur", icon: <FiLayers className="w-5 h-5" />, label: "Mes Formations" },
    ],
  };

  const currentMenu = menuItems[role] || [];

  return (
    <>
      {/* Bouton pour ouvrir le menu sur mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="fixed z-30 bottom-4 right-4 p-3 rounded-full bg-orange-500 text-white shadow-lg sm:hidden hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-300"
        aria-label="Ouvrir menu"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Overlay en arrière-plan pour fermer le menu en mobile */}
      {isOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden transition-opacity duration-300"
          onClick={handleClickOutside}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 w-64 bg-white border-r border-gray-200 shadow-xl`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            {/* Logo et titre */}
            <div className="flex items-center justify-center p-5 bg-gradient-to-r from-orange-500 to-orange-400">
              <div className="bg-white p-2 rounded-full">
                <img 
                  src="/logo.svg" 
                  alt="Trainhub Logo" 
                  className="w-8 h-8"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f97316'%3E%3Cpath d='M12 14l9-5-9-5-9 5 9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <h2 className="ml-3 text-xl font-bold text-white">TrainHub</h2>
            </div>

            {/* Menu items */}
            <div className="px-3 py-4">
              <ul className="space-y-2">
                {currentMenu.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className={`flex items-center p-3 rounded-lg ${
                        activeItem === item.to
                          ? "bg-orange-100 text-orange-500 font-medium"
                          : "text-gray-600 hover:bg-orange-50"
                      } group transition-all duration-200`}
                      onClick={() => setActiveItem(item.to)}
                    >
                      <div className={`${
                        activeItem === item.to 
                          ? "bg-orange-500 text-white" 
                          : "bg-gray-100 text-gray-500 group-hover:bg-orange-200 group-hover:text-orange-500"
                        } p-2 rounded-lg transition-all duration-200`}
                      >
                        {item.icon}
                      </div>
                      <span className="ml-3">{item.label}</span>
                      {activeItem === item.to && (
                        <span className="ml-auto w-1.5 h-6 bg-orange-500 rounded-full"></span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bouton Déconnexion */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex w-full items-center p-3 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-500 group transition-all duration-200"
            >
              <div className="bg-gray-100 p-2 rounded-lg text-gray-500 group-hover:bg-red-100 group-hover:text-red-500 transition-all duration-200">
                <FiLogOut className="w-5 h-5" />
              </div>
              <span className="ml-3">Déconnexion</span>
            </button>
            <div className="mt-4 text-center text-xs text-gray-400">
              <p>© 2025 TrainHub</p>
              <p className="mt-1">{role || "Utilisateur"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;