import React, { useEffect, useState } from "react";
import VolverBtn from "../../UI Elements/VolverBtn";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../../../contexts/UserLoggedContext";
import { defaultUserLogState } from "../../types/UserLogged";
import { useContext } from "react";
import { FilaDescuento } from "../../types/FilaDescuento";

const HOST_API_PEDIDOS_DESCUENTOS = `${
  import.meta.env.VITE_URL_HOST_API
}/reportes/descuentosPedidos`;

export const TableDescuentosTotales = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState<FilaDescuento[]>([]);
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);
  const token = userLogged.token;
  let clientePrevio: string;
  let cantidadRegistros: number = 0;
  let total: number = 0;
  let cantidadTotal: number = 0;
  let descuentoTotal: number = 0;

  useEffect(() => {
    fetch(HOST_API_PEDIDOS_DESCUENTOS, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setDatos(data))
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  return (
    <section className="p-3 antialiased bg-gray-50 dark:bg-gray-900 sm:p-5">
      <div className="max-w-screen-xl px-4 mx-auto lg:px-12">
        <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="overflow-x-auto">
            {datos.length ? (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left">
                      Cliente
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Servicio
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Fecha
                    </th>
                    <th scope="col" className="px-4 py-3 text-center w-28">
                      Descuento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datos
                    .concat({
                      cliente: "",
                      servicio: "",
                      fecha: "",
                      descuento: 0,
                    })
                    .map((el, idx) => {
                      cantidadRegistros++;
                      cantidadTotal++;
                      total += el.descuento;
                      descuentoTotal += el.descuento;

                      return (
                        <React.Fragment key={idx}>
                          {clientePrevio != el.cliente && (
                            <>
                              {clientePrevio != undefined && (
                                <tr className="border-b dark:border-gray-700">
                                  <td
                                    colSpan={1}
                                    className="p-4 font-semibold text-left"
                                  >
                                    Total {clientePrevio}:
                                  </td>
                                  <td
                                    colSpan={1}
                                    className="p-4 font-semibold text-center"
                                  >
                                    {cantidadRegistros -
                                      2 +
                                      (cantidadRegistros = 1)}
                                  </td>
                                  <td
                                    colSpan={3}
                                    className="p-4 font-semibold text-right"
                                  >
                                    ${" "}
                                    {(
                                      total -
                                      el.descuento * 2 +
                                      (total = el.descuento)
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              )}
                              {el.cliente != "" ? (
                                <tr className="bg-gray-100 border-y dark:border-gray-700">
                                  <td
                                    className="p-1 text-left ps-3"
                                    colSpan={4}
                                  >
                                    {(clientePrevio = el.cliente)}
                                  </td>
                                </tr>
                              ) : (
                                <tr className="border-b dark:border-gray-700">
                                  <td className="p-4 font-bold text-left">
                                    TOTAL GENERAL:
                                  </td>
                                  <td className="p-4 font-bold text-center">
                                    {cantidadTotal - 1}
                                  </td>
                                  <td></td>
                                  <td className="p-4 font-bold text-right">
                                    $ {descuentoTotal.toFixed(2)}
                                  </td>
                                </tr>
                              )}
                            </>
                          )}
                          {el.cliente != "" && (
                            <tr className="border-b dark:border-gray-700">
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white"
                              ></th>
                              <td
                                colSpan={1}
                                className="p-4 font-semibold text-center"
                              >
                                {el.servicio}
                              </td>
                              <td
                                colSpan={1}
                                className="p-4 font-semibold text-center"
                              >
                                {el.fecha}
                              </td>
                              <td
                                colSpan={1}
                                className="p-4 font-semibold text-right"
                              >
                                $ {el.descuento.toFixed(2)}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <h3 className="p-4 text-center">NO HAY DATOS</h3>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-3">
        <div className="flex w-1/2 mx-2 justify-evenly">
          <VolverBtn fnOnClick={() => navigate(-1)} />
        </div>
      </div>
    </section>
  );
};
