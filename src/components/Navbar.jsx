// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, UserButton, SignInButton } from '@clerk/clerk-react';
import Logo from './logo';
import logo from "../assets/logo.png";

const NavItem = ({ to, label }) => {
  return (
    <li className="inline bg-black">
      <Link 
        to={to} 
        className="text-white no-underline text-lg font-medium px-4 py-2 rounded-3xl transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 hover:scale-110"
      >
        {label}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const { isSignedIn } = useUser();
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "#", label: "Settings" },
    { href: "#", label: "Help" }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-5">
      {/* Logo on the left */}
      <Logo src={logo} alt="FinWise Logo" />
      
      {/* Navigation in the center */}
      <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-max bg-black bg-opacity-90 px-8 py-3 rounded-full border-2 border-white backdrop-blur-lg">
        <ul className="flex items-center gap-6 p-0 m-0 list-none">
          {navLinks.map((link) => (
            <NavItem key={link.label} to={link.href} label={link.label} />
          ))}
          
          {/* Auth Section */}
          <li className="inline bg-black ml-2">
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8"
                  }
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button className="text-white text-lg font-medium px-4 py-2 rounded-3xl transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-500">
                  Sign In
                </button>
              </SignInButton>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;