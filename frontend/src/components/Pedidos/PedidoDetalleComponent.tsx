// @ts-nocheck
import React from "react";
import { useParams } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";

const HOST_API_DETALLEPEDIDOS = "http://localhost:8080/api/ordenDetalle";

function PedidoDetalleComponent() {
  const { idPedido } = useParams<{ idPedido: string }>();
  const idToModify = idPedido ? parseInt(idPedido, 10) : undefined;
  const {
    estado: { loading, json },
    create,
    deleteByIdData,
    updateByIdData,
    goBack,
  } = useCrud(
    `${HOST_API_DETALLEPEDIDOS}/${
      idToModify !== undefined && idToModify !== null ? idToModify : "list"
    }`
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!json) {
    return <div>No data found.</div>;
  }

  return (
    <div>
      PedidoDetalleComponent
      {/* Render your JSON data here */}
      {json.map((detalle: any, index: number) => (
        <div key={index}>{/* Render each detalle */}</div>
      ))}
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default PedidoDetalleComponent;
