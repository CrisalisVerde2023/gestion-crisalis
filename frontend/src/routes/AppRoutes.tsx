import React, { useContext } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { AuthRoute } from "./AuthRoute";
import ABMClientesComponent from "../components/Clientes/ABMClientes";
import AM_Clientes from "../components/Clientes/AM_Clientes";
import AM_Pedidos from "../components/Pedidos/AM_Pedidos";
import ABMPedidos from "../components/Pedidos/ABMPedidos";
import { TableImpuestos } from "../components/Impuestos/TableImpuestos";
import { TablePersonas } from "../components/Personas/TablePersonas";
import { TableUsuarios } from "../components/Usuarios/TableUsuarios";
import { TableEmpresas } from "../components/Empresas/TableEmpresas";
import { TableProductos } from "../components/Productos/TableProductos";
import { TableSuscripciones } from "../components/Suscripciones/TableSuscripciones";

export const AppRoutes = () => {
  const { userLogged } = useContext(UserLoggedContext);
  const { isAdmin } = userLogged;

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/personas" element={<TablePersonas />} />
        <Route path="/clientes" element={<ABMClientesComponent />} />
        <Route
          path="/clientes/AMClientes/:idCliente"
          element={<AM_Clientes />}
        />
        <Route path="/empresas" element={<TableEmpresas />} />

        <Route element={<AuthRoute />}>
          <Route path="/usuarios" element={<TableUsuarios />} />
          <Route path="/impuestos" element={<TableImpuestos />} />

          <Route
            path="/productosyservicios"
            element={<ABMProductServicesComponent />}
          />
          <Route
            path="/productosyservicios/AMProductos"
            element={<AM_ProductService />}
          />
          <Route
            path="/productosyservicios/AMProductos/:idProdServ"
            element={<AM_ProductService />}
          />
          <Route
            path="/productosyservicios"
            element={<ABMProductServicesComponent />}
          />
          <Route
            path="/productosyservicios/AMProductos"
            element={<AM_ProductService />}
          />
          <Route
            path="/productosyservicios/AMProductos/:idProdServ"
            element={<AM_ProductService />}
          />
          <Route
            path="/productosyservicios/AMServicios"
            element={<AM_ProductService />}
          />
          <Route
            path="/productosyservicios/AMServicios/:idProdServ"
            element={<AM_ProductService />}
          />
        </Route>

        <Route path="/altaPedido" element={<AM_Pedidos />} />
        <Route path="/pedidos" element={<ABMPedidos />} />
        <Route path="/error" element={<NotFoundComponent />} />
        <Route path="/*" element={<NotFoundComponent />} />
        <Route path="/suscripciones" element={<TableSuscripciones />} />
      </Routes>
    </>
  );
};
