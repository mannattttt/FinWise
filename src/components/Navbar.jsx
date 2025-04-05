import React from 'react';
import { useUser, UserButton, SignInButton } from '@clerk/clerk-react';

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
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-max bg-black bg-opacity-90 px-8 py-3 rounded-full border-2 border-white backdrop-blur-lg z-50">
      <ul className="flex items-center gap-6 p-0 m-0 list-none">
        {links.map((link) => (
          <NavItem key={link.label} href={link.href} label={link.label} />
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
              <button className="text-white text-lg font-medium px-4 py-2 rounded-3xl transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-500 ">
                Sign In
              </button>
            </SignInButton>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;