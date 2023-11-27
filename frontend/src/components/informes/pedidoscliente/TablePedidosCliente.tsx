import React, { useState } from "react";
import { RowPedidosCliente } from "./RowPedidosCliente";
import VolverBtn from "../../UI Elements/VolverBtn";
import { useInformes } from "../../../hooks/useInformes";

const HOST_API_PEDIDOS_CLIENTE = "http://localhost:8080/api/reportes/historial";

export const TablePedidosCliente = () => {
  const [search, setSearch] = useState("");
  const {
    estado: { loading, json },
    totales,
    goBack,
  } = useInformes({
    url: HOST_API_PEDIDOS_CLIENTE,
    tipoInforme: "pedidosByCliente",
  });

  const filteredPedidos = () => {
    if (search.length === 0) return json;

    const filtereds = json
      .flat()
      .filter((pedido) =>
        pedido.cliente.toLowerCase().includes(search.toLowerCase())
      );
    return [filtereds];
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
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Buscar
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Buscar cliente"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
          </div>
          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center">
                    Cliente
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Producto / Servicio
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Pedido Nro.
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Estado
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Cantidad
                  </th>
                  <th scope="col" className="px-4 py-3 text-center w-28">
                    Precio
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Importe Item
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Total impuestos
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Importe total pedido
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
                    <td colSpan={10} className="text-center p-4">
                      NO HAY DATOS
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredPedidos().map((pedidos, index) => (
                      <RowPedidosCliente pedidos={pedidos} key={index} />
                    ))}

                    <tr className="p-4 bg-gray-100">
                      <td colSpan={5} className="text-left font-bold p-4">
                        TOTAL GENERAL
                      </td>
                      <td colSpan={1} className="text-center p-4 font-semibold">
                        {totales.cantidades}
                      </td>
                      <td colSpan={1} className="text-center p-4 font-semibold">
                        {`$ ${totales.precios}`}
                      </td>
                      <td colSpan={1} className="text-center p-4 font-semibold">
                        {`$ ${totales.preciosItem}`}
                      </td>
                      <td colSpan={1} className="text-center p-4 font-semibold">
                        {`$ ${totales.totalImpuestos}`}
                      </td>
                      <td colSpan={1} className="text-center p-4 font-semibold">
                        {`$ ${totales.totalPedidos}`}
                      </td>
                    </tr>
                  </>
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
