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

export const useCrud = (url: string) => {
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);
  const [estado, setEstado] = useState(defaultUseFetchValues);
  const navigate = useNavigate();
  const token = userLogged.token;

  useEffect(() => {
    getAllData(url);
  }, []);

  const getAllData = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        if (response.status === 401) {
          Swal.fire("Sesión expirada", "Será redirigido al login.", "error");
          setUserLogged(defaultUserLogState);
          navigate("/login");
        } else if (
          response.status === 400 ||
          (response.status > 401 && response.status <= 499)
        ) {
          throw new Error(
            `Hubo un error con la petición: ${response.status}: ${response.statusText}`
          );
        } else if (response.status >= 500) {
          throw new Error(
            `Hubo un error con el servidor: ${response.status}: ${response.statusText}`
          );
        }

        setEstado({ ...estado, hasError: true });
        return;
      }
      setEstado({
        json:
          response.ok && response.status < 400
            ? Array.isArray(json)
              ? json.sort((a, b) => a.id - b.id)
              : [json]
            : null,
        loading: false,
        hasError: !response.ok,
        statusCode: response.status,
      });
    } catch (error: any) {
      Swal.fire("Atención!", "Error al consultar", "warning");
      setEstado({ ...estado, hasError: true });
      console.error(error); // Log the full error for debugging

      // Check if error.config exists before trying to access error.config.url
      const url = error.config ? error.config.url : "unknown";
      throw new Error(
        `Ocurrió un error: "${error.name}" con codigo: "${error.code}" y mensaje: "${error.message}" al hacer la peticion a "${url}"`
      );
    }
  };

  const deleteByIdData = async (id: number) => {
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

      getAllData();

      setEstado({
        ...estado,
        loading: false,
        statusCode: response.status,
      });
    } catch (error) {
      Swal.fire("Atención!", "Error al eliminar", "warning");
      setEstado({ ...estado, hasError: true });

      // When you need to throw the error
      throw new Error(
        `Ocurrió un error: "${error.name}" con codigo: "${error.code}" y mensaje: "${error.message}" al hacer la peticion a "${error.config.url}"`
      );
    }
  };

  const create = async ({ body }) => {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
        text: "Se ha creado.",
        icon: "success",
        timer: 2000,
      });

      getAllData();

      setEstado({
        ...estado,
        loading: false,
        statusCode: response.status,
      });
    } catch (error) {
      setEstado({ ...estado, hasError: true });
      Swal.fire("Atención!", "Error al crear", "warning");

      throw new Error(
        `Ocurrió un error: "${error.name}" con codigo: "${error.code}" y mensaje: "${error.message}" al hacer la peticion a "${error.config.url}"`
      );
    }
  };

  const updateByIdData = async ({ id, body }) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
        text: "Se ha actualizado.",
        icon: "success",
        timer: 2000,
      });

      getAllData();

      setEstado({
        ...estado,
        /* json: newJson, */
        loading: false,
        statusCode: response.status,
      });
    } catch (error) {
      setEstado({ ...estado, hasError: true });
      Swal.fire("Atención!", "Error al actualizar", "warning");

      throw new Error(
        `Ocurrió un error: "${error.name}" con codigo: "${error.code}" y mensaje: "${error.message}" al hacer la peticion a "${error.config.url}"`
      );
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    estado,
    getAllData,
    deleteByIdData,
    create,
    updateByIdData,
    goBack,
  };
};
