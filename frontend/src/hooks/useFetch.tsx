import Swal from "sweetalert2";
import { defaultUserLogState } from "../components/types/UserLogged";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { METHODS } from "http";

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

export type useFetchPropType = {
  method: HTTPMethod;
  url: string;
  params: Object;
};

export type useFetchReturnType = {
  json: any;
  loading: boolean;
  hasError: boolean;
  statusCode: number;
};

export const defaultUseFetchValues = {
  json: null,
  loading: true,
  hasError: false,
  statusCode: 0,
};

export const useFetch = (
  { method, url, params }: useFetchPropType,
  shouldExecute: boolean = true
) => {
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);
  const [estado, setEstado] = useState<useFetchReturnType>(
    defaultUseFetchValues
  );
  const navigate = useNavigate();
  const token = userLogged.token;

  useEffect(() => {
    if (shouldExecute) {
      fetchData();
    }
  }, [shouldExecute]);

  const fetchData = async () => {
    const fetchOptions: any = {
      method: method,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };

    if (method !== HTTPMethod.GET) {
      fetchOptions.body = JSON.stringify(params);
    }

    const response = await fetch(url, fetchOptions);
    const text = await response.text(); // Await the text Promise
    let jsonResponse;
    if (text.length > 0) {
      jsonResponse = JSON.parse(text); // Then parse
    }

    if (!response.ok || response.status >= 400) {
      if (response.status === 401) {
        Swal.fire("Sesión expirada", "Será redirigido al login.", "error");
        setUserLogged(defaultUserLogState);
        navigate("/login");
      }

      if (response.status === 400 || response.status > 401) {
        console.log("error")//Saque el throw porque cortaba la ejecución del programay se pudria todo y no mostraba las alertas
      }
    }
    setEstado({
      json: response.ok && response.status < 400 ? jsonResponse : null,
      loading: false,
      hasError: response.ok ? false : true,
      statusCode: response.status,
    });
  };

  return estado;
};
