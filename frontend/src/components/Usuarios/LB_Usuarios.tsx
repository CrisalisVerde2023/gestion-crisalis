import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { PencilFill, XCircleFill, Search, CheckCircleFill } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {
  fetchUsuarios,
  deleteUsuario
} from "../../controller/ABMUsuarioController";
import { UsuariosType } from "../types/userType";
import { ConfirmDialog } from "../ConfirmDialog";
import LoadingComponent from "../LoadingComponent";

export default function LB_Users() {
  const [data, setData] = useState<UsuariosType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedElement, setSelectedElement] = useState<UsuariosType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const fetchData = async () => {
    try {
      return await fetchUsuarios(setIsLoading, 0);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    fetchData().then((resp) => {
      setData(resp);
    });
  }, [location]);

  // Revisar!!!
  const onConfirm = () => {
    if (selectedElement) {
      deleteUsuario(selectedElement.id);
      setShowDialog(false);
      fetchData();
    }
  };

  const handleClickedElement = (selected: UsuariosType) => {
    setSelectedElement(selected);
    setShowDialog(true);
  };

  const actionButtons = (row: UsuariosType) => (
    <div className="d-flex flex-row justify-content-evenly align-items-center">
      <Button
        className="actionButton"
        onClick={() => handleClickedElement(row)}
      >
        {row.eliminado ? <CheckCircleFill /> : <XCircleFill />}
      </Button>
      <Link className="actionButton" to={`/usuarios/AMUsuarios/${row.id}`}>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Search />
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
                    <th>Usuario</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(!searchTerm.length ? data : data.filter((user: UsuariosType) => user.usuario.toLowerCase().includes(searchTerm.toLowerCase())))
                    .map((row, index) => (
                    <tr key={index}>
                      <td>{row.usuario}</td>
                      <td>{row.eliminado ? "Inactivo" : "Activo"}</td>
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
          title="Confirmar cambio de estado de usuario"
          content={`Esta por ${selectedElement.eliminado ? "activar" : "desactivar"} a ${selectedElement.usuario}`}
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
