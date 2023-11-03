//@ts-nocheck
import { PedidoType, UserLogged } from "../components/types/UserLogged";
import { useContext } from "react";
import { EncabezadoPedidoType } from "../components/types/EncabezadoPedidoType";
import { ProductServiceType } from "../components/types/productServiceType";

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







// Refactorizar el siguiente código...



export const fetchPedidos = async (userLogged: UserLogged, id: number) => {
  try {
    const pedidos = await (await fetch(URL_API_ORDEN, {
      headers: {
        Authorization: userLogged.token,
        "Content-Type": "application/json",
      }
    })).json() || [];
    const encabezados: EncabezadoPedidoType[] = pedidos.map((aux) => {
      let cantProductos = 0;
      let cantServicios = 0;
      let total = 0;
      
      const detallePedido = aux.ordenDetalles.map(el => {
        switch (el.productoServicio.tipo.toString()) {
          case "SERVICIO": cantServicios++; break;
          case "PRODUCTO": cantProductos++; break;
        }

        total += ((((el.impuesto || 0) / 100) + (0.02 *  (el.garantia || 0))) * el.costo * el.cantidad) + el.costo * el.cantidad;

        return {
          tipo: el.productoServicio.tipo,
          cantidad: el.cantidad,
          costo: el.costo,
          impuesto: el.impuesto,
          garantia: el.garantia,
          total
        };
      });

      return {
        id: aux.id,
        persona: aux.cliente.persona.nombre + " " + aux.cliente.persona.apellido,
        empresa: aux.cliente.empresa?.nombre,
        cantProductos,
        cantServicios,
        fechaCreacion: aux.fechaCreacion,
        total,
        anulado: aux.eliminado
      };
    });

    return encabezados;
  }
  catch(error) {
    console.error("Ocurrió un error al obtener pedidos:", error);
    throw error;
  }
}