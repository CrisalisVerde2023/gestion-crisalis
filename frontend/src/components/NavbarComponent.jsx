import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/NavbarComponent.css";

export default function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="navbarBrand">FrontEnd Crisalis</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <NavDropdown title="Ir a" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/personas">
                Personas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/empresas">
                Empresas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/clientes">
                Clientes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/usuarios">
                Usuarios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos">
                Productos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/servicios">
                Servicios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/impuestos">
                Impuestos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
