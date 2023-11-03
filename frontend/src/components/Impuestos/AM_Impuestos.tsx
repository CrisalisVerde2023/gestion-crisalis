import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreateImpuesto,
  useModifyImpuestos,
  useFetchImpuestos,
} from "./../../controller/ABMImpuestoController";
import { ImpuestosType, defaultImpuestosType } from "./../types/taxType";
import Swal from "sweetalert2";
import { useFetchReturnType } from "../../hooks/useFetch";

export default function AM_Impuestos() {
  const { idImpuesto } = useParams<{ idImpuesto: string }>();
  const idToModify = idImpuesto ? parseInt(idImpuesto, 10) : undefined;
  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldModify, setShouldModify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let fetchedData: useFetchReturnType | null = null;
  const [response, setResponse] = useState<useFetchReturnType | null>(null);
  const [formData, setFormData] = useState<ImpuestosType>(defaultImpuestosType);

  const createResponse = useCreateImpuesto(formData, shouldCreate);
  const modifyResponse = useModifyImpuestos(formData, shouldModify);

  if (idToModify !== undefined) {
    fetchedData = useFetchImpuestos(idToModify, true);
  }

  useEffect(() => {
    if (fetchedData && !fetchedData.hasError && fetchedData.json) {
      setFormData({ ...fetchedData.json, password: "" });
    }
  }, [fetchedData]);

  useEffect(() => {
    if (response) {
      if (!response.loading && !response.hasError && response.json) {
        console.log("here");
      } else if (!response.loading && response.hasError) {
        // logic for handling errors
      }
    }
  }, [response]);

  const goBack = () => {
    navigate(-1);
  };

  const isFormComplete = () => {
    const errors = [];
    if (!formData.nombre) errors.push("El nombre es obligatorio");
    if (!formData.porcentaje) errors.push("El apellido es obligatorio");

    return errors.length === 0;
  };

  const handleSubmit = () => {
    const complete = isFormComplete();

    if (complete) {
      console.log("ok");
      Swal.fire({ text: "Espere por favor...", showConfirmButton: false });
      if (!idToModify) {
        setShouldCreate(true);
      } else {
        setShouldModify(true);
      }
    } else {
      Swal.fire(
        "Atención!",
        "Debe completar los campos requeridos correctamente.",
        "warning"
      );
    }
  };

  useEffect(() => {
    Swal.close();
    if (createResponse && shouldCreate) {
      setShouldCreate(false);
      if (!createResponse.loading && !createResponse.hasError) {
        Swal.fire("Perfecto!", "Usuario creado correctamente", "success");
        goBack();
      } else if (!createResponse.loading && createResponse.hasError) {
        if (createResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al crear usuario", "warning");
        }
      }
    }
    if (modifyResponse && shouldModify) {
      setShouldModify(false);
      console.log(modifyResponse);
      if (!modifyResponse.loading && !modifyResponse.hasError) {
        Swal.fire("Perfecto!", "Usuario modificado correctamente", "success");
        goBack();
      } else if (!modifyResponse.loading && modifyResponse.hasError) {
        if (modifyResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al modificar usuario", "warning");
        }
      }
    }
  }, [createResponse, modifyResponse]);

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
              setFormData({ ...formData, porcentaje: Number(e.target.value) })
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
