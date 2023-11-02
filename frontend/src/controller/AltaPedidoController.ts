import { PedidoType, UserLogged } from "../components/types/UserLogged";
import { useContext } from "react";

const URL_API_PRODS_SERVS = "http://localhost:8080/api/prods_servs";

export async function createPedido(userLogged: UserLogged, pedido: Partial<PedidoType> = {}) {
  try{
    await fetch(URL_API_PRODS_SERVS, {
      method: "POST",
      body: JSON.stringify({
        idCliente: pedido.cliente?.id,
        idUsuario: userLogged.id,
        detalleOrden: pedido.prods_servs?.map(({id, cantidad, garantia}) => ({idServicioProducto: id, cantidad, garantia})),
      }),
      headers: {
        Authorization: userLogged.token,
        "Content-Type": "application/json",
      },
    })
    .then(resp => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    })
  }
  catch(error) {
    console.error("Ocurrió un error al crear usuario:", error);
    throw error;
  }
}