import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import NotFoundComponent from "../components/NotFoundComponent";
import { AuthRoute } from "./AuthRoute";
import ABMClientesComponent from "../components/Clientes/ABMClientes";
import AM_Clientes from "../components/Clientes/AM_Clientes";
import AM_Pedidos from "../components/Pedidos/AM_Pedidos";
import ABMPedidos from "../components/Pedidos/ABMPedidos";
import { TableImpuestos } from "../components/Impuestos/TableImpuestos";
import { TablePersonas } from "../components/Personas/TablePersonas";
import { TableUsuarios } from "../components/Usuarios/TableUsuarios";
import { TableEmpresas } from "../components/Empresas/TableEmpresas";
import { TableSuscripciones } from "../components/Suscripciones/TableSuscripciones";
import { TableProductos } from "../components/Productos y Servicios/TableProductos";
import { TablePedidosCliente } from "../components/informes/pedidoscliente/TablePedidosCliente";
import { TableDescuentosTotales } from "../components/informes/descuentosTotales/TableDescuentosTotales";
import { TablePedidoMayorDescuento } from "../components/informes/pedidoMayorDescuento/TablePedidoMayorDescuento";


export const AppRoutes = () => {
  return (
    <>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/personas" element={<TablePersonas />} />
        <Route path="/clientes" element={<ABMClientesComponent />} />
        <Route path="/empresas" element={<TableEmpresas />} />
        <Route path="/suscripciones" element={<TableSuscripciones />} />
        <Route
          path="/pedidos/clientes/productos"
          element={<TablePedidosCliente />}
        />
        <Route
          path="/informes/descuentosTotales"
          element={<TableDescuentosTotales />}
        />
        <Route
          path="/informes/pedidoMayorDescuento"
          element={<TablePedidoMayorDescuento />}
        />
        <Route
          path="/clientes/AMClientes/:idCliente"
          element={<AM_Clientes />}
        />

        <Route element={<AuthRoute />}>
          <Route path="/usuarios" element={<TableUsuarios />} />
          <Route path="/impuestos" element={<TableImpuestos />} />
          <Route path="/productosyservicios" element={<TableProductos />} />
        </Route>

        <Route path="/altaPedido" element={<AM_Pedidos />} />
        <Route path="/pedidos" element={<ABMPedidos />} />
        <Route path="/error" element={<NotFoundComponent />} />
        <Route path="/*" element={<NotFoundComponent />} />
      </Routes>
    </>
  );
};
