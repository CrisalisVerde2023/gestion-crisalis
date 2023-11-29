import React from "react";

export const RowPedidosCliente = ({ pedidos }) => {
  return (
    <>
      {!Boolean(pedidos.length) ? (
        <tr className="border-y dark:border-gray-700">
          <td className="p-4 text-center" colSpan={10}>
            SIN RESULTADOS
          </td>
        </tr>
      ) : (
        <>
          <tr className="border-y bg-gray-100 dark:border-gray-700">
            <td className="ps-3 p-1 text-left" colSpan={10}>
              {pedidos?.[0].cliente}
            </td>
          </tr>

          {pedidos.map((pedido, index) => (
            <tr className="border-b dark:border-gray-700" key={index}>
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
              ></th>
              <td className="px-4 py-3 text-center">{pedido.nombre}</td>
              <td className="px-4 py-3 text-center">{pedido.orden}</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`${
                    pedido.anulado
                      ? "bg-red-100 text-red-800"
                      : "bg-atlantis-100 text-atlantis-800"
                  } text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300`}
                >
                  {pedido.anulado ? "Anulado" : "Activo"}
                </span>
              </td>
              <td className="px-4 py-3 text-center">{pedido.fecha}</td>
              <td className="px-4 py-3 text-center">{pedido.cantidad}</td>
              <td className="px-4 py-3 text-center">{`$ ${pedido.costo}`}</td>
              <td className="px-4 py-3 text-center">{`$ ${
                pedido.costo * pedido.cantidad
              }`}</td>
              <td className="px-4 py-3 text-center">{`$ ${pedido.impuestosOrden}`}</td>
              <td className="px-4 py-3 text-center">{`$ ${
                pedido.impuestosOrden + pedido.subtotalOrden
              }`}</td>
            </tr>
          ))}
        </>
      )}
    </>
  );
};
