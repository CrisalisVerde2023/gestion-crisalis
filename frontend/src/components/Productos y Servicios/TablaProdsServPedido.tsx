import React, { useContext } from "react";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import {
  ProductOrService,
  ProductServiceType,
} from "../types/productServiceType";
import { XCircleFill } from "react-bootstrap-icons";

export default function TablaProdsServPedido({
  seleccion,
}: {
  seleccion: string;
}) {
  const { pedido, setPedido } = useContext(UserLoggedContext);

  const removeFromPedido = (selected: ProductServiceType) => {
    // Filter out the item with the given 'id'.
    const updatedProdsServs = pedido.prods_servs.filter(
      (item) => item.id !== selected.id
    );

    // Update the state.
    setPedido({ ...pedido, prods_servs: updatedProdsServs });
  };

  return (
    <div className="border-denim-400 rounded border-solid border-2">
      <div className="flex flex-row justify-content-center bg-denim-400 text-white">
        <p className="mr-1">Cliente actual en pedido:</p>
        <p className="ml-1">
          <strong>Empresa: </strong>
          {pedido.cliente.empresa.nombre} <strong>Persona: </strong>{" "}
          {`${pedido.cliente.persona.nombre} ${pedido.cliente.persona.apellido}`}
        </p>
      </div>
      {seleccion === "multiple" && (
        <>
          <div className="flex flex-row justify-content-center bg-denim-400 text-white">
            <p className="mr-1">Productos / Servicios en pedido:</p>
          </div>
          <div className="w-full">
            <table className="min-w-full bg-white border border-gray-300 ">
              <thead className="bg-denim-400 text-white ">
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Nombre</th>
                  <th className="py-2 px-4 border-b">Tipo</th>
                  <th className="py-2 px-4 border-b">Precio</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedido.prods_servs.length ? (
                  pedido.prods_servs.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{row.id}</td>
                      <td className="py-2">{row.name}</td>
                      <td className="py-2">{row.type}</td>
                      {row.type.toString() === ProductOrService.Producto ? (
                        <td className="py-2">{row.cost}</td>
                      ) : (
                        <td className="py-2">
                          {row.cost} + *(<strong>{row.support}</strong>)
                        </td>
                      )}
                      <td className="py-2">
                        <button
                          onClick={() => {
                            removeFromPedido(row);
                          }}
                        >
                          <XCircleFill />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b">
                    <td colSpan={5} className="py-2 px-4">
                      No hay datos...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
