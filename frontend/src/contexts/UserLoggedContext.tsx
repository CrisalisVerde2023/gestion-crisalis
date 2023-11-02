import React, { createContext, ReactNode } from "react";
import {
  defaultContext,
  defaultPedidoState,
  defaultUserLogState,
  UserLoggedContextType,
} from "../components/types/UserLogged";
import { useSessionStorage } from "usehooks-ts";

export const UserLoggedContext =
  createContext<UserLoggedContextType>(defaultContext);

type Props = {
  children: ReactNode;
};

export default function UserLoggedProvider({ children }: Props) {
  const [userLogged, setUserLogged] = useSessionStorage(
    "userLogged",
    defaultUserLogState
  );
  const [pedido, setPedido] = useSessionStorage("pedido", defaultPedidoState);

  return (
    <UserLoggedContext.Provider
      value={{ userLogged, setUserLogged, pedido, setPedido }}
    >
      {children}
    </UserLoggedContext.Provider>
  );
}
