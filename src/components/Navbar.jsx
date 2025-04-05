// Navbar.jsx
import React from 'react';

const NavItem = ({ href, label }) => {
  return (
    <li className="inline bg-black">
      <a 
        href={href} 
        className="text-white no-underline text-lg font-medium px-4 py-2 rounded-3xl transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 hover:scale-110"
      >
        {label}
      </a>
    </li>
  );
};

const Navbar = ({ links }) => {
  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-max bg-black bg-opacity-90 px-8 py-3 rounded-full border-2 border-white backdrop-blur-lg z-50">
      <ul className="flex gap-6 p-0 m-0 list-none">
        {links.map((link) => (
          <NavItem key={link.label} href={link.href} label={link.label} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;