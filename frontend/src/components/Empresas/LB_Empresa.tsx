import React, { useState, useEffect } from "react";
import {
  PencilFill,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import {
  useDeleteEmpresa,
  useFetchEmpresas,
} from "./../../controller/ABMEnterpriseController";
import { EnterpriseType } from "../types/enterpriseType";
import LoadingComponent from "../LoadingComponent";
import { formatDate } from "../../tools/formatDate";
import Swal from "sweetalert2";

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

  const actionButtons = (row: EnterpriseType) => {
    return (
      <div className="flex justify-between items-center">
        <button
          className="p-2 hover:bg-blue-600 hover:text-white"
          onClick={() => handleClickedElement(row)}
        >
          {row.eliminado ? <CheckCircleFill /> : <XCircleFill />}
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
              <table className="min-w-full bg-white border border-gray-300 ">
                <thead className="bg-denim-400 text-white">
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Nombre</th>
                    <th className="py-2 px-4 border-b">CUIT</th>
                    <th className="py-2 px-4 border-b">Fecha de Inicio</th>
                    <th className="py-2 px-4 border-b">Estado</th>
                    <th className="py-2 px-4 border-b">Acciones</th>
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
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{row.id}</td>
                          <td className="py-2 px-4">{row.nombre}</td>
                          <td className="py-2 px-4">{row.cuit}</td>
                          <td className="py-2 px-4">{row.start_date}</td>
                          <td className="py-2 px-4">
                            {row.eliminado ? "Inactivo" : "Activo"}
                          </td>
                          <td className="py-2 px-4">{actionButtons(row)}</td>
                        </tr>
                      ))
                  ) : (
                    <tr className="border-b">
                      <td colSpan={5} className="py-2 px-4">
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
