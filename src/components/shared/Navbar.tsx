import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import DropdownIcon from "../../assets/drop_down.svg.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const navItems = [
    { path: "/resume", label: "AI Resume" },
    { path: "/coverletter", label: "AI Coverletter" },
    { path: "/pricing", label: "Pricing" },
    { path: "/career", label: "Career", hasDropdown: true },
    { path: "/organization", label: "Organization" },
    { path: "/blog", label: "Blog" },
  ];

  return (
    <nav className="sticky top-0 z-50  md:pt-5 bg-[linear-gradient(to_right,_#f9fbff,_#d5ecfe,_#ebedfe)] ">
      <div className="  w-10/12 mx-auto  flex items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          <img src="/src/assets/Group 1 (1).png" alt="Logo" className="h-6" />
        </Link>

        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.path} className="relative">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  {item.label}
                  <img
                    src={DropdownIcon}
                    alt="dropdown"
                    className="ml-1 w-3 h-3"
                  />
                </button>

                {openDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-30">
                    <Link
                      to="/career/jobs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Jobs
                    </Link>
                    <Link
                      to="/career/internships"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Internships
                    </Link>
                    <Link
                      to="/career/events"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Events
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center text-sm font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-900 font-bold hover:text-blue-600"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-black w-[92px] h-[36px] text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition text-center"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 w-3/4 md:w-1/2 bg-[linear-gradient(to_right,_#f9fbff,_#d5ecfe,_#ebedfe)] border-t border-gray-300 px-4 py-3 space-y-3 shadow-2xl rounded-md z-40">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-xl font-medium ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {item.label}
              {item.hasDropdown && (
                <img
                  src={DropdownIcon}
                  alt="dropdown"
                  className="inline ml-1 w-3 h-3"
                />
              )}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-gray-200">
            <Link
              to="/login"
              className="block text-gray-900 font-extrabold hover:text-blue-600 mb-2"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="block bg-black w-[92px] h-[36px] text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
