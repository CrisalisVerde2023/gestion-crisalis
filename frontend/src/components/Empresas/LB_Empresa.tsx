import React, { useState, useEffect } from "react";
import {
  PencilFill,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteEmpresa,
  useFetchEmpresas,
} from "./../../controller/ABMEnterpriseController";
import { EnterpriseType } from "../types/enterpriseType";
import LoadingComponent from "../LoadingComponent";
import { formatDate } from "../../tools/formatDate";
import Swal from "sweetalert2";
import BuscarBar from "../UI Elements/BuscarBar";
import EditarBtn from "../UI Elements/EditarBtn";
import BorrarBtn from "../UI Elements/BorrarBtn";
import ToggleEstadoBtn from "../UI Elements/ToggleEstadoBtn";

export default function LB_Empresas() {
  const [data, setData] = useState<EnterpriseType[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedElement, setSelectedElement] = useState<EnterpriseType | null>(
    null
  );
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  let aux;
  const navigate = useNavigate();

  let fetchResponse = useFetchEmpresas(undefined, shouldFetch);
  let deleteResponse = useDeleteEmpresa(idToDelete, shouldDelete);

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

  const onConfirm = async (usuario: EnterpriseType) => {
    if (usuario) {
      console.log(`Id to delete is : ${usuario.id}`);
      setIdToDelete(usuario.id);
      setShouldDelete(true);
    }
  };

  function countEnterprises(): number {
    if (data) {
      return data.length;
    }
    return 0;
  }

  function findEnterpriseById(id: number): EnterpriseType | null {
    if (data) {
      const foundItem = data.find((item) => item.id === id);
      return foundItem ? foundItem : null;
    }
    return null;
  }

  function findEnterpriseByCUIT(cuit: string): EnterpriseType | null {
    if (data) {
      const foundItem = data.find((item) => item.cuit === cuit);
      return foundItem ? foundItem : null;
    }
    return null;
  }

  const handleClickedElement = (selected: EnterpriseType) => {
    Swal.fire({
      title: "Confirmar cambio de estado de usuario?",
      text: `Esta por ${selected.eliminado ? "activar" : "desactivar"} a ${
        selected.nombre
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

  const actionButtons = (row: EnterpriseType) => {
    return (
      <div className="flex justify-center space-x-4">
        <ToggleEstadoBtn
          fnOnClick={() => handleClickedElement(row)}
          estado={row.eliminado}
        />
        <EditarBtn
          fnOnClick={() => navigate(`/empresas/AMEmpresas/${row.id}`)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex items-center justify-center w-full p-4 pb-0 mx-auto mb-2 flex-column">
          <div className="w-full mx-auto max-w-screen-xl px-4 lg:px-12 flex items-center justify-center mb-3">
            <div className="mr-4 w-full flex justify-between">
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
                      ID
                    </th>
                    <th className="px-4 py-3 text-center border-b dark:border-gray-700">
                      Nombre
                    </th>
                    <th className="px-4 py-3 text-center border-b dark:border-gray-700">
                      CUIT
                    </th>
                    <th className="px-4 py-3 text-center border-b dark:border-gray-700">
                      Fecha de Inicio
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
                    : data.filter((enterprise: EnterpriseType) =>
                        enterprise.nombre
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )).length ? (
                    aux
                      .sort((a: EnterpriseType, b: EnterpriseType) =>
                        a.nombre.toLowerCase() < b.nombre.toLowerCase() ? -1 : 1
                      )
                      .map((row, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-700"
                        >
                          <td className="px-4 py-3 text-center">{row.id}</td>
                          <td className="px-4 py-3 text-center">
                            {row.nombre}
                          </td>
                          <td className="px-4 py-3 text-center">{row.cuit}</td>
                          <td className="px-4 py-3 text-center">
                            {row.start_date}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {actionButtons(row)}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr className="border-b dark:border-gray-700">
                      <td colSpan={6} className="px-4 py-3 text-center">
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
    </>
  );
}
