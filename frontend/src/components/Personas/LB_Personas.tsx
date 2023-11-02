import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { PencilFill, XCircleFill, Search } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
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
        text: `Esta por ${selected.eliminado ? "activar" : "desactivar"} a ${
          selected.id
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

  const actionButtons = (row: PersonasType) => (
    <div className="flex-row d-flex justify-content-evenly align-items-center">
      <Button
        className="actionButton"
        onClick={() => handleClickedElement(row)}
      >
        <XCircleFill />
      </Button>
      <Link className="actionButton" to={`/personas/AMPersonas/${row.id}`}>
        <PencilFill />
      </Link>
    </div>
  );

  return (
    <>
      <Container>
        <Row
          className="flex-row d-flex justify-content-center align-items-center"
          style={{ marginBottom: "15px" }}
        >
          <Col xs="auto">
          <input
              type="text"
              placeholder="Buscar"
              className="inputSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button
              onClick={handleSearch}
              variant="primary"
              className="searchButton"
            >
              <Search />
            </Button>
          </Col>
        </Row>
        {/* Data Table */}
        <Row>
          {isLoading ? (
            <Col>
              <LoadingComponent />
            </Col>
          ) : (
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Acciones</th>
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
                        <tr key={index}>
                          <td>{row.id}</td>
                          <td>{row.nombre}</td>
                          <td>{row.apellido}</td>
                          <td>{row.dni}</td>
                          <td>{row.eliminado ? "Inactivo" : "Activo"}</td>
                          <td>{actionButtons(row)}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No hay datos...</td>
                    </tr>
                  )}
                </tbody>
              </Table>
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
