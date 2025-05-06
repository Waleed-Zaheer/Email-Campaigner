import React from 'react';

const Navbar = () => {
  return (
    <div className="relative z-10">
      <nav className="bg-white shadow-[0_4px_8px_rgba(0,0,0,0.3)] mx-4 mt-4 rounded-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <p className="text-2xl font-bold text-blue-600">Campaigner</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
