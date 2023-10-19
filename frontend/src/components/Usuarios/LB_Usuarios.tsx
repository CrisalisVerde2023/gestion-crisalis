import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { PencilFill, XCircleFill, CheckCircleFill } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {
  fetchUsuarios,
  deleteUsuario
} from "../../controller/ABMUsuarioController";
import { UsuariosType } from "../types/userType";
import LoadingComponent from "../LoadingComponent";
import Swal from 'sweetalert2';
import { UserLoggedContext } from "../../contexts/UserLoggedContext";

export default function LB_Users() {
  const [data, setData] = useState<UsuariosType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  let aux;
  const { userLogged } = useContext(UserLoggedContext);

  const fetchData = async () => {
    try {
      return await fetchUsuarios(0);
    }
    catch (error) {
      Swal.fire('Error!', 'No se han podido obtener datos.', 'error')
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then(resp => {
      setData(resp);
      setIsLoading(false);
    });
  }, [location]);

  const onConfirm = (usuario: UsuariosType) => {
    if (usuario)
      deleteUsuario(usuario.id)
      .then(() => {
        fetchData().then(resp => {
          setData(resp);
          Swal.fire({
            title: 'Realizado!',
            text: 'Se ha cambiado el estado.',
            icon: 'success',
            timer: 2000
          })
        })
      })
      .catch(() => {
        Swal.fire('Error!', 'No se ha podido cambiar el estado.', 'error')
      });
  };

  const handleClickedElement = (selected: UsuariosType) => {
    if (selected.id === userLogged.id)
      Swal.fire('Error!', 'No es posible cambiar el estado del usuario logueado.', 'error');
    else
      Swal.fire({
        title: 'Confirmar cambio de estado de usuario?',
        text: `Esta por ${selected.eliminado ? "activar" : "desactivar"} a ${selected.usuario}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí! Estoy seguro.',
        cancelButtonText: 'Mejor no.',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) onConfirm(selected);
      })
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
                  {data && (aux = (!searchTerm.length ? data : data.filter((user: UsuariosType) => user.usuario.toLowerCase().includes(searchTerm.toLowerCase())))).length
                    ? aux.sort((a: UsuariosType, b: UsuariosType) => (a.usuario.toLowerCase() < b.usuario.toLowerCase()) ? -1 : 1)
                      .map((row, index) => (
                        <tr key={index}>
                          <td>{row.usuario}</td>
                          <td>{row.eliminado ? "Inactivo" : "Activo"}</td>
                          <td>{actionButtons(row)}</td>
                        </tr>
                      ))
                    : <tr><td colSpan={3}>No hay datos...</td></tr>
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
