import React, { useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import { useNavigate } from "react-router-dom";
import { RowSuscripciones } from "./RowSuscripciones";
import VolverBtn from "../UI Elements/VolverBtn";
import BuscarBar from "../UI Elements/BuscarBar";

const HOST_API_SUSCRIPCIONES = "http://localhost:8080/api/suscripciones";

export const TableSuscripciones = () => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const {
    estado: { loading, json },
    deleteByIdData,
  } = useCrud(HOST_API_SUSCRIPCIONES);

  const cleanByEstado = (json) => {
    return json.map((suscripcion) => suscripcion.estado);
  };

  const filteredSuscripciones = () => {
    if (search.length === 0) return json;

    return json.filter(
      (suscripcion) =>
        suscripcion.persona.toLowerCase().includes(search.toLowerCase()) ||
        suscripcion.empresa.toLowerCase().includes(search.toLowerCase()) ||
        suscripcion.servicio.toLowerCase().includes(search.toLowerCase()) ||
        (search === "EMPRESA"
          ? suscripcion.empresa !== ""
          : search === "PERSONA"
          ? suscripcion.empresa === ""
          : "")
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
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 mx-0">
              <div className="flex flex-col items-center w-full md:w-auto">
                <button
                  id="actionsDropdownButton"
                  data-dropdown-toggle="actionsDropdown"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                  onClick={() => {
                    setShowDropdown(!showDropdown), setSearch("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-4 w-4 mr-2 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tipo
                  <svg
                    className="-mr-1 ml-1.5 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
                {showDropdown && (
                  <div
                    id="actionsDropdown"
                    className="origin-top-right fixed mt-[40px] z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="actionsDropdownButton"
                    >
                      <li
                        className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        data-value="PERSONA"
                        onClick={(e) => {
                          setShowDropdown(!showDropdown),
                            setSearch(e.target.getAttribute("data-value"));
                        }}
                      >
                        Persona
                      </li>
                      <li
                        className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        data-value="EMPRESA"
                        onClick={(e) => {
                          setShowDropdown(!showDropdown),
                            setSearch(e.target.getAttribute("data-value"));
                        }}
                      >
                        Empresa
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Persona
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Empresa
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Servicio
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
                      <td className="px-4 py-3">
                        <div className="h-11 mx-4 bg-slate-300 rounded-xl"></div>
                      </td>
                    </tr>
                  </>
                ) : !Boolean(json.length) ? (
                  <tr className="p-4">
                    <td colSpan={6} className="text-center p-4">
                      NO HAY DATOS
                    </td>
                  </tr>
                ) : (
                  filteredSuscripciones().map((suscripcion) => (
                    <RowSuscripciones
                      suscripcion={suscripcion}
                      key={suscripcion.id}
                      deleteByIdData={deleteByIdData}
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
    </section>
  );
};
