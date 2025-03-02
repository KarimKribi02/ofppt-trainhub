import React from 'react'
import SideBar from '../SlideBar/SideBar'
import { Outlet, Route, Routes } from 'react-router-dom'
function DrefPage() {
  return (
    <>
    <div className="flex">
      {/* Sidebar */}
      <SideBar role="DREF" />
      {/* Contenu principal */}
      <div className="flex-1 p-4">
        <Outlet /> {/* Affiche le contenu dynamique des sous-pages */}
      </div>
    </div>
    </>
  )
}

export default DrefPage