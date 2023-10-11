import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ABMHub from "./components/ABMHub";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ABMProductServicesComponent from "./components/Productos y Servicios/ABMProductServicesComponent";
import NotFoundComponent from "./components/NotFoundComponent";
import NavbarComponent from "./components/NavbarComponent";
import { Container } from "react-bootstrap";
import AM_ProductService from "./components/Productos y Servicios/AM_ProductServices";
import ABMPersonasComponent from "./components/Personas/ABMPersonasComponent";
import AM_Personas from "./components/Personas/AM_Personas";
import ABMEmpresasComponent from "./components/Empresas/ABMEmpresas";
import ToastNotification from "./components/ToastNotification";
import AM_Empresa from "./components/Empresas/AM_Empresa";
import LogIn from "./routes/LogIn";

function App() {
  return (
    <>
      <Container
        fluid
        style={{ width: "100vw", margin: 0, padding: 0 }}
        className="justify-content-center"
      >
        <ToastNotification />
        <Router>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<ABMHub />} />
            <Route exact path="/personas" element={<ABMPersonasComponent />} />
            <Route
              exact
              path="/personas/AMPersonas"
              element={<AM_Personas />}
            />
            <Route
              exact
              path="/personas/AMPersonas/:idPersona"
              element={<AM_Personas />}
            />
            <Route path="/" element={<ABMHub />} />
            <Route
              exact
              path="/clientes"
              element={/*<ABMClientesComponent />*/ null}
            />
            <Route exact path="/empresas" element={<ABMEmpresasComponent />} />
            <Route exact path="/empresas/AMEmpresas" element={<AM_Empresa />} />
            <Route
              exact
              path="/empresas/AMEmpresas/:idEnterprise"
              element={<AM_Empresa />}
            />
            <Route
              exact
              path="/usuarios"
              element={/*<ABMUsuariosComponent />*/ null}
            />
            <Route
              exact
              path="/productos"
              element={<ABMProductServicesComponent />}
            />
            <Route
              exact
              path="/productos/AMProductos"
              element={<AM_ProductService />}
            />
            <Route
              exact
              path="/productos/AMProductos/:idProdServ"
              element={<AM_ProductService />}
            />
            <Route
              exact
              path="/servicios"
              element={<ABMProductServicesComponent />}
            />
            <Route
              exact
              path="/servicios/AMServicios"
              element={<AM_ProductService />}
            />
            <Route
              exact
              path="/servicios/AMServicios/:idProdServ"
              element={<AM_ProductService />}
            />
            <Route
              exact
              path="/impuestos"
              element={/*<ABMImpuestosComponent />*/ null}
            />
            <Route
              exact
              path="/login"
              element={<LogIn/>}
            />
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
