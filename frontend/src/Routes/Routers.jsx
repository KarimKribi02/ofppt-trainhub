import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import CdcPage from '../Admin/CDC/CdcPage'

function Routers() {
  return (
    <>
        <Routes>
        <Route path="/formations" element={<CdcPage />}/>
        </Routes>
    </>
  )
}

export default Routers