import React, { createContext, ReactNode } from "react";
import {
  defaultContext,
  UserLoggedContextType,
} from "../components/types/UserLogged";
import { useSessionStorage } from "usehooks-ts";

export const UserLoggedContext =
  createContext<UserLoggedContextType>(defaultContext);

type Props = {
  children: ReactNode;
};

export default function UserLoggedProvider({ children }: Props) {
  const [userLogged, setUserLogged] = useSessionStorage("userLogged", {
    id: -1,
    email: "",
    isAuth: false,
    isAdmin: false,
  });
  return (
    <UserLoggedContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserLoggedContext.Provider>
  );
}
