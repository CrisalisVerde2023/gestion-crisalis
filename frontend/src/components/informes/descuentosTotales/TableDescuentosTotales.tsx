import React, { useEffect, useState } from "react";
import VolverBtn from "../../UI Elements/VolverBtn";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../../../contexts/UserLoggedContext";
import { defaultUserLogState } from "../../types/UserLogged";
import { useContext } from "react";
import { FilaDescuento } from "../../types/FilaDescuento";

const HOST_API_PEDIDOS_DESCUENTOS = "http://localhost:8080/api/reportes/descuentosPedidos";

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
            }
        })
            .then(resp => resp.json())
            .then(data => setDatos(data))
            .catch(error => console.error("Error fetching data:", error));
    }, [token]);



    return (
        <section className="p-3 antialiased bg-gray-50 dark:bg-gray-900 sm:p-5">
        {datos.length
            ?
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Servicio</th>
                            <th>Fecha</th>
                            <th>Descuento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos.concat({cliente: "", servicio: "", fecha: "", descuento: 0}).map((el, idx) => {
                                cantidadRegistros++;
                                cantidadTotal++;
                                total += el.descuento;
                                descuentoTotal += el.descuento;

                                return (
                                    <React.Fragment key={idx}>
                                        {(clientePrevio != el.cliente)
                                        && 
                                            <>
                                                {clientePrevio != undefined &&
                                                <tr>
                                                    <td>Total {clientePrevio}:</td>
                                                    <td colSpan={2}>{cantidadRegistros - 2 + (cantidadRegistros = 1)}</td>
                                                    <td>{(total - el.descuento * 2 + (total = el.descuento)).toFixed(2)}</td>
                                                </tr>}
                                                {
                                                    (el.cliente != "")
                                                        ? <tr><td>{clientePrevio = el.cliente}</td><td> </td><td> </td><td> </td></tr>
                                                        : <tr><td>Total general:</td><td colSpan={2}>{cantidadTotal - 1}</td><td>{descuentoTotal.toFixed(2)}</td></tr>
                                                }
                                            </>
                                        }
                                        {(el.cliente != "") && <tr><td></td><td>{el.servicio}</td><td>{el.fecha}</td><td>{el.descuento.toFixed(2)}</td></tr>}
                                        </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            :
                <h3>No hay datos...</h3>
        }
            <div className="flex items-center justify-center mt-3">
                <div className="flex w-1/2 mx-2 justify-evenly">
                    <VolverBtn fnOnClick={() => navigate(-1)} />
                </div>
            </div>
        </section>
    );
};