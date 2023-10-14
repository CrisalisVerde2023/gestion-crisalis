import React, { createContext, ReactNode, useState } from "react";
import { UserLogged } from "../components/types/UserLogged";

type UserLoginContextType = {
  userLogged: UserLogged;
  setUserLogin: React.Dispatch<React.SetStateAction<UserLogged>>;
};

const defaultContext: UserLoginContextType = {
  userLogged: { id: -1, email: "" },
  setUserLogin: () => {},
};

export const UserLoginContext =
  createContext<UserLoginContextType>(defaultContext);

type Props = {
  children: ReactNode;
};

export default function UserLoginProvider({ children }: Props) {
  const [userLogged, setUserLogin] = useState<UserLogged>({
    id: -1,
    email: "",
  });
  return (
    <UserLoginContext.Provider value={{ userLogged, setUserLogin }}>
      {children}
    </UserLoginContext.Provider>
  );
}
