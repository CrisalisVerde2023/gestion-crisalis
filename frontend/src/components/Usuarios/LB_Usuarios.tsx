import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import {
  PencilFill,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import {
  useFetchUsuarios,
  useDeleteUsuario,
} from "../../controller/ABMUsuarioController";
import { UsuariosType } from "../types/userType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import BuscarBar from "../UI Elements/BuscarBar";
import EditarBtn from "../UI Elements/EditarBtn";
import BorrarBtn from "../UI Elements/BorrarBtn";
import ToggleEstadoBtn from "../UI Elements/ToggleEstadoBtn";

export default function LB_Users() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<UsuariosType[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { userLogged } = useContext(UserLoggedContext);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  let aux;

  let fetchResponse = useFetchUsuarios(undefined, shouldFetch);
  let deleteResponse = useDeleteUsuario(idToDelete, shouldDelete);

  useEffect(() => {
    if (fetchResponse && shouldFetch) {
      if (
        !fetchResponse.loading &&
        !fetchResponse.hasError &&
        fetchResponse.json
      ) {
        setData(fetchResponse.json);
        setShouldFetch(false);
      } else if (!fetchResponse.loading && fetchResponse.hasError) {
        Swal.fire("Error!", "No se han podido obtener datos.", "error");
        setData(null);
      }
    }
  }, [fetchResponse]);

  useEffect(() => {
    if (deleteResponse && shouldDelete) {
      setShouldDelete(false);
      if (!deleteResponse.loading && !deleteResponse.hasError) {
        Swal.fire(
          "Perfecto!",
          "Cambio el estado del usuario correctamente",
          "success"
        );
        setShouldFetch(true);
      } else if (!deleteResponse.loading && deleteResponse.hasError) {
        if (deleteResponse.statusCode >= 400) {
          Swal.fire(
            "Atención!",
            "Error al cambiar el estado del usuario",
            "warning"
          );
        }
      }
    }
  }, [deleteResponse]);

  const onConfirm = async (usuario: UsuariosType) => {
    if (usuario) {
      console.log(`Id to delete is : ${usuario.id}`);
      setIdToDelete(usuario.id);
      setShouldDelete(true);
    }
  };

  const handleClickedElement = (selected: UsuariosType) => {
    if (selected.id === userLogged.id)
      Swal.fire(
        "Error!",
        "No es posible cambiar el estado del usuario logueado.",
        "error"
      );
    else
      Swal.fire({
        title: "Confirmar cambio de estado de usuario?",
        text: `Esta por ${selected.eliminado ? "activar" : "desactivar"} a ${
          selected.usuario
        }`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí! Estoy seguro.",
        cancelButtonText: "Mejor no.",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm(selected);
        } else if (result.isDenied || result.isDismissed) {
        }
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const actionButtons = (row: UsuariosType) => {
    return (
      <div className="flex justify-center space-x-4">
        <ToggleEstadoBtn
          fnOnClick={() => handleClickedElement(row)}
          estado={row.eliminado}
        />
        <EditarBtn
          fnOnClick={() => navigate(`/usuarios/AMUsuarios/${row.id}`)}
        />
      </div>
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex items-center justify-center w-full p-4 pb-0 mx-auto mb-2 flex-column">
          <div className="w-full mx-auto max-w-screen-xl px-4 lg:px-12 flex items-center justify-center mb-3">
            <div className="mr-4 w-full flex justify-content-center">
              <BuscarBar fnOnChange={handleSearchChange} value={searchTerm} />
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center">
              <LoadingComponent />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3 text-center border-b dark:border-gray-700">
                      Usuario
                    </th>
                    <th className="px-4 py-3 text-center border-b dark:border-gray-700">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                  (aux = !searchTerm.length
                    ? data
                    : data.filter((user: UsuariosType) =>
                        user.usuario
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )).length ? (
                    aux
                      .sort((a: UsuariosType, b: UsuariosType) =>
                        a.usuario.toLowerCase() < b.usuario.toLowerCase()
                          ? -1
                          : 1
                      )
                      .map((row, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-700"
                        >
                          <td className="px-4 py-3 text-center">
                            {row.usuario}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {actionButtons(row)}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr className="border-b dark:border-gray-700">
                      <td colSpan={3} className="px-4 py-3 text-center">
                        No hay datos...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
