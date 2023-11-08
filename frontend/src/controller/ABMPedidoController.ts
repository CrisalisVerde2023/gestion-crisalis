import { UserLogged } from "./../components/types/UserLogged";
//@ts-nocheck
import { PedidoType } from "../components/types/UserLogged";
import { useContext } from "react";
import { EncabezadoPedidoType } from "../components/types/EncabezadoPedidoType";
import { ProductServiceType } from "../components/types/productServiceType";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { HTTPMethod, useFetch } from "../hooks/useFetch";

const URL_API_ORDEN = "http://localhost:8080/api/orden";

export const useFetchPedidos = (
  id?: number,
  shouldExecute: boolean = false
) => {
  return useFetch(
    {
      method: HTTPMethod.GET,
      url: `${URL_API_ORDEN}${id && id >= 0 ? `/${id}` : ""}`,
      params: {},
    },
    shouldExecute
  );
};

export const useCreatePedidos = (
  overrides: Partial<EncabezadoPedidoType> = {},
  shouldExecute = false
) => {
  /*const params = {
    idCliente: overrides.persona?
    //idUsuario: userLogged.id,
    /*detalleOrden: overrides.prods_servs?.map(({ id, cantidad, garantia }) => ({
      idServicioProducto: id,
      cantidad,
      garantia,
    })),
  };*/

  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_ORDEN}`,
      params: {}, //TODO: Arreglar esto
    },
    shouldExecute
  );
};

export const useModifyPedidos = (
  updatedData: Partial<EncabezadoPedidoType> = {},
  shouldExecute = false
) => {
  const params = updatedData;

  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_ORDEN}/${updatedData.id}`,
      params: params,
    },
    shouldExecute
  );
};

export const useDeletePedidos = (id?: number, shouldExecute = false) => {
  return useFetch(
    {
      method: HTTPMethod.PATCH,
      url: `${URL_API_ORDEN}/${id}`,
      params: {},
    },
    shouldExecute
  );
};
