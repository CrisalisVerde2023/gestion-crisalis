import React, { useContext, useEffect } from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { ProductServiceType } from "./types/productServiceType";
import { useCrud } from "../hooks/useCrud";
import BorrarBtn from "./UI Elements/BorrarBtn";
import { PedidoType, SendPedidoType } from "./types/UserLogged";

const HOST_API_IMPUESTOS: string = "http://localhost:8080/api/impuestos";

export default function SelectedProdsServs() {
  const { pedido, setPedido, userLogged } = useContext(UserLoggedContext);
  let total: number = 0;
  const {
    estado: { loading, json }
  } = useCrud(HOST_API_IMPUESTOS);

  const filteredImpuestos = () => {
    if (!json) {
      return;
    }
    return json;
  };

  function taxTotal(row: ProductServiceType) {
    return row.costo * row.impuestos.reduce((acc, el) => acc + el.porcentaje, 0) / 100;
  }

  // Calculate total with taxes, support, and warranty
  function rowTotal(row: ProductServiceType) {
    return Math.round(((row.costo + (row.soporte || 0) - (row.descuento || 0) + (row.garantia || 0) * row.costo * 0.02 + taxTotal(row)) * row.cantidad) * 100) / 100;
  }

  const removeFromPedido = (row: ProductServiceType) => {
    setPedido({
      ...pedido,
      prods_servs: pedido.prods_servs.filter((el) => el.id !== row.id),
    });
  };

  // Refactorear desde aca

  // Se trae funcion de AM_Pedidos
  function createPedidoObject(pedido: PedidoType): SendPedidoType {
    return {
      idCliente: (pedido.cliente.id < 1) ? null : pedido.cliente.id,
      idUsuario: userLogged.id,
      detalleOrden:
        pedido.prods_servs?.map(({ id, cantidad, garantia }) => ({
          idServicioProducto: id,
          cantidad,
          garantia: garantia ?? null, // Using nullish coalescing to handle cases where garantia is not present.
        })) || [], // Ensure we default to an empty array if prods_servs is undefined
    };
  }

  async function getEngine(pedido: PedidoType) {
    try{
      const prods_servs:ProductServiceType[] = (await (await fetch("http://localhost:8080/api/orden/calcular", {
        method: "POST",
        body: JSON.stringify(createPedidoObject(pedido)),
        headers: {
          Authorization: userLogged.token,
          "Content-Type": "application/json",
        }
      })).json()).map((el: { nombre: any; productoServicio: { id: any; tipo: any; }; cantidad: any; descuento: any; costo: any; garantia: any; garantiaCosto: any; impuesto: any; servicioSoporte: any; impuestos: any[]; }): ProductServiceType => ({
        nombre: el.nombre,
        id: el.productoServicio.id,
        cantidad: el.cantidad,
        descuento: el.descuento,
        costo: el.costo,
        garantia: el.garantia,
        garantiaCosto: el.garantiaCosto,
        impuesto: el.impuesto,
        soporte: el.servicioSoporte,
        
        tipo: el.productoServicio.tipo,
        impuestos: el.impuestos,
        idImpuestos: el.impuestos.map(imp => imp.id),
        eliminado: false
      }))

      setPedido({... pedido, prods_servs});
    }
    catch(error) {
      console.error("Ocurrió un error al consultar motor:", error);
      throw error;
    }
  }

  useEffect(() => {

    if (pedido.prods_servs.length)
      getEngine({
      ...pedido,
      prods_servs: pedido.prods_servs,
    });
  }, [pedido.prods_servs.length, pedido.cliente.id]);

  // Refactorear hasta aca

  const handleChange = (
    target: EventTarget & HTMLInputElement,
    row: ProductServiceType
  ) => {
    getEngine({
      ...pedido,
      prods_servs: pedido.prods_servs.map((el) =>
        el.id === row.id ? { ...el, [target.name]: parseInt(target.value) } : el
      ),
    });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div
        className={`bg-white dark:bg-gray-800 ${
          pedido.prods_servs.length > 0 && `shadow-md`
        } sm:rounded-lg overflow-hidden`}
      >
        {!pedido.prods_servs.length ? (
          <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <p className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
              <strong>No hay Productos / Servicios seleccionados...</strong>
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white">
            <div className="w-full">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-center">
                      Nombre
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Tipo
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Precio Unitario
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Cantidad
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Gtía(años)
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Costo Gtía
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Soporte
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Impuestos
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Descuento
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Total ítem
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-400">
                  {pedido.prods_servs.map((row, index) => (
                    <tr key={index}>
                      <td className="px-2 py-1">{row.nombre}</td>
                      <td className="px-2 py-1">{row.tipo}</td>
                      <td className="px-2 py-1">{row.costo.toFixed(2)}</td>
                      <td className="px-2 py-1">
                        {row.tipo === "PRODUCTO"
                        ?
                          <input
                            style={{
                              width: "60px",
                              backgroundColor: "lightgrey",
                              padding: "5px",
                              borderRadius: "10%",
                            }}
                            type="number"
                            max={1000}
                            min={1}
                            name="cantidad"
                            value={row.cantidad}
                            onChange={({ target }) => handleChange(target, row)}
                          ></input>
                        : row.cantidad
                          }
                      </td>
                      <td className="px-2 py-1">
                        {row.tipo === "PRODUCTO"
                          ?
                            <input
                              style={{
                                width: "60px",
                                backgroundColor: "lightgrey",
                                padding: "5px",
                                borderRadius: "10%",
                              }}
                              type="number"
                              max={5}
                              min={0}
                              name="garantia"
                              value={row.garantia || 0}
                              onChange={({ target }) => handleChange(target, row)}
                            ></input>
                          : "-"
                        }
                      </td>
                      <td className="px-2 py-1">
                        {(row.garantiaCosto === null) ? "-" : (row.garantiaCosto * row.cantidad).toFixed(2)}
                      </td>
                      <td className="px-2 py-1">
                        {(row.soporte === null) ? "-" : (row.soporte * row.cantidad).toFixed(2)}
                      </td>
                      <td className="px-2 py-1">{(taxTotal(row) * row.cantidad).toFixed(2)}</td>
                      <td className="px-2 py-1">{(row.descuento === null) ? "-" : (row.descuento * row.cantidad).toFixed(2)}</td>
                      <td className="px-2 py-1">{(-total + (total += rowTotal(row))).toFixed(2)}</td>
                      <td className="px-2 py-1 flex justify-content-center">
                        <BorrarBtn fnOnClick={() => removeFromPedido(row)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {pedido.prods_servs.length > 0 && (
          <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-3">
            <p className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
              <strong>Total del pedido: {total.toFixed(2)}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
