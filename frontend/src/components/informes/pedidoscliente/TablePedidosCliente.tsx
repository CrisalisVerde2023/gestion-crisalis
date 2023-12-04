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
    <section className="p-3 antialiased bg-gray-50 dark:bg-gray-900 sm:p-5">
      <div className="max-w-screen-xl px-4 mx-auto lg:px-12">
        <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
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
                    className="block w-full py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mx-4 h-11 bg-slate-300 rounded-xl"></div>
                      </td>
                    </tr>
                  </>
                ) : !Boolean(json.length) ? (
                  <tr className="p-4">
                    <td colSpan={10} className="p-4 text-center">
                      NO HAY DATOS
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredPedidos().map((pedidos, index) => (
                      <RowPedidosCliente pedidos={pedidos} key={index} />
                    ))}

                    <tr className="p-4 bg-gray-100">
                      <td colSpan={5} className="p-4 font-bold text-left">
                        TOTAL GENERAL
                      </td>
                      <td colSpan={1} className="p-4 font-semibold text-center">
                        {totales.cantidades}
                      </td>
                      <td colSpan={1} className="p-4 font-semibold text-center">
                        {`$ ${(totales.precios || 0).toFixed(2)}`}
                      </td>
                      <td colSpan={1} className="p-4 font-semibold text-center">
                        {`$ ${(totales.preciosItem || 0).toFixed(2)}`}
                      </td>
                      <td colSpan={1} className="p-4 font-semibold text-center">
                        {`$ ${(totales.totalImpuestos || 0).toFixed(2)}`}
                      </td>
                      <td colSpan={1} className="p-4 font-semibold text-center">
                        {`$ ${(totales.totalPedidos || 0).toFixed(2)}`}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Tabla footer paginacion */}
          {/* <nav
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
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
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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

        <div className="flex items-center justify-center mt-3">
          <div className="flex w-1/2 mx-2 justify-evenly">
            <VolverBtn fnOnClick={goBack} />
          </div>
        </div>
      </div>
    </section>
  );
};
