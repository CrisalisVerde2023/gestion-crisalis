import React, { createContext, ReactNode, useState } from "react";
import {
  defaultContext,
  UserLogged,
  UserLoginContextType,
} from "../components/types/UserLogged";
import { useLocalStorage } from "usehooks-ts";

export const UserLoginContext =
  createContext<UserLoginContextType>(defaultContext);

type Props = {
  children: ReactNode;
};

export default function UserLoginProvider({ children }: Props) {
  const [userLogged, setUserLogin] = useLocalStorage("userLogin", {
    id: -1,
    email: "",
  });
  return (
    <UserLoginContext.Provider value={{ userLogged, setUserLogin }}>
      {children}
    </UserLoginContext.Provider>
  );
}
