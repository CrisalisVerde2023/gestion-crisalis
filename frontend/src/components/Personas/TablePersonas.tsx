import React, { useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import { useNavigate } from "react-router-dom";
import { RowPersonas } from "./RowPersonas";
import VolverBtn from "../UI Elements/VolverBtn";
import BuscarBar from "../UI Elements/BuscarBar";

const HOST_API_PERSONAS = "http://localhost:8080/api/personas";

export const TablePersonas = () => {
  const [search, setSearch] = useState("");
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });
  const navigate = useNavigate();
  const {
    estado: { loading, json },
    create,
    deleteByIdData,
    updateByIdData,
  } = useCrud(HOST_API_PERSONAS);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const body = {
      ...formData,
      nombre: formData.nombre,
      apellido: formData.apellido,
      dni: formData.dni,
    };
    create({ body }).then(
      setShowModalCreate(!showModalCreate),

      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
      })
    );
  };

  const filteredPersonas = () => {
    if (search.length === 0) return json;

    return json.filter(
      (persona) =>
        persona.nombre.toLowerCase().includes(search.toLowerCase()) ||
        persona.apellido.toLowerCase().includes(search.toLowerCase()) ||
        persona.dni.toLowerCase().includes(search.toLowerCase())
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800  shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            {/* Buscar */}
            <BuscarBar fnOnChange={handleSearchChange} value={search} />
            {/* Botones */}
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                id="createProductModalButton"
                data-modal-target="createProductModal"
                data-modal-toggle="createProductModal"
                className="flex items-center justify-center text-white bg-denim hover:bg-denim-400 tracking-wide transition ease-in-out duration-150 cursor-not-allowed focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                onClick={() => setShowModalCreate(!showModalCreate)}
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Crear persona
              </button>
            </div>
          </div>
          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center">
                    Nombre
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Apellido
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Dni
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Estado
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                    </tr>
                  </>
                ) : !Boolean(json.length) ? (
                  <tr className="p-4">
                    <td colSpan={5} className="text-center p-4">
                      NO HAY DATOS
                    </td>
                  </tr>
                ) : (
                  filteredPersonas().map((persona) => (
                    <RowPersonas
                      persona={persona}
                      key={persona.id}
                      deleteByIdData={deleteByIdData}
                      updateByIdData={updateByIdData}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Tabla footer paginacion */}
          {/* <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav> */}
        </div>

        <div className="flex justify-center items-center mt-3">
          <div className="flex justify-evenly w-1/2 mx-2">
            <VolverBtn fnOnClick={goBack} />
          </div>
        </div>
      </div>

      {showModalCreate && (
        <div
          id="createProductModal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex backdrop-blur-sm backdrop-brightness-75"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow-2xl drop-shadow-2xl dark:bg-gray-800 sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Crear persona
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-target="createProductModal"
                  data-modal-toggle="createProductModal"
                  onClick={() => setShowModalCreate(false)}
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
              {/* <!-- Modal body --> */}
              <form>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nombre-modal-create"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                    >
                      Nombre
                    </label>
                    <input
                      value={formData.nombre}
                      onChange={handleOnChange}
                      type="text"
                      name="nombre"
                      id="nombre-modal-create"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Juan"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="apellido-modal-create"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                    >
                      Apellido
                    </label>
                    <input
                      value={formData.apellido}
                      onChange={handleOnChange}
                      type="text"
                      name="apellido"
                      id="apellido-modal-create"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Gonzalez"
                      required
                    />
                  </div>
                  <div className="col-span-2 px-32">
                    <label
                      htmlFor="dni-modal-create"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                    >
                      Dni
                    </label>
                    <input
                      value={formData.dni}
                      onChange={handleOnChange}
                      type="text"
                      name="dni"
                      id="dni-modal-create"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="30123123"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-denim hover:bg-denim-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleCreate}
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Agregar nueva persona
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
