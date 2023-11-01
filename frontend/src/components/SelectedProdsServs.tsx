import React, { useContext } from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { ProductServiceType } from "./types/productServiceType";
import { XCircleFill } from "react-bootstrap-icons";
import { Col, Container, Row, Table } from "react-bootstrap";

export default function SelectedProdsServs() {
  const {pedido, setPedido} = useContext(UserLoggedContext);

  const removeFromPedido = (row: ProductServiceType) => {
    setPedido({ ...pedido, prods_servs: pedido.prods_servs.filter(el => el.id !== row.id)});
  };

  const handleChange = (target: EventTarget & HTMLInputElement, row: ProductServiceType) => {
    setPedido({ ...pedido, prods_servs: pedido.prods_servs.map(el => (el.id === row.id) ? {...el, [target.name]: parseInt(target.value)} : el) })
  }

  return !pedido.prods_servs.length
    ? <p>No hay Productos / Servicios seleccionados...</p>
    : 
      <div className="w-full">
  			<table className="min-w-full bg-white border-solid border-2 border-denim-400">
          <thead className="bg-denim-400 text-white ">
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Tipo</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Impuestos</th>
              <th className="py-2 px-4 border-b">Soporte</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b">Gtía(años)</th>
              <th className="py-2 px-4 border-b">Precio final</th>
              <th className="py-2 px-4 border-b">Quitar</th>
            </tr>
          </thead>
          <tbody>
            {
              pedido.prods_servs.map((row, index) => (
                <tr key={index}>
                  <td className="py-2">{row.nombre}</td>
                  <td className="py-2">{row.tipo}</td>
                  <td className="py-2">{row.costo}</td>
                  <td className="py-2">{row.impuesto}</td>
                  <td className="py-2">{row.soporte || "-"}</td>
                  <td className="py-2">
                    <input
                      style={{width: "60px", backgroundColor: "lightgrey", padding: "5px", borderRadius: "10%"}}
                      type="number"
                      max={1000}
                      min={1}
                      name="quantity"
                      value={row.cantidad}
                      onChange={({target}) => handleChange(target, row)}>
                    </input>
                  </td>
                  <td className="py-2">
                    {row.tipo === "PRODUCTO" &&
                      <input style={{width: "60px", backgroundColor: "lightgrey", padding: "5px", borderRadius: "10%"}}
                        type="number"
                        max={5}
                        min={0}
                        name="warranty"
                        value={row.garantia || 0}
                        onChange={({target}) => handleChange(target, row)}>
                      </input>
                    }
                  </td>
                  <td className="py-2">{row.costo * row.cantidad + row.costo * row.cantidad * row.impuesto / 100 + (row.soporte || 0) * row.cantidad + (row.garantia || 0) * row.costo * row.cantidad * 0.2}</td>
                  <td className="py-2"><button onClick={() => removeFromPedido(row)}><XCircleFill /></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
}