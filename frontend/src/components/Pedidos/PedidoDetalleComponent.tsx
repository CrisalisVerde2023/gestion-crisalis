// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import VolverBtn from "../UI Elements/VolverBtn";

const HOST_API_DETALLEPEDIDOS = "http://localhost:8080/api/orden/";

function PedidoDetalleComponent() {
  const { idPedido } = useParams<{ idPedido: string }>();
  const idToModify = idPedido ? parseInt(idPedido, 10) : undefined;
  const urlToFetchData = `${HOST_API_DETALLEPEDIDOS}${idToModify}`;
  const {
    estado: { loading, json },
    goBack,
  } = useCrud(urlToFetchData);
  const [ordenDetalles, setOrdenDetalles] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    if (!loading && json) {
      const firstEntry = json[0] || {};
      setOrdenDetalles(firstEntry.ordenDetalles || []);
      setOrderInfo(firstEntry);
    }
  }, [loading, json]);

  // Check if the necessary data is available before trying to access it
  if (loading || !orderInfo) {
    return <div>Loading...</div>; // Replace with your loading component or indicator
  }

  return (
    <div className="flex justify-content-center flex-column align-items-center mx-4 mt-2 max-w-screen-xl p-3 bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
      <div className="flex flex-column py-2">
        <h2 className="text-xl font-bold">Orden N: {orderInfo?.id}</h2>
        <h2 className="text-md font-bold mt-1">
          {orderInfo?.anulado ? "Anulada" : "Activa"}
        </h2>
      </div>
      <div className="flex flex-row justify-content-between w-80">
        {orderInfo?.cliente?.empresa ? (
          <div className="flex flex-column py-2">
            <h3 className="text-md font-bold">Empresa:</h3>
            <h3 className="text-md">{orderInfo.cliente.empresa.nombre}</h3>
            <h3 className="text-md">CUIT: {orderInfo.cliente.empresa.cuit}</h3>
          </div>
        ) : (
          <div className="flex flex-column py-2">
            <h3 className="text-md font-bold">Cliente:</h3>
            <h3>
              {orderInfo.cliente.persona.nombre}{" "}
              {orderInfo.cliente.persona.apellido}
            </h3>
          </div>
        )}
        <div className="flex flex-column py-2">
          <h3 className="text-md font-bold">Persona:</h3>
          <h3 className="text-md">
            {orderInfo.cliente.persona.nombre}{" "}
            {orderInfo.cliente.persona.apellido}
          </h3>
          <h3 className="text-md">DNI: {orderInfo.cliente.persona.dni}</h3>
        </div>
      </div>
      <div className="overflow-x-auto py-2">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">Nombre</th>
              <th className="px-4 py-2 border-b border-gray-300">Tipo</th>
              <th className="px-4 py-2 border-b border-gray-300">Cantidad</th>
              <th className="px-4 py-2 border-b border-gray-300">Costo</th>
              <th className="px-4 py-2 border-b border-gray-300">Descuento</th>
              <th className="px-4 py-2 border-b border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {ordenDetalles.map((detalle, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 border border-gray-300">
                  {detalle.productoServicio.nombre}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {detalle.productoServicio.tipo}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {detalle.cantidad}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {detalle.costo.toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {detalle.descuento ? detalle.descuento.toFixed(2) : "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {(
                    detalle.cantidad * detalle.costo -
                    (detalle.descuento || 0)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-2">
        <VolverBtn fnOnClick={goBack} />
      </div>
    </div>
  );
}

export default PedidoDetalleComponent;
