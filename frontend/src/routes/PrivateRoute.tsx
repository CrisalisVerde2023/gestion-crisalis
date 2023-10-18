import { useContext } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import { UserLoginContext } from "../contexts/UserLoginContext";

export const PrivateRoute = ({ children }) => {
  const { userLogged } = useContext(UserLoginContext);
  const { id, email } = userLogged;

  return id !== -1 && email !== "" ? children : <Navigate to="/login" />;
};
