import React, { useContext, useEffect } from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";

export default function SelectedClient() {
  const { pedido } = useContext(UserLoggedContext);

  useEffect(() => {
    console.log(pedido);
  }, [pedido]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div
        className={`bg-white dark:bg-gray-800 ${
          pedido.cliente.id !== -1 && `shadow-md`
        } sm:rounded-lg overflow-hidden`}
      >
        {!pedido.cliente || pedido.cliente.id < 0 ? (
          <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <p className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
              <strong>No hay Cliente seleccionado...</strong>
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 text-center">Persona</th>
                  {pedido.cliente.empresa !== null && (
                    <th className="px-4 py-3 text-center">Empresa</th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{`${pedido.cliente.persona.nombre} ${pedido.cliente.persona.apellido}`}</td>
                  {pedido.cliente.empresa && (
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {pedido.cliente.empresa.nombre}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
