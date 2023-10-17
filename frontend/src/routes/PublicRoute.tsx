// @ts-nocheck
import { useContext } from "react";
import { UserLoginContext } from "../contexts/UserLoginContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const { userLogged } = useContext(UserLoginContext);
  const { id, email } = userLogged;

  return id !== -1 && email !== "" ? <Navigate to="/home" /> : children;
};
