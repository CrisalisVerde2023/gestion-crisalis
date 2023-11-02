import { PedidoType, UserLogged } from "../components/types/UserLogged";
import { useContext } from "react";
import { EncabezadoPedidoType } from "../components/types/encabezadoPedidoType";
import { ProductServiceType } from "../components/types/productServiceType";

const URL_API_PRODS_SERVS = "http://localhost:8080/api/orden";

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
    console.error("Ocurrió un error al crear pedido:", error);
    throw error;
  }
}

export async function deletePedido(userLogged: UserLogged, id: number) {
  try{
    await fetch(`${URL_API_PRODS_SERVS}/${id}`, {
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

type ReturnedOrderType = { ordenDetalles: { map: (arg0: (el: { productoServicio: { tipo: { toString: () => any; }; impuesto: number; garantia: number; costo: number; cantidad: number; }; }) => { tipo: { toString: () => any; }; cantidad: number; costo: number; impuesto: number; garantia: number; }) => Partial<ProductServiceType>[]; }; id: any; cliente: { persona: { nombre: string; apellido: string; }; empresa: { nombre: any; }; }; fechaCreacion: any; eliminado: any; };


export const fetchPedidos = async (id: number) => {
  try {
    const pedidos = await (await fetch(`${URL_API_PRODS_SERVS + (id > 0) ? `/${id}` : ""}`)).json();
    const encabezados: EncabezadoPedidoType[] = pedidos.map((aux: ReturnedOrderType) => {
      let cantProductos = 0;
      let cantServicios = 0;
      let total = 0;
      
      const detallePedido: Partial<ProductServiceType>[] = aux.ordenDetalles.map(el => {
        switch (el.productoServicio.tipo.toString()) {
          case "SERVICIO": cantServicios++; break;
          case "PRODUCTO": cantProductos++; break;
        }

        total += (el.productoServicio.impuesto / 100) * (0.02 *  el.productoServicio.garantia) * el.productoServicio.costo * el.productoServicio.cantidad

        return {
          tipo: el.productoServicio.tipo,
          cantidad: el.productoServicio.cantidad,
          costo: el.productoServicio.costo,
          impuesto: el.productoServicio.impuesto,
          garantia: el.productoServicio.garantia
        };
      });

      return {
        id: aux.id,
        persona: aux.cliente.persona.nombre + " " + aux.cliente.persona.apellido,
        empresa: aux.cliente.empresa.nombre,
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