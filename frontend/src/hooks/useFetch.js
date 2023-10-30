import Swal from "sweetalert2";
import { defaultUserLogState } from "../components/types/UserLogged";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export const useFetch = ({ method, url, params }) => {
  const { setUserLogged } = useContext(UserLoggedContext);
  const [estado, setEstado] = useState({
    json: null,
    loading: true,
    hasError: false,
  });
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetch();
  });

  const fetch = async () => {
    setEstado({
      json: null,
      loading: true,
      hasError: false,
    });

    switch (method) {
      case "POST": {
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            body: params,
          });
          const json = await response.json();

          if (!response.ok) {
            if (response.status == 401) {
              Swal.fire(
                "Sesión expirada",
                "Será redirigido al login.",
                "error"
              );

              sessionStorage.removeItem("token");
              setUserLogged(defaultUserLogState);

              setTimeout(() => {
                navigate("/login");
              }, 2000);
            }

            if (response.status == 400 || response.status > 401)
              throw "El servidor respondió con error";
          }
        } catch (error) {
          throw new Error();
        }
        break;
      }

      default: {
        try {
          const response = await fetch(url, {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          });
          const json = await response.json();

          if (!response.ok) {
            setEstado({
              ...estado,
              hasError: true,
              loading: false,
            });

            if (response.status == 401) {
              Swal.fire(
                "Sesión expirada",
                "Será redirigido al login.",
                "error"
              );

              sessionStorage.removeItem("token");
              setUserLogged(defaultUserLogState);

              setTimeout(() => {
                navigate("/login");
              }, 2000);
            }

            if (response.status == 400 || response.status > 401)
              throw "El servidor respondió con error";
          }

          setEstado({
            json,
            hasError: false,
            loading: false,
          });
        } catch (error) {
          setEstado({ ...estado, hasError: true, loading: false });
          throw new Error("");
        }

        break;
      }
    }
  };

  return estado;
};
