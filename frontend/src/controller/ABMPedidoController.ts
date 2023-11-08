//@ts-nocheck
import { PedidoType, UserLogged } from "../components/types/UserLogged";

const URL_API_ORDEN = "http://localhost:8080/api/orden";

export async function createPedido(userLogged: UserLogged, pedido: Partial<PedidoType> = {}) {
  try{
    await fetch(URL_API_ORDEN, {
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
    console.error("Ocurrió un error al crear pedido:", error);
    throw error;
  }
}

export async function deletePedido(userLogged: UserLogged, id: number) {
  try{
    await fetch(`${URL_API_ORDEN}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: userLogged.token,
        "Content-Type": "application/json",
      }
    })
    .then(resp => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    })
  }
  catch(error) {
    console.error("Ocurrió un error al cambiar estado de pedido:", error);
    throw error;
  }
}

export const fetchPedidos = async (userLogged: UserLogged, id: number) => {
  try {
    return await (await fetch(URL_API_ORDEN, {
      headers: {
        Authorization: userLogged.token,
        "Content-Type": "application/json",
      }
    })).json() || [];
  }
  catch(error) {
    console.error("Ocurrió un error al obtener pedidos:", error);
    throw error;
  }
}