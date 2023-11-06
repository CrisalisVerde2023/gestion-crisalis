import React, { useState } from "react";
import Swal from "sweetalert2";

export const RowImpuestos = ({ impuesto, patchData }) => {
  const handleRemove = (e) => {
    const dataId = e.target.getAttribute("data-id");

    Swal.fire({
      title: "Confirmar cambio de estado de usuario?",
      text: `Esta por ${impuesto.eliminado ? "activar" : "desactivar"} a ${
        impuesto.nombre
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí! Estoy seguro.",
      cancelButtonText: "Mejor no.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) patchData({ id: dataId });
    });
  };

  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
        >
          {impuesto.nombre}
        </th>
        <td className="px-4 py-3 text-center">{impuesto.porcentaje}</td>
        <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              data-drawer-target="drawer-update-product"
              data-drawer-show="drawer-update-product"
              aria-controls="drawer-update-product"
              className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-500 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 -ml-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
              Editar
            </button>
            {impuesto.eliminado ? (
              <button
                type="button"
                data-id={impuesto.id}
                data-modal-target="delete-modal"
                data-modal-toggle="delete-modal"
                className="flex items-center text-atlantis-700 hover:text-white border border-atlantis-700 hover:bg-atlantis-600 focus:ring-4 focus:outline-none focus:ring-atlantis-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-atlantis-500 dark:text-atlantis-500 dark:hover:text-white dark:hover:bg-atlantis-600 dark:focus:ring-atlantis-900"
                onClick={handleRemove}
              >
                <svg
                  className="h-4 w-4 mr-2 -ml-0.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                Activar
              </button>
            ) : (
              <button
                type="button"
                data-id={impuesto.id}
                data-modal-target="delete-modal"
                data-modal-toggle="delete-modal"
                className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={handleRemove}
              >
                <svg
                  className="h-4 w-4 mr-2 -ml-0.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                Desactivar
              </button>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};
