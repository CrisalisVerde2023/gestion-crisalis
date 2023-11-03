import { useContext } from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = () => {
  const { userLogged } = useContext(UserLoggedContext);
  const { isAdmin } = userLogged;

  if (isAdmin) {
    return <Outlet />;
  }

  return <Navigate to="/error" />;
};
