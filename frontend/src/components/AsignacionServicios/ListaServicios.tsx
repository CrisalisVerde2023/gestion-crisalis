import React, { useState, useEffect, useContext } from "react";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import LoadingComponent from "../LoadingComponent";
import Swal from 'sweetalert2';
// import { fetchServicios, cambiarEstadoServicio } from "../../controller/ServicioController";
import { ServicioType } from "../types/ServicioType";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";

export default function ListaServicios() {
  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userLogged } = useContext(UserLoggedContext);


const fetchData = async () => {
    try {
      // Cambia la URL según tus necesidades
      const response = await fetch('http://localhost:8080/api/suscripciones', {
        headers: {
         "Content-Type": "application/json",
          Authorization: `Bearer ${userLogged.token}`, // Asegúrate de ajustar esto según tu autenticación
        },
      });
      console.log(response)

      const json = await response.json();

      setServicios(response.data || []);
      console.log(json);

    } catch (error) {
      Swal.fire('Error!', 'No se han podido obtener datos de servicios.', 'error');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const cambiarEstado = (idServicio: number) => {
    cambiarEstadoServicio(userLogged, idServicio)
      .then(() => {
        Swal.fire({
          title: 'Realizado!',
          text: 'Se ha cambiado el estado del servicio.',
          icon: 'success',
          timer: 2000
        });
        // Puedes actualizar la lista de servicios si lo deseas
        fetchData();
      })
      .catch(() => {
        Swal.fire('Error!', 'No se ha podido cambiar el estado del servicio.', 'error');
      });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Data Table */}
      <div>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300">ID</th>
                {/* Agrega aquí más encabezados según los campos de tu ServicioType */}
                <th className="border border-gray-300">Estado</th>
                <th className="border border-gray-300">Fecha</th>
                <th className="border border-gray-300">Persona</th>
                <th className="border border-gray-300">Empresa</th>
                <th className="border border-gray-300">Servicio</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio.id}>
                  <td className="border border-gray-300">{servicio.id}</td>
                  <td className="border border-gray-300">{servicio.estado}</td>
                  <td className="border border-gray-300">{servicio.fecha}</td>
                  <td className="border border-gray-300">{servicio.persona}</td>
                  <td className="border border-gray-300">{servicio.empresa}</td>
                  <td className="border border-gray-300">{servicio.servicio}</td>


                  <td className="border border-gray-300">
                    <button
                      className="actionButton"

                    >
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
