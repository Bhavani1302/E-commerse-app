import React, { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out");
    navigate("/"); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-lightBlue-500 text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
         
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md text-sm font-medium"
          >
            Logout
          </button>

          <h1 className="text-3xl font-serif text-white mx-auto">
            <span className="font-extrabold">Elite</span>{' '}
            <span className="font-normal">Shopping</span>
          </h1>

          <div className="flex items-center space-x-2 ml-4">
            {/* Profile Icon as the navigator */}
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              {/* Material Icon for Profile */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14c4 0 4-6 4-6s0-4-4-4-4 4-4 4 0 6 4 6zm0 0c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z"
                />
              </svg>
            </div>
            {/* Link for navigation to Profile */}
            <Link to="/profile" className="text-white text-lg hover:text-gray-300">
              Profile
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">{children}</main>

      <footer className="bg-lightBlue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12H8m0 0H6m2 0h2m8-6.5v9M5 8.5l7-4.5 7 4.5M5 8.5V18l7-4 7 4V8.5m-7-4V8"
              />
            </svg>
            <p>Eliteshop@gmail.com</p>
          </div>

          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <p>044-1234</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
