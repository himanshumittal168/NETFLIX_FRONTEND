import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [opacity, setOpacity] = useState(70);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = Math.min(100, 70 + scrollPosition / 5);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    toast.success("Successfully signed out!");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="flex fixed top-0 justify-between items-center bg-black p-4 w-full z-10 text-white"
      style={{ backgroundColor: `rgba(0, 0, 0, ${opacity / 100})` }}
    >
      <Toaster />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        className="w-24 md:w-32 cursor-pointer"
      />
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 right-0 bg-black md:bg-transparent md:static md:flex md:items-center`}
      >
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 items-center p-4 md:p-0">
          <li>
            <Link to="/" className="hover:text-gray-300 text-xl">
              Home
            </Link>
          </li>
          <li>
            {username && (
              <Link to="/favorites" className="hover:text-gray-300 text-xl">
                Favorites
              </Link>
            )}
          </li>
          {username ? (
            <li>
              <div className="flex flex-col md:flex-row md:gap-3 items-center">
                <h1 className="text-white">
                  <span className="text-red-600 text-lg">Signed In As:</span>{" "}
                  {username}
                </h1>
                <button
                  onClick={handleSignout}
                  className="hover:text-gray-300 bg-red-600 p-2 rounded-lg mt-2 md:mt-0 "
                >
                  Signout
                </button>
              </div>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="hover:text-gray-300 bg-red-600 p-2 rounded-lg"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
