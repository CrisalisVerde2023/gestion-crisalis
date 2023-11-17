import React, { useContext } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
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

export const AppRoutes = () => {
  const { userLogged } = useContext(UserLoggedContext);
  const { isAdmin } = userLogged;

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
      </Routes>
    </>
  );
};
