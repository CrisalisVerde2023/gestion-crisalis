import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import {
  PencilFill,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import { fetchClientes } from "../../controller/ABMClientController";
import { ClientesType } from "../types/clientType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";

export default function LB_Clientes() {
  const [data, setData] = useState<ClientesType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  let aux;
  const { userLogged } = useContext(UserLoggedContext);

  const fetchData = async () => {
    try {
      return await fetchClientes();
    } catch (error) {
      Swal.fire("Error!", "No se han podido obtener datos.", "error");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then((resp) => {
        console.log(resp)
      setData(resp);
      setIsLoading(false);
    });
  }, [location]);

  

  const actionButtons = (row: ClientesType) => (
    <div className="d-flex flex-row justify-content-evenly align-items-center">
      <Button
        className="actionButton"
        onClick={() => console.log("Eliminar presionado")}
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
        <Row>
            <Col>
            asdada
            </Col>
            
        </Row>
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
                    <th>Id</th>
                    <th>Tipo de Cliente</th>
                    <th>Persona</th>
                    <th>Empresa</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                        <tr key={index}>
                          <td>{row.id}</td>
                          <td>{row.empresa ? "EMPRESA" : "PERSONA"}</td>
                          <td>{row.persona.nombre}</td>
                          <td>{row.empresa ? row.empresa.nombre : "No posee"}</td>
                          <td>{row.eliminado ? "Inactivo" : "Activo"}</td>
                          <td>{actionButtons(row)}</td>
                        </tr>
                      ))
                  }
                </tbody>
              </Table>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
