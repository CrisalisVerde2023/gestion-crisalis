import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createImpuesto,
  modifyImpuesto,
  fetchImpuestos,
} from "./../../controller/ABMImpuestoController";
import { ImpuestosType } from "./../types/taxType";
import Swal from "sweetalert2";

export default function AM_Impuestos() {
  const { idImpuesto } = useParams<{ idImpuesto: string }>();
  const idToModify = idImpuesto ? parseInt(idImpuesto, 10) : undefined;
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState<ImpuestosType>({
    id: 0,
    nombre: "",
    porcentaje: 0.0,
    eliminado: false,
  });

  const isFormComplete = () => {
    const errors = [];
    if (!formData.nombre) errors.push("El nombre es obligatorio");
    if (!formData.porcentaje) errors.push("El apellido es obligatorio");

    return errors.length === 0;
  };

  useEffect(() => {
    if (idToModify === undefined) {
      setFormData({
        ...formData,
        /* id: 0, */
      });
    } else {
      fetchData().then((resp) => {
        setFormData({ ...resp });
      });
    }
  }, []);

  const fetchData = async () => {
    try {
      return await fetchImpuestos(idToModify || 0);
    } catch (error) {
      Swal.fire("Error!", "No se han podido obtener los datos.", "error").then(
        () => goBack()
      );
    }
  };

  const handleSubmit = async () => {
    if (isFormComplete()) {
      try {
        !idToModify
          ? await createImpuesto(formData)
          : await modifyImpuesto(formData);

        goBack();
      } catch (error) {
        console.error("Error while saving data:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 containerAM">
      <div className="flex justify-center">
        <h4 className="headerStyles">Alta y modificación de Impuestos</h4>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-1/2">
          <label className="block text-gray-700">ID: {formData.id}</label>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700">porcentaje</label>
          <input
            type="text"
            value={formData.porcentaje}
            onChange={(e) =>
              setFormData({ ...formData, porcentaje: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
      <button
        //disabled={!isFormComplete()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
