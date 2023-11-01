import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { PencilFill, XCircleFill, Search } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {
  fetchEnterprises,
  selectAll as selectAllEnterprise,
  deleteEnterprise,
  modifyEnterprise,
} from "./../../controller/ABMEnterpriseController";
import { EnterpriseType } from "../types/enterpriseType";
import { ConfirmDialog } from "../ConfirmDialog";
import LoadingComponent from "../LoadingComponent";
import { formatDate } from "../../tools/formatDate";

export default function LB_Empresas() {
  const [data, setData] = useState<EnterpriseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedElement, setSelectedElement] = useState<EnterpriseType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const fetchData = async () => {
    try {
      const fetchedData = await fetchEnterprises(setIsLoading);
      setData(fetchedData);
      console.log(fetchedData)
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    if (selectAllEnterprise().length === 0) {
      fetchData();
    } else {
      setData(selectAllEnterprise());
    }
  }, [location]);

  const handleSearch = () => {
    const filteredData = selectAllEnterprise().filter(
      (empresa: EnterpriseType) =>
        empresa.id.toString().includes(searchTerm) ||
        empresa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empresa.cuit.replace(/-/g, "").includes(searchTerm.replace(/-/g, ""))
    );
    setData(filteredData);
  };

  const onConfirm = () => {
    if (selectedElement) {
      deleteEnterprise(selectedElement.id);
      setShowDialog(false);
      setData(selectAllEnterprise());
    }
  };

  const handleClickedElement = (selected: EnterpriseType) => {
    setSelectedElement(selected);
    setShowDialog(true);
  };

  const actionButtons = (row: EnterpriseType) => (
    <div className="d-flex flex-row justify-content-evenly align-items-center">
      <Button
        className="actionButton"
        onClick={() => handleClickedElement(row)}
      >
        <XCircleFill />
      </Button>
      <Link className="actionButton" to={`/empresas/AMEmpresas/${row.id}`}>
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
                  setData(selectAllEnterprise());
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
                    <th>CUIT</th>
                    <th>Fecha de Inicio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.nombre}</td>
                      <td>{row.cuit}</td>
                      <td>{row.start_date}</td>
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
          content={`Esta por borrar ${selectedElement.nombre} con CUIT: ${selectedElement.cuit}`}
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
