import React, { useState, useEffect, useContext } from "react";
import { PencilFill, XCircleFill, Search, CheckCircleFill } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
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

  const handleSearch = () => {
    setData(
      data.filter((el: EncabezadoPedidoType) =>
        el.id.toString().includes(searchTerm) ||
        el.persona.toLowerCase().includes(searchTerm.toLowerCase()) ||
        el.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        el.fechaCreacion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

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
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300">{row.id}</td>
                      <td className="border border-gray-300">{row.fechaCreacion.substring(0, 10)}</td>
                      <td className="border border-gray-300">{row.persona}</td>
                      <td className="border border-gray-300">{row.empresa}</td>
                      <td className="border border-gray-300">{row.cantProductos}</td>
                      <td className="border border-gray-300">{row.cantServicios}</td>
                      <td className="border border-gray-300">{row.total.toFixed(2)}</td>
                      <td className="border border-gray-300">{(row.anulado) ? "Anulado" : "Activo"}</td>
                      <td className="border border-gray-300">{actionButtons(row)}</td>
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
