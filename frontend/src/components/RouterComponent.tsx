import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavbarComponent from "./../components/NavbarComponent";
import ABMHub from "./ABMHub";
import ABMProductServicesComponent from "./../components/Productos y Servicios/ABMProductServicesComponent";
import NotFoundComponent from "./../components/NotFoundComponent";
import AM_ProductService from "./../components/Productos y Servicios/AM_ProductServices";
import ABMPersonasComponent from "./../components/Personas/ABMPersonasComponent";
import AM_Personas from "./../components/Personas/AM_Personas";
import ABMEmpresasComponent from "./../components/Empresas/ABMEmpresas";
import AM_Empresa from "./../components/Empresas/AM_Empresa";
import LogIn from "./../routes/LogIn";
import { UserLoginContext } from "../contexts/UserLoginContext";

export default function RouterComponent() {
  const { userLogged } = useContext(UserLoginContext);
  return (
    <Router>
      {userLogged.id !== -1 && userLogged.email !== "" && <NavbarComponent />}
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFoundComponent />} />
        {userLogged.id !== -1 && userLogged.email !== "" && (
          <>
            <Route path="/" element={<ABMHub />} />
            <Route path="/personas" element={<ABMPersonasComponent />} />
            <Route path="/personas/AMPersonas" element={<AM_Personas />} />
            <Route
              path="/personas/AMPersonas/:idPersona"
              element={<AM_Personas />}
            />
            <Route path="/" element={<ABMHub />} />
            <Route
              path="/clientes"
              element={/*<ABMClientesComponent />*/ null}
            />
            <Route path="/empresas" element={<ABMEmpresasComponent />} />
            <Route path="/empresas/AMEmpresas" element={<AM_Empresa />} />
            <Route
              path="/empresas/AMEmpresas/:idEnterprise"
              element={<AM_Empresa />}
            />
            <Route
              path="/usuarios"
              element={/*<ABMUsuariosComponent />*/ null}
            />
            <Route
              path="/productos"
              element={<ABMProductServicesComponent />}
            />
            <Route
              path="/productos/AMProductos"
              element={<AM_ProductService />}
            />
            <Route
              path="/productos/AMProductos/:idProdServ"
              element={<AM_ProductService />}
            />
            <Route
              path="/servicios"
              element={<ABMProductServicesComponent />}
            />
            <Route
              path="/servicios/AMServicios"
              element={<AM_ProductService />}
            />
            <Route
              path="/servicios/AMServicios/:idProdServ"
              element={<AM_ProductService />}
            />
            <Route
              path="/impuestos"
              element={/*<ABMImpuestosComponent />*/ null}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}
