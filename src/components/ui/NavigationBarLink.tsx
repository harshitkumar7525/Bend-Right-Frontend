import React from 'react'
import { NavLink } from 'react-router-dom';

interface NavigationBarLinksProps {
    link: { name: string; href: string };
    handleSignOut?: (event: React.MouseEvent) => void;
}

const NavigationBarLinks: React.FC<NavigationBarLinksProps> = ({ link, handleSignOut }) => {
  return (
    <NavLink to={link.href} className="text-gray-300 hover:text-white transition-colors duration-200" onClick={handleSignOut}>
      {link.name}
    </NavLink>
  )
}

export default NavigationBarLinks;