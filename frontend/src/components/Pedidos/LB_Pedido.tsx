import React, { useState, useEffect, useContext } from "react";
import { XCircleFill, CheckCircleFill } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import {
  fetchPedidos,
  deletePedido
} from "../../controller/ABMPedidoController";
import LoadingComponent from "../LoadingComponent";
import Swal from 'sweetalert2';
import { EncabezadoPedidoType } from "../types/EncabezadoPedidoType";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";

export default function LB_Pedido() {
  const [data, setData] = useState<EncabezadoPedidoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {userLogged} = useContext(UserLoggedContext);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  let aux;

  const fetchData = async () => {
    try {
      return await fetchPedidos(userLogged, 0);
    }
    catch (error) {
      Swal.fire('Error!', 'No se han podido obtener datos.', 'error')
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then(resp => {
      setData(resp || []);
      setIsLoading(false);
    });
  }, [location]);

  const onConfirm = (pedido: EncabezadoPedidoType) => {
    if (pedido)
      deletePedido(userLogged, pedido.id)
      .then(() => {
        fetchData().then((resp) => {
          setData(resp || []);
          Swal.fire({
            title: 'Realizado!',
            text: 'Se ha cambiado el estado.',
            icon: 'success',
            timer: 2000
          })
        })
      })
      .catch(() => {
        Swal.fire('Error!', 'No se ha podido cambiar el estado.', 'error')
      });
  };

  const handleClickedElement = (item: EncabezadoPedidoType) => {
    Swal.fire({
      title: 'Confirmar cambio de estado del pedido?',
      text: `Esta por ${item.anulado ? "activar" : "desactivar"} el pedido ID: ${item.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí! Estoy seguro.',
      cancelButtonText: 'Mejor no.',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) onConfirm(item);
    })
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
          <input
            type="text"
            placeholder="Buscar"
            className="inputSearch border-2 border-blue-500 px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Data Table */}
        <div>
          {isLoading ? (
            <div><LoadingComponent /></div>
          ) : (
            <div className="w-full">
              <table className="min-w-full bg-white border border-gray-300 ">
                <thead className="bg-denim-400 text-white">
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Fecha</th>
                    <th className="py-2 px-4 border-b">Persona</th>
                    <th className="py-2 px-4 border-b">Empresa</th>
                    <th className="py-2 px-4 border-b">Prods#</th>
                    <th className="py-2 px-4 border-b">Servs#</th>
                    <th className="py-2 px-4 border-b">Total</th>
                    <th className="py-2 px-4 border-b">Estado</th>
                    <th className="py-2 px-4 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data
                    && (aux = (!searchTerm.length
                      ? data
                      : data.filter((el: EncabezadoPedidoType) =>
                        el.id.toString().includes(searchTerm) ||
                        el.persona.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        el.empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        el.fechaCreacion.substring(0, 10).includes(searchTerm)
                      )
                    )).length
                    ? aux.sort((a, b) => (a.id < b.id) ? -1 : 1)
                      .map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{row.id}</td>
                          <td className="py-2 px-4">{row.fechaCreacion?.substring(0, 10)}</td>
                          <td className="py-2 px-4">{row.persona}</td>
                          <td className="py-2 px-4">{row.empresa || "-"}</td>
                          <td className="py-2 px-4">{row.cantProds}</td>
                          <td className="py-2 px-4">{row.cantServs}</td>
                          <td className="py-2 px-4">{row.total.toFixed(2)}</td>
                          <td className="py-2 px-4">{(row.anulado) ? "Anulado" : "Activo"}</td>
                          <td className="py-2 px-4">{actionButtons(row)}</td>
                        </tr>
                      ))
                    : <tr><td colSpan={3}>No hay datos...</td></tr>
                  }
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
