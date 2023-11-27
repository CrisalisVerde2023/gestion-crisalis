import React, { useContext, useEffect, useState } from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { defaultUserLogState } from "../components/types/UserLogged";
import jsonMock from "../mocks/pedidos-cliente-servicio-producto.json";

const defaultUseInformes = {
  json: null,
  loading: true,
  hasError: false,
};

export const useInformes = ({ url, tipoInforme }) => {
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);
  const [estado, setEstado] = useState(defaultUseInformes);
  const navigate = useNavigate();
  const token = userLogged.token;
  const [totales, setTotales] = useState({
    cantidades: null,
    precios: null,
    preciosItem: null,
    totalImpuestos: null,
    totalPedidos: null,
  });

  useEffect(() => {
    tipoInforme === "pedidosByCliente" && getPedidosByCliente();
  }, []);

  const getPedidosByCliente = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        if (response.status === 401) {
          Swal.fire("Sesión expirada", "Será redirigido al login.", "error");
          setUserLogged(defaultUserLogState);
          navigate("/login");
        }

        if (
          response.status === 400 ||
          (response.status > 401 && response.status < 500)
        ) {
          throw new Error(
            `Hubo un error con la petición: ${response.status}: ${response.statusText}`
          );
        }

        if (response.status > 499) {
          throw new Error(
            `Hubo un error con el servidor: ${response.status}: ${response.statusText}`
          );
        }

        setEstado({ ...estado, hasError: true });
        return;
      }

      const totales = json.reduce((acc, pedidoAct) => {
        acc.cantidades = (acc.cantidades || 0) + pedidoAct.cantidad;
        acc.precios = (acc.precios || 0) + pedidoAct.costo;
        acc.preciosItem =
          (acc.preciosItem || 0) + pedidoAct.costo * pedidoAct.cantidad;
        acc.totalImpuestos = (acc.totalImpuestos || 0) + pedidoAct.impuesto;
        acc.totalPedidos =
          (acc.totalPedidos || 0) +
          (pedidoAct.costo * pedidoAct.cantidad + pedidoAct.impuesto);
        return acc;
      }, {});

      const groupByClientes = Object.groupBy(json, ({ cliente }) => cliente);
      const pedidos = Object.values(groupByClientes);

      setEstado({
        json: pedidos,
        loading: false,
        hasError: false,
      });
      setTotales(totales);
    } catch (error) {
      Swal.fire("Atención!", "Error al consultar", "warning");
      setEstado({ ...estado, hasError: true });
      throw new Error(
        `Ocurrió un error: "${error.name}" con codigo: "${error.code}" y mensaje: "${error.message}" al hacer la peticion a "${error.config.url}"`
      );
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    estado,
    totales,
    getPedidosByCliente,
    goBack,
  };
};
