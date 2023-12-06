import React, { useEffect, useState } from "react";
import VolverBtn from "../../UI Elements/VolverBtn";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../../../contexts/UserLoggedContext";
import { useContext } from "react";
import { FilaMayorDescuento } from "../../types/FilaMayorDescuento";

const HOST_API_PEDIDOS_DESCUENTOS = "http://localhost:8080/api/reportes/servicioMayorDescuento";

export const TableServicioMayorDescuento = () => {
    const navigate = useNavigate();
    const [datos, setDatos] = useState<FilaMayorDescuento[]>([]);
    const { userLogged} = useContext(UserLoggedContext);


    const [fechas, setFechas] = useState<string[]>(
        [new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })]
     );

    useEffect(() => {
        fetch(HOST_API_PEDIDOS_DESCUENTOS + `?fechaDesde=${fechas[0]}&fechaHasta=${fechas[1]}`, {
            headers: {
                Authorization: `Bearer ${userLogged.token}`,
                "Content-Type": "application/json",
            }
        })
            .then(resp => resp.json())
            .then(data => setDatos(data))
            .catch(error => console.error("Error al obtener los datos:", error));
    }, [fechas]);

    return (
        <section className="p-3 antialiased bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="max-w-screen-xl px-4 mx-auto lg:px-12">
                <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <input
                            type="date"
                            value={fechas[0]}
                            onChange={(e) => setFechas([e.target.value, fechas[1]])}
                        />
                        <input
                            type="date"
                            value={fechas[1]}
                            onChange={(e) => setFechas([fechas[0], e.target.value])}
                        />
                        {datos.length
                            ?
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-center">Cliente</th>
                                        <th scope="col" className="px-4 py-3 text-center">Servicio</th>
                                        <th scope="col" className="px-4 py-3 text-center">Descuento Generado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        datos.map((el, idx) => {
                                            return (
                                                <React.Fragment key={idx}>
                                                    <tr className="border-b dark:border-gray-700">
                                                        <td className="p-4 font-semibold text-center">{el.cliente}</td>
                                                        <td className="p-4 font-semibold text-center">{el.servicio}</td>
                                                        <td className="p-4 font-semibold text-center">$ {(el.descuento || 0).toFixed(2)}</td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            :
                                <h3 className="p-4 text-center">
                                    NO HAY DATOS
                                </h3>
                        }
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