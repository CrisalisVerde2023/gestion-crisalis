import Swal from "sweetalert2";
import { defaultUserLogState } from "../components/types/UserLogged";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export enum HTTPMethod {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}

export type useFetchTypes = {
  method: HTTPMethod;
  url: string;
  params: string;
};

export const useFetch = ({ method, url, params }: useFetchTypes) => {
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);
  const [estado, setEstado] = useState({
    json: null,
    loading: true,
    hasError: false,
  });
  const navigate = useNavigate();
  const token = userLogged.token;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setEstado({
      json: null,
      loading: true,
      hasError: false,
    });

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          Swal.fire("Sesión expirada", "Será redirigido al login.", "error");
          setUserLogged(defaultUserLogState);
          navigate("/login");
        }

        if (response.status === 400 || response.status > 401) {
          throw new Error("El servidor respondió con error");
        }
      }

      setEstado({
        json: jsonResponse,
        loading: false,
        hasError: false,
      });
    } catch (error) {
      setEstado({
        json: null,
        loading: false,
        hasError: true,
      });
    }
  };

  return estado;
};
