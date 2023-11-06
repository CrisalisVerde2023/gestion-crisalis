import React, { useState, useEffect } from "react";
import { PencilFill, XCircleFill } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {
  useFetchEmpresa,
  useDeleteEmpresa,
} from "./../../controller/ABMEnterpriseController";
import { EnterpriseType } from "../types/enterpriseType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";

export default function LB_Empresas() {
  const [data, setData] = useState<EnterpriseType[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedElement, setSelectedElement] = useState<EnterpriseType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);

  function countEnterprises(): number {
    return Number(data && data.length);
  }

  function findEnterpriseById(id: number): EnterpriseType | null {
    if (data) {
      const foundItem = data.find((item) => item.id === id);
      return foundItem ? foundItem : null;
    } else {
      return null;
    }
  }

  function findEnterpriseByCUIT(cuit: string): EnterpriseType | null {
    if (data) {
      const foundItem = data.find((item) => item.cuit === cuit);
      return foundItem ? foundItem : null;
    } else {
      return null;
    }
  }

  let fetchResponse = useFetchEmpresa(undefined, shouldFetch);
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

  const onConfirm = async (empresa: EnterpriseType) => {
    if (empresa) {
      console.log(`Id to delete is : ${empresa.id}`);
      setIdToDelete(empresa.id);
      setShouldDelete(true);
    }
  };

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

  const actionButtons = (row: EnterpriseType) => {
    return (
      <div className="d-flex flex-row justify-content-evenly align-items-center">
        <button
          className="actionButton"
          onClick={() => handleClickedElement(row)}
        >
          <XCircleFill />
        </button>
        <Link className="actionButton" to={`/empresas/AMEmpresas/${row.id}`}>
          <PencilFill />
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center mb-4">
          <div className="flex-auto">
            <input
              type="text"
              placeholder="Buscar"
              className="inputSearch border-2 border-blue-500 px-2 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          {isLoading ? (
            <div>
              <LoadingComponent />
            </div>
          ) : (
            <div>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300">ID</th>
                    <th className="border border-gray-300">Nombre</th>
                    <th className="border border-gray-300">CUIT</th>
                    <th className="border border-gray-300">Fecha de Inicio</th>
                    <th className="border border-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300">{row.id}</td>
                        <td className="border border-gray-300">{row.nombre}</td>
                        <td className="border border-gray-300">{row.cuit}</td>
                        <td className="border border-gray-300">
                          {row.start_date}
                        </td>
                        <td className="border border-gray-300">
                          {actionButtons(row)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
