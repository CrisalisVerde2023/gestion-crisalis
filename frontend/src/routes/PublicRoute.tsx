// @ts-nocheck
import { useContext } from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const { userLogged } = useContext(UserLoggedContext);
  const { isAuth } = userLogged;

  return isAuth ? <Navigate to="/home" /> : children;
};
