import Swal from "sweetalert2";
import { defaultUserLogState } from "../components/types/UserLogged";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const defaultUseFetchValues = {
  json: null,
  loading: true,
  hasError: false,
  statusCode: 0,
};

export const useFetcha = ({ url }) => {
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);
  const [estado, setEstado] = useState(defaultUseFetchValues);
  const navigate = useNavigate();
  const token = userLogged.token;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(url, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        Swal.fire("Sesión expirada", "Será redirigido al login.", "error");
        setUserLogged(defaultUserLogState);
        navigate("/login");
      }

      if (
        response.status === 400 ||
        (response.status > 401 && response.status < 500)
      ) {
        throw new Error(
          `Hubo un error con la petición: ${response.status} : ${response.statusText}`
        );
      }

      if (response.status > 499) {
        throw new Error(
          `Hubo un error con el servidor: ${response.status} : ${response.statusText}`
        );
      }
    }

    setEstado({
      json: response.ok && response.status < 400 ? json : null,
      loading: false,
      hasError: response.ok ? false : true,
      statusCode: response.status,
    });
  };

  const patchData = async ({ id }) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          Swal.fire("Sesión expirada", "Será redirigido al login.", "error");
          setUserLogged(defaultUserLogState);
          navigate("/login");
        }

        if (
          response.status === 400 ||
          (response.status > 401 && response.status < 500)
        ) {
          throw new Error(
            `Hubo un error con la petición: ${response.status}: ${response.statusText}`
          );
        }

        if (response.status > 499) {
          throw new Error(
            `Hubo un error con el servidor: ${response.status}: ${response.statusText}`
          );
        }

        setEstado({ ...estado, hasError: true });
        return;
      }

      Swal.fire({
        title: "Realizado!",
        text: "Se ha cambiado el estado.",
        icon: "success",
        timer: 2000,
      });

      const { json } = { ...estado };
      const impuestoIndex = json.findIndex((impuesto) => impuesto.id == id);
      const newJson = [
        ...json.slice(0, impuestoIndex),
        {
          ...json[impuestoIndex],
          eliminado: !json[impuestoIndex].eliminado,
        },
        ...json.slice(impuestoIndex + 1),
      ];

      setEstado({
        ...estado,
        json: newJson,
        loading: false,
        statusCode: response.status,
      });
    } catch (error) {
      setEstado({ ...estado, hasError: true });

      throw new Error(
        `Ocurrió un error: "${error.name}" con codigo: "${error.code}" y mensaje: "${error.message}" al hacer la peticion a "${error.config.url}"`
      );
    }
  };

  return { estado, getData, patchData };
};
