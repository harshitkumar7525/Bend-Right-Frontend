import React from 'react'
import {Outlet} from 'react-router-dom';
import GlassNavbar from './GlassBar';
const RootLayout: React.FC = () => {
  return (
    <>
      <GlassNavbar />
      <Outlet />
    </>
  )
}

export default RootLayout