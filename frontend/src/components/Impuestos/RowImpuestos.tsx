import React, { useState } from "react";
import Swal from "sweetalert2";

export const RowImpuestos = ({ impuesto, deleteByIdData, updateByIdData }) => {
  const [formData, setFormData] = useState({ ...impuesto });
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const handleModalEdit = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const dataId = e.target.getAttribute("data-id");
    const body = { ...formData, porcentaje: Number(formData.porcentaje) };
    updateByIdData({ id: dataId, body }).then(handleModalEdit());
  };

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
      if (result.isConfirmed) deleteByIdData({ id: dataId });
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
              className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-500 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={handleModalEdit}
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                Desactivar
              </button>
            )}
          </div>
        </td>
      </tr>
      {showModalUpdate && (
        /* <!-- Update modal --> */
        <div
          id="updateProductModal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex backdrop-blur-sm shadow-2xl drop-shadow-2xl backdrop-brightness-75"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* <!-- Modal header -->  */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Editar impuesto ${impuesto.nombre}`}
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
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Impuesto
                    </label>
                    <input
                      type="text"
                      name="nombre-modal-update"
                      id="nombre-modal-update"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="IVA"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="porcentaje-modal-update"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Porcentaje
                    </label>
                    <input
                      type="text"
                      name="porcentaje-modal-update"
                      id="porcentaje-modal-update"
                      value={formData.porcentaje}
                      onChange={(e) =>
                        setFormData({ ...formData, porcentaje: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="21.0"
                    />
                  </div>
                  {/* <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      value="399"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$299"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="">Electronics</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="5"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a description..."
                    >
                      Standard glass, 3.8GHz 8-core 10th-generation Intel Core
                      i7 processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4
                      memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB
                      SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic
                      Keyboard - US
                    </textarea>
                  </div> */}
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-denim hover:bg-denim-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    data-id={impuesto.id}
                    onClick={handleEdit}
                  >
                    Actualizar impuesto
                  </button>
                  {/* <button
                    type="button"
                    className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <svg
                      className="mr-1 -ml-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
