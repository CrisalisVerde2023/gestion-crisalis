import React, { useContext } from "react";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import SelectedProdsServs from "../SelectedProdsServs";
import SelectedClient from "../SelectedClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createPedido } from "../../controller/ABMPedidoController";
import { defaultPedidoState } from "../types/UserLogged";

export default function AltaPedidoComponent() {
  const {pedido, setPedido, userLogged} = useContext(UserLoggedContext);
  const navigate = useNavigate();

  const clean = () => {
    setPedido(defaultPedidoState);
  };

  const handleSubmit = () => {
    if ((pedido.cliente.id < 0) || (!pedido.prods_servs.length))
      Swal.fire('Atención!', 'Debe seleccionar un Cliente y al menos un Producto o Servicio.', 'warning');
    else {
      Swal.fire({ text: 'Espere por favor...', showConfirmButton: false });
      createPedido(userLogged, pedido)
        .then(() => {
          Swal.fire({
            title: 'Realizado!',
            text: `Se ha creado el pedido correctamente.`,
            icon: 'success',
            timer: 2000
          })
            .then(() => navigate(-1));
        })
        .catch(() => {
          Swal.fire('Error!', `No se ha podido crear el pedido.`, 'error');
        });
    }
  }

  return (
    <div>
      <strong style={{margin: "20px"}}>Cliente:</strong>
      <button
        onClick={() => navigate("/clientes")}
        style={{margin: "20px"}}
        className="bg-denim px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-900"
      >
        Seleccionar Cliente
      </button>
      <SelectedClient />
      
      <hr style={{margin: "10px"}}></hr>

      <strong style={{margin: "20px"}}>Productos / Servicios:</strong>
      <button
        onClick={() => navigate("/productosyservicios?seleccion=multiple")}
        style={{margin: "20px"}}
        className="bg-denim px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-900"
      >
        Seleccionar Productos / Servicios
      </button>

      <SelectedProdsServs />

      <div className="flex justify-center items-center mb-4">
        <div className="flex justify-evenly mt-2 mx-2">
          <button
            disabled={((pedido.cliente.id < 0) || (!pedido.prods_servs.length))}
            onClick={handleSubmit}
            className={`${
              ((pedido.cliente.id < 0) || (!pedido.prods_servs.length))
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-denim-400 hover:bg-denim-500"
            } px-4 py-2 rounded-md text-white font-medium tracking-wide`}
          >
            Confirmar pedido
          </button>
        </div>
        <div className="flex justify-evenly mt-2 mx-2">
          <button
            disabled={((pedido.cliente.id < 0) && (!pedido.prods_servs.length))}
            className={`${
              (!pedido || ((pedido.cliente.id < 0) && (!pedido.prods_servs.length)))
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-denim-400 hover:bg-denim-500"
            } px-4 py-2 rounded-md text-white font-medium tracking-wide`}
            onClick={() => clean()}
          >
            Limpiar
          </button>
        </div>
        <div className="flex justify-evenly mt-2 mx-2">
          <button
            className="bg-red-600 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-red-700"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
