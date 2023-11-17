import { SendPedidoType, UserLogged } from "./../components/types/UserLogged";
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
  overrides: SendPedidoType,
  shouldExecute = false
) => {
  console.log(overrides);
  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_ORDEN}`,
      params: overrides,
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

export const fetchPedidos = async (userLogged: UserLogged, id: number) => {
  try {
    return (
      (await (
        await fetch(URL_API_ORDEN, {
          headers: {
            Authorization: userLogged.token,
            "Content-Type": "application/json",
          },
        })
      ).json()) || []
    );
  } catch (error) {
    console.error("Ocurrió un error al obtener pedidos:", error);
    throw error;
  }
};
