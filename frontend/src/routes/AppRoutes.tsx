import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ABMPersonasComponent from "../components/Personas/ABMPersonasComponent";
import AM_Personas from "../components/Personas/AM_Personas";
import ABMEmpresasComponent from "../components/Empresas/ABMEmpresas";
import AM_Empresa from "../components/Empresas/AM_Empresa";
import ABMUsuariosComponent from "../components/Usuarios/ABMUsuariosComponent";
import AM_Usuarios from "../components/Usuarios/AM_Usuarios";
import ABMProductServicesComponent from "../components/Productos y Servicios/ABMProductServicesComponent";
import AM_ProductService from "../components/Productos y Servicios/AM_ProductServices";
import NotFoundComponent from "../components/NotFoundComponent";

export const AppRoutes = () => {
  return (
    <>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/personas" element={<ABMPersonasComponent />} />
        <Route path="/personas/AMPersonas" element={<AM_Personas />} />
        <Route
          path="/personas/AMPersonas/:idPersona"
          element={<AM_Personas />}
        />
        <Route path="/clientes" element={/*<ABMClientesComponent />*/ null} />
        <Route path="/empresas" element={<ABMEmpresasComponent />} />
        <Route path="/empresas/AMEmpresas" element={<AM_Empresa />} />
        <Route
          path="/empresas/AMEmpresas/:idEnterprise"
          element={<AM_Empresa />}
        />

        <Route path="/usuarios" element={<ABMUsuariosComponent />} />
        <Route path="/usuarios/AMUsuarios" element={<AM_Usuarios />} />
        <Route
          path="/usuarios/AMUsuarios/:idUsuario"
          element={<AM_Usuarios />}
        />
        <Route path="/productos" element={<ABMProductServicesComponent />} />
        <Route path="/productos/AMProductos" element={<AM_ProductService />} />
        <Route
          path="/productos/AMProductos/:idProdServ"
          element={<AM_ProductService />}
        />
        <Route path="/servicios" element={<ABMProductServicesComponent />} />
        <Route path="/servicios/AMServicios" element={<AM_ProductService />} />
        <Route
          path="/servicios/AMServicios/:idProdServ"
          element={<AM_ProductService />}
        />
        <Route path="/impuestos" element={/*<ABMImpuestosComponent />*/ null} />
        <Route path="/*" element={<NotFoundComponent />} />
      </Routes>
    </>
  );
};
