import React from 'react'
import { MenuItems, MenuItem } from "@headlessui/react";
import { NavLink } from "react-router-dom";

interface MenuItemsProps {
  handleSignOut: (event: React.MouseEvent) => void;
}

const MenuItemsComponent: React.FC<MenuItemsProps> = ({ handleSignOut }) => {
  return (
    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
    >
      <MenuItem>
        <NavLink
          to="/signout"
          onClick={handleSignOut}
          className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
        >
          Sign out
        </NavLink>
      </MenuItem>
    </MenuItems>
  )
}

export default MenuItemsComponent;