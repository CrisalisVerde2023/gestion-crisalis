import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { PencilFill, XCircleFill, Search, CheckCircleFill } from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchPersonas,
  selectAll as selectAllPersonas,
  deletePersona,
  modifyPersona,
} from "./../../controller/ABMPersonController";
import { PersonasType } from "../types/personType";
import { ConfirmDialog } from "../ConfirmDialog";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";

let aux;

export default function LB_Personas() {
  const [data, setData] = useState<PersonasType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const fetchData = async () => {
    try {
      return await fetchPersonas(0);
    } catch (error) {
      Swal.fire("Error!", "No se han podido obtener datos.", "error");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then((resp) => {
      setData(resp);
      setIsLoading(false);
    });
  }, [location]);

  const handleSearch = () => {
    const filteredData = selectAllPersonas().filter(
      (persona: PersonasType) =>
        persona.id.toString().includes(searchTerm) ||
        persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.dni.includes(searchTerm)
    );
    setData(filteredData);
  };

  const onConfirm = (persona: PersonasType) => {
    if (persona)
      deletePersona(persona.id)
        .then(() => {
          fetchData().then((resp) => {
            setData(resp);
            Swal.fire({
              title: "Realizado!",
              text: "Se ha cambiado el estado.",
              icon: "success",
              timer: 2000,
            });
          });
        })
        .catch(() => {
          Swal.fire("Error!", "No se ha podido cambiar el estado.", "error");
        });
  };

  const handleClickedElement = (selected: PersonasType) => {
    Swal.fire({
      title: "Confirmar cambio de estado de usuario?",
      text: `Esta por ${selected.eliminado ? "activar" : "desactivar"} a ${selected.id
        }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí! Estoy seguro.",
      cancelButtonText: "Mejor no.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) onConfirm(selected);
    });
  };

  // const actionButtons = (row: PersonasType) => (
  //   <div className="flex-row d-flex justify-content-evenly align-items-center">
  //     <button
  //       className="p-2 hover:bg-blue-600 hover:text-white"
  //       onClick={() => handleClickedElement(row)}
  //     >
  //       <XCircleFill />
  //     </button>
  //     <button
  //       className="p-2 hover:bg-blue-600 hover:text-white"
  //       onClick={() => navigate(`/personas/AMPersonas/${row.id}`)}
  //     >
  //       <PencilFill />
  //     </button>
  //   </div>
  // );


  const actionButtons = (row: PersonasType) => {
    return (
      <div className="flex-row d-flex justify-content-evenly align-items-center">
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
              className="px-2 py-1 border-2 border-blue-500 inputSearch"
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
                      : data.filter((persona: PersonasType) =>
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
                        a.nombre.toLowerCase() < b.nombre.toLowerCase()
                          ? -1
                          : 1
                      )
                      .map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{row.id}</td>
                          <td className="py-2">{row.nombre}</td>
                          <td className="py-2">{row.apellido}</td>
                          <td className="py-2">{row.dni}</td>
                          <td>{row.eliminado ? <p className="font-bold text-red-600">Inactivo</p> : <p className="font-bold text-green-600">Activo</p>}</td>
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
      {showDialog && (
        <ConfirmDialog
          show={showDialog}
          setShow={setShowDialog}
          title="Confirmar borrar persona"
          onConfirm={onConfirm}
          onCancel={() => {
            setShowDialog(false);

          }}
        />
      )}
    </>
  );
}
