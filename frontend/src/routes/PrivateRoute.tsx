// @ts-nocheck
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";

export const PrivateRoute = ({ children }) => {
  const { userLogged } = useContext(UserLoggedContext);
  const { isAuth } = userLogged;

  return isAuth ? children : <Navigate to="/login" />;
};
