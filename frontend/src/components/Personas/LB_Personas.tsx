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

export default function LB_Personas() {
  const [data, setData] = useState<PersonasType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedElement, setSelectedElement] = useState<PersonasType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const fetchData = async () => {
    try {
      const fetchedData = await fetchPersonas(setIsLoading);
      setData(fetchedData);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    if (selectAllPersonas().length === 0) {
      fetchData();
    } else {
      setData(selectAllPersonas());
    }
  }, [location]);

  const handleSearch = () => {
    const filteredData = selectAllPersonas().filter(
      (persona: PersonasType) =>
        persona.id.toString().includes(searchTerm) ||
        persona.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.dni.includes(searchTerm)
    );
    setData(filteredData);
  };

  const onConfirm = () => {
    if (selectedElement) {
      deletePersona(selectedElement.id);
      setShowDialog(false);
      setData(selectAllPersonas());
    }
  };

  const handleClickedElement = (selected: PersonasType) => {
    setSelectedElement(selected);
    setShowDialog(true);
  };

  const actionButtons = (row: PersonasType) => (
    <div className="d-flex flex-row justify-content-evenly align-items-center">
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
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ marginBottom: "15px" }}
        >
          <Col xs="auto">
            <input
              type="text"
              placeholder="Buscar"
              className="inputSearch"
              value={searchTerm}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  setData(selectAllPersonas());
                  setSearchTerm("");
                } else {
                  setSearchTerm(e.target.value);
                }
              }}
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
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.dni}</td>
                      <td>{actionButtons(row)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          )}
        </Row>
      </Container>
      {showDialog && selectedElement && (
        <ConfirmDialog
          show={showDialog}
          setShow={setShowDialog}
          title="Confirmar borrar persona"
          content={`Esta por borrar ${selectedElement.firstName} ${selectedElement.lastName} con ID: ${selectedElement.id}`}
          onConfirm={onConfirm}
          onCancel={() => {
            setShowDialog(false);
            setSelectedElement(null);
          }}
        />
      )}
    </>
  );
}
