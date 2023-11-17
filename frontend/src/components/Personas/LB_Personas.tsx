import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import {
  PencilFill,
  XCircleFill,
  Search,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useFetchPersonas,
  useDeletePersonas,
} from "./../../controller/ABMPersonController";
import { PersonasType } from "../types/personType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import BuscarBar from "../UI Elements/BuscarBar";
import BorrarBtn from "../UI Elements/BorrarBtn";
import EditarBtn from "../UI Elements/EditarBtn";
import ToggleEstadoBtn from "../UI Elements/ToggleEstadoBtn";

export default function LB_Personas() {
  const [data, setData] = useState<PersonasType[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  let aux;

  let fetchResponse = useFetchPersonas(undefined, shouldFetch);
  let deleteResponse = useDeletePersonas(idToDelete, shouldDelete);

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
          "Cambio el estado del persona correctamente",
          "success"
        );
        setShouldFetch(true);
      } else if (!deleteResponse.loading && deleteResponse.hasError) {
        if (deleteResponse.statusCode >= 400) {
          Swal.fire(
            "Atención!",
            "Error al cambiar el estado de la persona",
            "warning"
          );
        }
      }
    }
  }, [deleteResponse]);

  const handleSearch = () => {
    if (data) {
      const filteredData = data.filter(
        (persona: PersonasType) =>
          persona.id.toString().includes(searchTerm) ||
          persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          persona.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
          persona.dni.includes(searchTerm)
      );
      setData(filteredData);
    }
  };

  const onConfirm = async (persona: PersonasType) => {
    if (persona) {
      console.log(`Id to delete is : ${persona.id}`);
      setIdToDelete(persona.id);
      setShouldDelete(true);
    }
  };

  const handleClickedElement = (selected: PersonasType) => {
    Swal.fire({
      title: "Confirmar cambio de estado de una persona?",
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

  const actionButtons = (row: PersonasType) => {
    return (
      <div className="flex justify-center space-x-4">
        <ToggleEstadoBtn
          fnOnClick={() => handleClickedElement(row)}
          estado={row.eliminado}
        />
        <EditarBtn
          fnOnClick={() => navigate(`/personas/AMPersonas/${row.id}`)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-3 p-4 bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex items-center justify-center w-full mb-4">
          <BuscarBar fnOnChange={handleSearchChange} value={searchTerm} />
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingComponent />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
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
                    Apellido
                  </th>
                  <th className="px-4 py-3 text-center border-b dark:border-gray-700">
                    DNI
                  </th>
                  <th className="px-4 py-3 text-center border-b dark:border-gray-700">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-center border-b dark:border-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && data.length ? (
                  data
                    .filter(
                      (persona: PersonasType) =>
                        persona.nombre
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        persona.apellido
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        persona.dni
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        persona.id.toString() === searchTerm
                    )
                    .sort((a: PersonasType, b: PersonasType) =>
                      a.nombre.toLowerCase() < b.nombre.toLowerCase() ? -1 : 1
                    )
                    .map((row, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <td className="px-4 py-3 text-center">{row.id}</td>
                        <td className="px-4 py-3 text-center">{row.nombre}</td>
                        <td className="px-4 py-3 text-center">
                          {row.apellido}
                        </td>
                        <td className="px-4 py-3 text-center">{row.dni}</td>
                        <td className="px-4 py-3 text-center">
                          {row.eliminado ? "Inactivo" : "Activo"}
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
    </>
  );
}
