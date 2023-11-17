import React from "react";
import Swal from "sweetalert2";

export const RowSuscripciones = ({ suscripcion, deleteByIdData }) => {
  const handleRemove = () => {
    Swal.fire({
      title: "Confirmar cambio de estado de usuario?",
      text: `Esta por ${suscripcion.estado ? "activar" : "desactivar"} a ${
        suscripcion.nombre
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí! Estoy seguro.",
      cancelButtonText: "Mejor no.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) deleteByIdData({ id: suscripcion.id });
    });
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
      >
        {suscripcion.fecha}
      </th>
      <td className="px-4 py-3 text-center">{suscripcion.persona}</td>
      <td className="px-4 py-3 text-center">{suscripcion.empresa}</td>
      <td className="px-4 py-3 text-center">{suscripcion.servicio}</td>
      <td className="px-4 py-3 text-center">
        <span
          className={`${
            suscripcion.estado
              ? "bg-atlantis-100 text-atlantis-800"
              : "bg-red-100 text-red-800"
          } text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300`}
        >
          {suscripcion.estado ? "Activo" : "Inactivo"}
        </span>
      </td>
      <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRemove}
            className={`${
              suscripcion.estado
                ? "flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                : "flex items-center text-atlantis-700 hover:text-white border border-atlantis-700 hover:bg-atlantis-600 focus:ring-4 focus:outline-none focus:ring-atlantis-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-atlantis-500 dark:text-atlantis-500 dark:hover:text-white dark:hover:bg-atlantis-600 dark:focus:ring-atlantis-900"
            }`}
          >
            {suscripcion.estado ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 dark:text-white pr-0.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <p className="pl-1">Desactivar</p>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 dark:text-white pr-0.5"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <p className="pl-1">Activar</p>
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};
