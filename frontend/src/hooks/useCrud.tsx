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

export const useCrud = (url) => {
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);
  const [estado, setEstado] = useState(defaultUseFetchValues);
  const navigate = useNavigate();
  const token = userLogged.token;

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
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

      setEstado({
        json:
          response.ok && response.status < 400
            ? json.sort((a, b) => a.id > b.id)
            : null,
        loading: false,
        hasError: response.ok ? false : true,
        statusCode: response.status,
      });
    } catch (error) {
      Swal.fire("Atención!", "Error al consultar", "warning");
      setEstado({ ...estado, hasError: true });
      throw new Error(
        `Ocurrió un error: "${error.name}" con codigo: "${error.code}" y mensaje: "${error.message}" al hacer la peticion a "${error.config.url}"`
      );
    }
  };

  const deleteByIdData = async ({ id }) => {
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

      const { json } = { ...estado };
      const impuestoIndex = json.findIndex((impuesto) => impuesto.id == id);
      const newJson = [
        ...json.slice(0, impuestoIndex),
        {
          ...body,
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
      Swal.fire("Atención!", "Error al actualizar", "warning");

      throw new Error(
        `Ocurrió un error: "${error.name}" con codigo: "${error.code}" y mensaje: "${error.message}" al hacer la peticion a "${error.config.url}"`
      );
    }
  };

  return {
    estado,
    getAllData,
    deleteByIdData,
    create,
    updateByIdData,
  };
};
