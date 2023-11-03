import React, { useState, useEffect } from "react";
import {
  PencilFill,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteImpuesto,
  useFetchImpuestos,
} from "../../controller/ABMImpuestoController"; 
import { ImpuestosType } from "../types/taxType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";

export default function LB_Impuestos() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<ImpuestosType[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  let aux;

  let fetchResponse = useFetchImpuestos(undefined, shouldFetch);
  let deleteResponse = useDeleteImpuesto(idToDelete, shouldDelete);

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
          "Cambio el estado del Impuesto correctamente",
          "success"
        );
        setShouldFetch(true);
      } else if (!deleteResponse.loading && deleteResponse.hasError) {
        if (deleteResponse.statusCode >= 400) {
          Swal.fire(
            "Atención!",
            "Error al cambiar el estado del Impuesto",
            "warning"
          );
        }
      }
    }
  }, [deleteResponse]); 

  const onConfirm = async (impuesto: ImpuestosType) => {
    if (impuesto) {
      console.log(`Id to delete is : ${impuesto.id}`);
      setIdToDelete(impuesto.id);
      setShouldDelete(true);
    }
  };

  const handleClickedElement = (selected: ImpuestosType) => {
    Swal.fire({
      title: "Confirmar cambio de estado de Impuesto?",
      text: `Esta por ${selected.eliminado ? "activar" : "desactivar"} a ${
        selected.eliminado
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

  const actionButtons = (row: ImpuestosType) => {
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
          onClick={() => navigate(`/impuestos/AMImpuestos/${row.id}`)}
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
                  <th className="py-2 px-4 border-b">Impuesto</th>
                  <th className="py-2 px-4 border-b">Porcentaje</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                (aux = !searchTerm.length
                  ? data
                  : data.filter((impuesto: ImpuestosType) =>
                      impuesto.nombre
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )).length ? (
                  aux
                    .sort((a: ImpuestosType, b: ImpuestosType) =>
                      a.nombre.toLowerCase() < b.nombre.toLowerCase() ? -1 : 1
                    )
                    .map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{row.nombre}</td>
                        <td className="py-2 px-4">{row.porcentaje}</td>
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
