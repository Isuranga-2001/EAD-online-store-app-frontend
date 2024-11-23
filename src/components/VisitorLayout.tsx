import React, { ReactNode } from "react";
import { FaSignOutAlt, FaUserCircle, FaShoppingCart } from "react-icons/fa";

interface VisitorLayoutProps {
  children: ReactNode;
}

const VisitorLayout: React.FC<VisitorLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen text-black bg-white ">
      <header className="px-4 sm:px-28 md:px-32 lg:px-40 xl:px-60 flex items-center justify-between p-4 bg-green border-b border-gray-300">
        <div className="flex items-center">
          <img
            src={"/img/logo.jpg"}
            alt="ITW Digital Logo"
            className="h-12 rounded-full"
          />
          <div className="ml-4">
            <h1 className="text-2xl text-white font-bold">ITW Digital</h1>
            <p className="text-sm text-white m-0">All your computer needs</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaShoppingCart className="mx-4 text-2xl cursor-pointer text-white hover:text-light-green duration-300 transition-all ease-in-out" />
          <FaUserCircle className="mx-4 text-2xl cursor-pointer text-white hover:text-light-green duration-300 transition-all ease-in-out" />
          <FaSignOutAlt className="mx-4 text-2xl cursor-pointer text-white hover:text-light-green duration-300 transition-all ease-in-out" />
        </div>
      </header>
      <main className="pb-12 px-4 sm:px-28 md:px-32 lg:px-40 xl:px-60 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default VisitorLayout;
