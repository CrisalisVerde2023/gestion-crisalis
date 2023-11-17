import React, { useState } from "react";
import { useCrud } from "../../hooks/useCrud";

export const DropdownSearch = ({ url }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    estado: { json, loading },
  } = useCrud(url);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div>
        <label
          htmlFor="seleccionados-modal-create"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
        >
          Impuestos seleccionados
        </label>
        <input
          type="text"
          name="seleccionados"
          id="seleccionados-modal-create"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          required
          readOnly
        />
      </div>
      <button
        id="filterDropdownButton"
        data-dropdown-toggle="filterDropdown"
        className="mx-52 flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
        onClick={toggleDropdown}
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
          id="filterDropdown"
          className="z-10 fixed self-center -bottom-11 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
        >
          {/* <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </h6> */}
          <div className="pb-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="block w-full py-2 pl-8  ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Busqueda"
              />
            </div>
          </div>
          <ul
            className="space-y-2 text-sm"
            aria-labelledby="filterDropdownButton"
          >
            {!loading &&
              json.map((entidad) => (
                <li key={entidad.id} className="flex items-center">
                  <input
                    id={entidad.id}
                    type="checkbox"
                    value={entidad.id}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={entidad.id}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {`${entidad.nombre} ${entidad.porcentaje}%`}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};
