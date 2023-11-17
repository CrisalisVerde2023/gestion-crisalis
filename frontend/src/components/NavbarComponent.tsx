import { Button, Container, Dropdown, Image, Navbar } from "react-bootstrap";
import React, { useContext, useState } from "react"; // Add useState
import { Link } from "react-router-dom";
import "./styles/NavbarComponent.css";
import logo from "./../assets/images/logoLetras.png";
import user from "./../assets/images/user.png";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { defaultUserLogState } from "./types/UserLogged";

export default function NavbarComponent() {
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);

  // State for dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  function closeSession() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("roles");
    setUserLogged(defaultUserLogState);
  }

  return (
    <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="container mx-auto flex items-center">
        <Link to="/home">
          <img src={logo} alt="Logo" className="mr-3 h-10" />
        </Link>

        <div className="ml-auto relative">
          <button
            onClick={toggleDropdown}
            className="flex bg-gray-800 rounded-full border-0 p-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <img src={user} alt="User" className="rounded-full w-10 h-10" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg py-2 shadow-xl">
              <div className="text-sm font-semibold px-4 py-2">
                {userLogged.email}
              </div>
              <button
                onClick={closeSession}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
