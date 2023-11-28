// @ts-nocheck
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import EditarBtn from "../UI Elements/EditarBtn";
import ToggleEstadoBtn from "../UI Elements/ToggleEstadoBtn";
import { DropdownImpuestosProductos } from "./DropdownImpuestosProductos";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import { ProductServiceType } from "../types/productServiceType";
import AgregarBtn from "../UI Elements/AgregarBtn";
import RemoverBtn from "../UI Elements/RemoverBtn";

export const RowProductos = ({
  producto,
  deleteByIdData,
  updateByIdData,
  handleSetSelected,
  seleccion = "",
}) => {
  const [formData, setFormData] = useState({ ...producto });
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const { pedido, setPedido } = useContext(UserLoggedContext);

  // Function to add an item to the pedido
  const addToPedido = (selected: ProductServiceType) => {
    // If the item doesn't exist, add it.
    if (!pedido.prods_servs.some((item) => item.id === selected.id)) {
      const updatedProdsServs = [
        ...pedido.prods_servs,
        {
          ...selected,
          cantidad: 1,
          garantia: selected.tipo === "PRODUCTO" ? 0 : null,

          descuento: null,
          garantiaCosto: selected.tipo === "PRODUCTO" ? 0 : null,
        },
      ];
      setPedido({ ...pedido, prods_servs: updatedProdsServs });
    }
  };

  // Function to remove an item from the pedido
  const removeFromPedido = (selected: ProductServiceType) => {
    // If the item already exists, filter it out to remove it.
    if (pedido.prods_servs.some((item) => item.id === selected.id)) {
      const updatedProdsServs = pedido.prods_servs.filter(
        (item) => item.id !== selected.id
      );
      setPedido({ ...pedido, prods_servs: updatedProdsServs });
    }
  };

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

  const mapIdImpuestos = (impuestos) =>
    impuestos.map((impuesto) => impuesto.id);

  const handleIdImpuestos = (newState) =>
    setFormData({ ...formData, idImpuestos: newState });

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
        <td className="px-4 py-3 text-center">
          <div className="flex space-x-1 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 overflow-auto">
            {producto.impuestos.length ? (
              producto.impuestos.map((impuesto) => {
                return (
                  <span
                    key={impuesto.id}
                    className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
                  >
                    {impuesto.nombre}
                  </span>
                );
              })
            ) : (
              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                Sin impuestos
              </span>
            )}
          </div>
        </td>
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
        {seleccion === "" && (
          <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
            <div className="flex items-center space-x-4">
              <EditarBtn fnOnClick={handleModalEdit} />
              <ToggleEstadoBtn
                fnOnClick={() => handleRemove(producto)}
                estado={producto.eliminado}
              />
            </div>
          </td>
        )}
        {seleccion === "multiple" &&
          (!pedido.prods_servs.some((item) => item.id === producto.id) ? (
            <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
              <AgregarBtn fnOnClick={() => addToPedido(producto)} />
            </td>
          ) : (
            <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
              <RemoverBtn fnOnClick={() => removeFromPedido(producto)} />
            </td>
          ))}
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
                  {`Editar ${
                    producto.tipo === "PRODUCTO" ? "producto" : "servicio"
                  } ${producto.nombre.toLowerCase()}`}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="updateProductModal"
                  onClick={() => {
                    setShowModalUpdate(false), handleSetSelected([]);
                  }}
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
                  {producto.tipo === "SERVICIO" && (
                    <div className="col-span-2 px-32">
                      <label
                        htmlFor="soporte-modal-create"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                      >
                        Mantenimiento
                      </label>
                      <input
                        value={formData.soporte}
                        onChange={handleInputChange}
                        type="text"
                        name="soporte"
                        id="soporte-modal-create"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="500"
                        required
                      />
                    </div>
                  )}

                  <DropdownImpuestosProductos
                    handleSetSelected={handleSetSelected}
                    impuestos={mapIdImpuestos(producto.impuestos)}
                    handleIdImpuestos={handleIdImpuestos}
                  />
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
