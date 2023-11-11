import React, { useState, useEffect, useContext } from "react";
import {
  PencilFill,
  XCircleFill,
  Search,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {
  useFetchPedidos,
  useDeletePedidos,
} from "../../controller/ABMPedidoController";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { EncabezadoPedidoType } from "../types/EncabezadoPedidoType";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import { PedidoType } from "../types/UserLogged";

export default function LB_Pedido() {
  const [data, setData] = useState<EncabezadoPedidoType[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userLogged } = useContext(UserLoggedContext);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);

  let fetchResponse = useFetchPedidos(undefined, shouldFetch);
  let deleteResponse = useDeletePedidos(idToDelete, shouldDelete);

  useEffect(() => {
    if (fetchResponse && shouldFetch) {
      if (
        !fetchResponse.loading &&
        !fetchResponse.hasError &&
        fetchResponse.json
      ) {
        const encabezados: EncabezadoPedidoType[] = fetchResponse.json.map(
          (aux: any) => {
            let cantProductos = 0;
            let cantServicios = 0;
            let total = 0;

            const detallePedido = aux.ordenDetalles.map((el: any) => {
              switch (el.productoServicio.tipo.toString()) {
                case "SERVICIO":
                  cantServicios++;
                  break;
                case "PRODUCTO":
                  cantProductos++;
                  break;
              }

              total +=
                ((el.impuesto || 0) / 100 + 0.02 * (el.garantia || 0)) *
                  el.costo *
                  el.cantidad +
                el.costo * el.cantidad;

              return {
                tipo: el.productoServicio.tipo,
                cantidad: el.cantidad,
                costo: el.costo,
                impuesto: el.impuesto,
                garantia: el.garantia,
                total,
              };
            });

            return {
              id: aux.id,
              persona:
                aux.cliente.persona.nombre + " " + aux.cliente.persona.apellido,
              empresa: aux.cliente.empresa?.nombre,
              cantProductos,
              cantServicios,
              fechaCreacion: aux.fechaCreacion,
              total,
              anulado: aux.anulado,
            };
          }
        );
        setData(fetchResponse.json);
        setShouldFetch(false);
      } else if (!fetchResponse.loading && fetchResponse.hasError) {
        Swal.fire("Error!", "No se han podido obtener datos.", "error");
        setData(null);
      }
    }
  }, [fetchResponse]);

  useEffect(() => {
    if (deleteResponse && shouldDelete) {
      setShouldDelete(false);
      if (!deleteResponse.loading && !deleteResponse.hasError) {
        Swal.fire(
          "Perfecto!",
          "Cambio el estado del pedido correctamente",
          "success"
        );
        setShouldFetch(true);
      } else if (!deleteResponse.loading && deleteResponse.hasError) {
        if (deleteResponse.statusCode >= 400) {
          Swal.fire(
            "Atención!",
            "Error al cambiar el estado del pedido",
            "warning"
          );
        }
      }
    }
  }, [deleteResponse]);

  const handleSearch = () => {
    data &&
      setData(
        data.filter(
          (el: EncabezadoPedidoType) =>
            el.id.toString().includes(searchTerm) ||
            el.persona.toLowerCase().includes(searchTerm.toLowerCase()) ||
            el.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            el.fechaCreacion.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  };

  const onConfirm = async (pedido: EncabezadoPedidoType) => {
    if (pedido) {
      console.log(`Id to delete is : ${pedido.id}`);
      setIdToDelete(pedido.id);
      setShouldDelete(true);
    }
  };

  const handleClickedElement = (item: EncabezadoPedidoType) => {
    Swal.fire({
      title: "Confirmar cambio de estado del pedido?",
      text: `Esta por ${
        item.anulado ? "activar" : "desactivar"
      } el pedido ID: ${item.id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí! Estoy seguro.",
      cancelButtonText: "Mejor no.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) onConfirm(item);
    });
  };

  const actionButtons = (row: EncabezadoPedidoType) => (
    <div className="d-flex flex-row justify-content-evenly align-items-center">
      <button
        className="actionButton"
        onClick={() => handleClickedElement(row)}
      >
        {row.anulado ? <CheckCircleFill /> : <XCircleFill />}
      </button>
    </div>
  );

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center mb-4">
          <div className="flex-auto">
            <input
              type="text"
              placeholder="Buscar"
              className="inputSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Data Table */}
        <div>
          {isLoading ? (
            <div>
              <LoadingComponent />
            </div>
          ) : (
            <div>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300">ID</th>
                    <th className="border border-gray-300">Fecha</th>
                    <th className="border border-gray-300">Persona</th>
                    <th className="border border-gray-300">Empresa</th>
                    <th className="border border-gray-300">Prods#</th>
                    <th className="border border-gray-300">Servs#</th>
                    <th className="border border-gray-300">Total</th>
                    <th className="border border-gray-300">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300">{row.id}</td>
                        <td className="border border-gray-300">
                          {row.fechaCreacion.substring(0, 10)}
                        </td>
                        <td className="border border-gray-300">
                          {row.persona}
                        </td>
                        <td className="border border-gray-300">
                          {row.empresa}
                        </td>
                        <td className="border border-gray-300">
                          {row.cantProductos}
                        </td>
                        <td className="border border-gray-300">
                          {row.cantServicios}
                        </td>
                        <td className="border border-gray-300">
                          {row.total.toFixed(2)}
                        </td>
                        <td className="border border-gray-300">
                          {row.anulado ? "Anulado" : "Activo"}
                        </td>
                        <td className="border border-gray-300">
                          {actionButtons(row)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}