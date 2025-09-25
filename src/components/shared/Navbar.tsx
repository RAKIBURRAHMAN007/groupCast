import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import DropdownIcon from "../../assets/drop_down.svg.png";
import logo from "../../assets/Group 1 (1).png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const navItems = [
    { path: "aiResume", label: "AI Resume" },
    { path: "coverletter", label: "AI Coverletter" },
    { path: "pricing", label: "Pricing" },
    {
      path: "career",
      label: "Career",
      hasDropdown: true,
      dropdownItems: [
        { label: "Jobs", path: "careerJobs" },
        { label: "Internships", path: "careerInternships" },
        { label: "Events", path: "careerEvents" },
      ],
    },
    { path: "organization", label: "Organization" },
    { path: "blog", label: "Blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[linear-gradient(to_right,_#f9fbff,_#d5ecfe,_#ebedfe)] md:pt-5">
      <div className="w-10/12 mx-auto flex items-center justify-between py-4">
        <ScrollLink
          to="top"
          smooth
          duration={500}
          className="flex items-center cursor-pointer"
        >
          <img src={logo} alt="Logo" className="h-6" />
        </ScrollLink>

        {/* Desktop Menu */}
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
                    {item.dropdownItems.map((drop) => (
                      <ScrollLink
                        key={drop.path}
                        to={drop.path}
                        smooth
                        duration={500}
                        offset={-80}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {drop.label}
                      </ScrollLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <ScrollLink
                key={item.path}
                to={item.path}
                smooth
                duration={500}
                offset={-80}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                {item.label}
              </ScrollLink>
            )
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <ScrollLink
            to="login"
            smooth
            duration={500}
            offset={-80}
            className="text-gray-900 font-bold hover:text-blue-600 cursor-pointer"
          >
            Log In
          </ScrollLink>
          <ScrollLink
            to="signup"
            smooth
            duration={500}
            offset={-80}
            className="bg-black w-[92px] h-[36px] text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition flex items-center justify-center cursor-pointer"
          >
            Sign Up
          </ScrollLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 w-3/4 md:w-1/2 bg-[linear-gradient(to_right,_#f9fbff,_#d5ecfe,_#ebedfe)] border-t border-gray-300 px-4 py-3 space-y-3 shadow-2xl rounded-md z-40">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.path}>
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center text-xl font-medium text-gray-700 hover:text-blue-600"
                >
                  {item.label}
                  <img
                    src={DropdownIcon}
                    alt="dropdown"
                    className="inline ml-1 w-3 h-3"
                  />
                </button>
                {openDropdown &&
                  item.dropdownItems.map((drop) => (
                    <ScrollLink
                      key={drop.path}
                      to={drop.path}
                      smooth
                      duration={500}
                      offset={-80}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg text-gray-700 hover:text-blue-600 cursor-pointer px-4 py-2"
                    >
                      {drop.label}
                    </ScrollLink>
                  ))}
              </div>
            ) : (
              <ScrollLink
                key={item.path}
                to={item.path}
                smooth
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block text-xl font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                {item.label}
              </ScrollLink>
            )
          )}

          {/* Auth Buttons */}
          <ScrollLink
            to="login"
            smooth
            duration={500}
            offset={-80}
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 font-extrabold hover:text-blue-600 mb-2 cursor-pointer"
          >
            Log In
          </ScrollLink>
          <ScrollLink
            to="signup"
            smooth
            duration={500}
            offset={-80}
            onClick={() => setIsOpen(false)}
            className="block bg-black w-[92px] h-[36px] text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition text-center cursor-pointer"
          >
            Sign Up
          </ScrollLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
