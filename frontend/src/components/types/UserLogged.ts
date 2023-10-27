export type UserLogged = {
  id: number;
  email: string;
};

export type PedidoType = {
  cliente: number;
  prods_servs: number[];
};

export type UserLoggedContextType = {
  userLogged: UserLogged;
  setUserLogged: React.Dispatch<React.SetStateAction<UserLogged>>;
  pedido: PedidoType;
  setPedido: React.Dispatch<React.SetStateAction<PedidoType>>;
};

export const defaultUserLogState = { id: -1, email: "" };
export const defaultPedidoState: PedidoType = { cliente: -1, prods_servs: [] };

export const defaultContext: UserLoggedContextType = {
  userLogged: defaultUserLogState,
  setUserLogged: () => {},
  pedido: defaultPedidoState,
  setPedido: () => {},
};
