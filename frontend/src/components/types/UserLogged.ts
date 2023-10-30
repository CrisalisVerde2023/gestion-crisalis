import {
  ClienteType,
  defaultClienteType,
  defaultTestClienteType,
} from "./clientType";
import { ProductServiceType } from "./productServiceType";

export type UserLogged = {
  id: number;
  email: string;
  isAuth: boolean;
  isAdmin: boolean;
};

export type PedidoType = {
  cliente: ClienteType;
  prods_servs: ProductServiceType[];
};

export type UserLoggedContextType = {
  userLogged: UserLogged;
  setUserLogged: React.Dispatch<React.SetStateAction<UserLogged>>;
  pedido: PedidoType;
  setPedido: React.Dispatch<React.SetStateAction<PedidoType>>;
};

export const defaultUserLogState = {
  id: -1,
  email: "",
  isAuth: false,
  isAdmin: false,
};
export const defaultPedidoState: PedidoType = {
  cliente: defaultTestClienteType,
  prods_servs: [],
}; //Cuando la funcionalida de cliente este lista cambiar por defaultClientType

export const defaultContext: UserLoggedContextType = {
  userLogged: defaultUserLogState,
  setUserLogged: () => {},
  pedido: defaultPedidoState,
  setPedido: () => {},
};
