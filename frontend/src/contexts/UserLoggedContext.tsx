import React, { createContext, ReactNode, useState } from "react";
import {
  defaultContext,
  UserLogged,
  UserLoggedContextType,
} from "../components/types/UserLogged";
import { useLocalStorage } from "usehooks-ts";

export const UserLoggedContext =
  createContext<UserLoggedContextType>(defaultContext);

type Props = {
  children: ReactNode;
};

export default function UserLoggedProvider({ children }: Props) {
  const [userLogged, setUserLogged] = useLocalStorage("userLogged", {
    id: -1,
    email: "",
  });
  return (
    <UserLoggedContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserLoggedContext.Provider>
  );
}
