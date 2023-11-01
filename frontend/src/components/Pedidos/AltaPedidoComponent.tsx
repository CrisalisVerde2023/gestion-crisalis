import React, { useContext } from "react";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import {
  ProductOrService,
  ProductServiceType,
} from "../types/productServiceType";
import { XCircleFill } from "react-bootstrap-icons";
import SelectedProdsServs from "../SelectedProdsServs";
import SelectedClient from "../SelectedClient";
import { useNavigate } from "react-router-dom";

export default function AltaPedidoComponent() {
  const {pedido, setPedido} = useContext(UserLoggedContext);
  const navigate = useNavigate();

  const removeFromPedido = (selected: ProductServiceType) => {
    // Filter out the item with the given 'id'.
    const updatedProdsServs = pedido.prods_servs.filter(
      (item) => item.id !== selected.id
    );

    // Update the state.
    setPedido({ ...pedido, prods_servs: updatedProdsServs });
  };

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
        onClick={() => navigate("/productosyservicios")}
        style={{margin: "20px"}}
        className="bg-denim px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-900"
      >
        Seleccionar Productos / Servicios
      </button>
      <SelectedProdsServs />
    </div>
  );
}
