import React, { useState } from "react";
import Swal from "sweetalert2";
import EditarBtn from "../UI Elements/EditarBtn";
import ToggleEstadoBtn from "../UI Elements/ToggleEstadoBtn";

export const RowProductos = ({ producto, deleteByIdData, updateByIdData }) => {
  const [formData, setFormData] = useState({ ...producto });
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
      id: formData.id,
      tipo: formData.tipo,
      nombre: formData.nombre,
      costo: formData.costo,
      soporte: formData.soporte,
      idImpuestos: formData.idImpuestos,
    };
    updateByIdData({ id: dataId, body }).then(handleModalEdit());
  };

  const handleRemove = (producto) => {
    Swal.fire({
      title: "Confirmar cambio de estado de usuario?",
      text: `Esta por ${producto.eliminado ? "activar" : "desactivar"} a ${
        producto.nombre
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí! Estoy seguro.",
      cancelButtonText: "Mejor no.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) deleteByIdData({ id: producto.id });
    });
  };

  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
        >
          {producto.nombre}
        </th>
        <td className="px-4 py-3 text-center">{producto.tipo}</td>
        <td className="px-4 py-3 text-center">{producto.costo}</td>
        <td className="px-4 py-3 text-center">{producto.soporte}</td>
        <td className="px-4 py-3 text-center">{producto.idImpuestos}</td>
        <td className="px-4 py-3 text-center">
          <span
            className={`${
              producto.eliminado
                ? "bg-red-100 text-red-800"
                : "bg-atlantis-100 text-atlantis-800"
            } text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300`}
          >
            {producto.eliminado ? "Inactivo" : "Activo"}
          </span>
        </td>
        <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
          <div className="flex items-center space-x-4">
            <EditarBtn fnOnClick={handleModalEdit} />
            <ToggleEstadoBtn
              fnOnClick={() => handleRemove(producto)}
              estado={producto.eliminado}
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
                  {`Editar producto ${producto.nombre}`}
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
                      placeholder="Televisor"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="costo-modal-update"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                    >
                      Costo
                    </label>
                    <input
                      type="text"
                      name="costo"
                      id="costo-modal-update"
                      value={formData.costo}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="1000"
                    />
                  </div>
                  <div>
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
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-denim hover:bg-denim-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    data-id={producto.id}
                    onClick={handleEdit}
                  >
                    Actualizar producto
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
