import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LB_Pedido from "./LB_Pedidos";
import VolverBtn from "../UI Elements/VolverBtn";

export default function ABMPedidos() {
  const navigate = useNavigate();

  function goToAMPedido() {
    navigate("/altaPedido");
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <LB_Pedido />
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="w-1/2 flex justify-evenly">
          <button
            onClick={goToAMPedido}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Crear nuevo pedido
          </button>
          <VolverBtn fnOnClick={goBack} />
        </div>
      </div>
    </div>
  );
}
