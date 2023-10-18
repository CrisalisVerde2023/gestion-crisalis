import { Container, Dropdown, Image, Navbar } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavbarComponent.css";
import logo from "../assets/images/logoLetras.png";
import user from "../assets/images/user.png";

export default function NavbarComponent() {
  return (
    <Navbar
      expand="lg"
      className="antialiased bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
    >
      <Container className="">
        <Link to={"/home"}>
          <img src={logo} className="mr-3 h-10" alt="Logo" />
        </Link>

        <Dropdown align={"end"}>
          <Dropdown.Toggle className="flex bg-gray-800 rounded-full border-0 md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 p-0 after:content-none">
            <Image src={user} roundedCircle className="w-10 h-10" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Cerrar sesión</Dropdown.Item>
            {/* <Dropdown.Item>Action 2</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}
