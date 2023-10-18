// @ts-nocheck
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";

export const PrivateRoute = ({ children }) => {
  const { userLogged } = useContext(UserLoggedContext);
  const { id, email } = userLogged;

  return id !== -1 && email !== "" ? children : <Navigate to="/login" />;
};
