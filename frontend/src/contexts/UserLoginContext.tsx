import React, { createContext, ReactNode, useEffect } from "react";
import {
  defaultContext,
  defaultUserLogState,
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
  const [userLogged, setUserLogin] = useLocalStorage("userLogin", defaultUserLogState);

  useEffect(() => {
    setUserLogin({
      id: 3,
      email: "pepe",
    })
  }, []);

  return (
    <UserLoginContext.Provider value={{ userLogged, setUserLogin }}>
      {children}
    </UserLoginContext.Provider>
  );
}
