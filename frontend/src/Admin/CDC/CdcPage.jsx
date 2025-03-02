import React from 'react';
import SideBar from '../SlideBar/SideBar';
import { Outlet } from 'react-router-dom'; // Ajout de Outlet

function CdcPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar role="CDC" />
      {/* Contenu principal */}
      <div className="flex-1 p-4">
        <Outlet /> {/* Affiche le contenu dynamique des sous-pages */}
      </div>
    </div>
  );
}

export default CdcPage;
