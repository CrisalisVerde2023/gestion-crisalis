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
import BorrarBtn from "../UI Elements/BorrarBtn";
import BuscarBar from "../UI Elements/BuscarBar";

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
        console.log(fetchResponse.json);
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
    <div className="flex justify-center items-center space-x-4">
      <BorrarBtn fnOnClick={() => handleClickedElement(row)} />
    </div>
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl p-4 bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex justify-center items-center mb-4">
          <BuscarBar fnOnChange={handleSearchChange} value={searchTerm} />
        </div>
        {/* Data Table */}
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingComponent />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300">ID</th>
                  <th className="px-4 py-2 border-b border-gray-300">Fecha</th>
                  <th className="px-4 py-2 border-b border-gray-300">
                    Persona
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300">
                    Empresa
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300">Prods#</th>
                  <th className="px-4 py-2 border-b border-gray-300">Servs#</th>
                  <th className="px-4 py-2 border-b border-gray-300">Total</th>
                  <th className="px-4 py-2 border-b border-gray-300">Estado</th>
                  <th className="px-4 py-2 border-b border-gray-300">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 border border-gray-300">
                        {row.id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.fechaCreacion.substring(0, 10)}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.persona}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.empresa}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.cantProds}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.cantServs}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.anulado ? "Anulado" : "Activo"}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {actionButtons(row)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
