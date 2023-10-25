import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import {
  PencilFill,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchUsuarios,
  deleteUsuario,
} from "../../controller/ABMUsuarioController";
import { UsuariosType } from "../types/userType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";

export default function LB_Users() {
  const [data, setData] = useState<UsuariosType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  let aux;
  const { userLogged } = useContext(UserLoggedContext);

  const fetchData = async () => {
    try {
      return await fetchUsuarios(0);
    } catch (error) {
      const regex = /\/usuarios($|\/(?![\w-]))/;
      if (regex.test(window.location.pathname)) {
        Swal.fire("Error!", "No se han podido obtener datos.", "error");
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then((resp) => {
      setData(resp);
      setIsLoading(false);
    });
  }, [location]);

  const onConfirm = (usuario: UsuariosType) => {
    if (usuario)
      deleteUsuario(usuario.id)
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

  const handleClickedElement = (selected: UsuariosType) => {
    if (selected.id === userLogged.id)
      Swal.fire(
        "Error!",
        "No es posible cambiar el estado del usuario logueado.",
        "error"
      );
    else
      Swal.fire({
        title: "Confirmar cambio de estado de usuario?",
        text: `Esta por ${selected.eliminado ? "activar" : "desactivar"} a ${
          selected.usuario
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

  const actionButtons = (row: UsuariosType) => {
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
          onClick={() => navigate(`/usuarios/AMUsuarios/${row.id}`)}
        >
          <PencilFill />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="w-full flex flex-column justify-center items-center mb-4 mx-auto p-4">
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            placeholder="Buscar"
            className="inputSearch border-2 border-blue-500 px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingComponent />
          </div>
        ) : (
          <div className="w-full">
            <table className="min-w-full bg-white border border-gray-300 ">
              <thead className="bg-denim-400 text-white">
                <tr>
                  <th className="py-2 px-4 border-b">Usuario</th>
                  <th className="py-2 px-4 border-b">Estado</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                (aux = !searchTerm.length
                  ? data
                  : data.filter((user: UsuariosType) =>
                      user.usuario
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )).length ? (
                  aux
                    .sort((a: UsuariosType, b: UsuariosType) =>
                      a.usuario.toLowerCase() < b.usuario.toLowerCase() ? -1 : 1
                    )
                    .map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{row.usuario}</td>
                        <td className="py-2 px-4">
                          {row.eliminado ? "Inactivo" : "Activo"}
                        </td>
                        <td className="py-2 px-4">{actionButtons(row)}</td>
                      </tr>
                    ))
                ) : (
                  <tr className="border-b">
                    <td colSpan={3} className="py-2 px-4">
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
