import React, { useState } from "react";
import Swal from "sweetalert2";
import EditarBtn from "../UI Elements/EditarBtn";
import ToggleEstadoBtn from "../UI Elements/ToggleEstadoBtn";

export const RowPersonas = ({ persona, deleteByIdData, updateByIdData }) => {
  const [formData, setFormData] = useState({ ...persona });
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const handleModalEdit = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const dataId = e.target.getAttribute("data-id");
    const body = {
      ...formData,
      nombre: formData.nombre,
      apellido: formData.apellido,
      dni: formData.dni,
    };
    updateByIdData({ id: dataId, body }).then(handleModalEdit());
  };

  const handleRemove = (persona) => {
    Swal.fire({
      title: "Confirmar cambio de estado de usuario?",
      text: `Esta por ${persona.eliminado ? "activar" : "desactivar"} a ${
        persona.nombre
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí! Estoy seguro.",
      cancelButtonText: "Mejor no.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) deleteByIdData({ id: persona.id });
    });
  };

  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
        >
          {persona.nombre}
        </th>
        <td className="px-4 py-3 text-center">{persona.apellido}</td>
        <td className="px-4 py-3 text-center">{persona.dni}</td>
        <td className="px-4 py-3 text-center">
          <span
            className={`${
              persona.eliminado
                ? "bg-red-100 text-red-800"
                : "bg-atlantis-100 text-atlantis-800"
            } text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300`}
          >
            {persona.eliminado ? "Inactivo" : "Activo"}
          </span>
        </td>
        <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
          <div className="flex items-center space-x-4">
            <EditarBtn fnOnClick={handleModalEdit} />
            <ToggleEstadoBtn
              fnOnClick={() => handleRemove(persona)}
              estado={persona.eliminado}
            />
          </div>
        </td>
      </tr>
      {showModalUpdate && (
        /* <!-- Update modal --> */
        <tr
          id="updateProductModal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex backdrop-blur-sm shadow-2xl drop-shadow-2xl backdrop-brightness-75"
        >
          <td className="relative p-4 w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* <!-- Modal header -->  */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Editar persona ${persona.nombre}`}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="updateProductModal"
                  onClick={() => setShowModalUpdate(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body -->  */}
              <form>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nombre-modal-update"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre-modal-update"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Juan"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="apellido-modal-update"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      id="apellido-modal-update"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Gonzalez"
                    />
                  </div>
                  <div className="col-span-2 px-32">
                    <label
                      htmlFor="dni-modal-update"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                    >
                      Dni
                    </label>
                    <input
                      type="text"
                      name="dni"
                      id="dni-modal-update"
                      value={formData.dni}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="30123123"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-denim hover:bg-denim-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    data-id={persona.id}
                    onClick={handleEdit}
                  >
                    Actualizar persona
                  </button>
                </div>
              </form>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
