import { ClientesType, defaultClienteType } from "./clientType";
import { ProductServiceType } from "./productServiceType";

export type UserLogged = {
  id: number;
  email: string;
  isAuth: boolean;
  isAdmin: boolean;
  token: string;
};

export type PedidoType = {
  cliente: ClientesType;
  prods_servs: ProductServiceType[];
};

export type SendPedidoType = {
  idCliente: number | null;
  idUsuario: number;
  detalleOrden: {
    idServicioProducto: number; // This matches the object property idServicioProducto
    cantidad: number;
    garantia?: number | null; // This is now optional and can be null
  }[];
};

export const defaultSendPedidoType = {
  idCliente: -1,
  idUsuario: -1,
  detalleOrden: [],
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
  token: "",
};
export const defaultPedidoState: PedidoType = {
  cliente: defaultClienteType,
  prods_servs: [],
}; //Cuando la funcionalida de cliente este lista cambiar por defaultClientType

export const defaultContext: UserLoggedContextType = {
  userLogged: defaultUserLogState,
  setUserLogged: () => {},
  pedido: defaultPedidoState,
  setPedido: () => {},
};
