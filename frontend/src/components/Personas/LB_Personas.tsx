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

  const actionButtons = (row: PersonasType) => {
    return (
      <div className="flex justify-between items-center">
        <button
          className="p-2 hover:bg-blue-600 hover:text-white"
          onClick={() => handleClickedElement(row)}
        >
          {row.eliminado ? <CheckCircleFill /> : <XCircleFill />}
        </button>
        <button
          className="p-2 hover:bg-blue-600 hover:text-white"
          onClick={() => navigate(`/personas/AMPersonas/${row.id}`)}
        >
          <PencilFill />
        </button>
      </div>
    );
  };

  return (
    <>
      <Container>
        <Row
          className="flex-row d-flex justify-content-center align-items-center "
          style={{ marginBottom: "15px" }}
        >
          <Col xs="auto">
            <input
              type="text"
              placeholder="Buscar"
              className="inputSearch border-2 border-blue-500 px-2 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>
        {/* Data Table */}
        <Row>
          {isLoading ? (
            <Col>
              <LoadingComponent />
            </Col>
          ) : (
            <Col className="w-full">
              <table className="min-w-full bg-white border-gray-300">
                <thead className="text-white bg-denim-400 ">
                  <tr>
                    <th className="px-4 py-2 border-b">ID</th>
                    <th className="px-4 py-2 border-b">Nombre</th>
                    <th className="px-4 py-2 border-b">Apellido</th>
                    <th className="px-4 py-2 border-b">DNI</th>
                    <th className="px-4 py-2 border-b">Estado</th>
                    <th className="px-4 py-2 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                  (aux = !searchTerm.length
                    ? data
                    : data.filter(
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
                          persona.id === parseInt(searchTerm)
                      )).length ? (
                    aux
                      .sort((a: PersonasType, b: PersonasType) =>
                        a.nombre.toLowerCase() < b.nombre.toLowerCase() ? -1 : 1
                      )
                      .map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{row.id}</td>
                          <td className="py-2">{row.nombre}</td>
                          <td className="py-2">{row.apellido}</td>
                          <td className="py-2">{row.dni}</td>
                          <td className="py-2">
                            {row.eliminado ? "Inactivo" : "Activo"}
                          </td>
                          <td className="py-2">{actionButtons(row)}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No hay datos...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
