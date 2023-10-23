// @ts-nocheck
import { useContext } from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const { userLogged } = useContext(UserLoggedContext);
  const { id, email } = userLogged;

  return id !== -1 && email !== "" ? <Navigate to="/home" /> : children;
};
