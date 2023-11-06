import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreateEmpresa,
  useFetchEmpresa,
  useModifyEmpresa,
} from "./../../controller/ABMEnterpriseController";
import {
  EnterpriseType,
  defaultEnterpriseType,
} from "./../types/enterpriseType";
import { formatDate, formatDateToInput } from "../../tools/formatDate";
import { useFetchReturnType } from "../../hooks/useFetch";
import Swal from "sweetalert2";

export default function AM_Empresa() {
  const { idEnterprise } = useParams<{ idEnterprise: string }>();
  const idToModify =
    idEnterprise !== undefined
      ? idEnterprise === "0"
        ? 0
        : parseInt(idEnterprise)
      : undefined;
  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldModify, setShouldModify] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [response, setResponse] = useState<useFetchReturnType | null>(null);
  const [formData, setFormData] = useState<EnterpriseType>(
    defaultEnterpriseType
  );

  const goBack = () => {
    navigate(-1);
  };

  let fetchedData: useFetchReturnType | null = null;

  if (idToModify !== undefined) {
    fetchedData = useFetchEmpresa(idToModify, true);
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

  const createResponse = useCreateEmpresa(formData, shouldCreate);
  const modifyResponse = useModifyEmpresa(formData, shouldModify);

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

  function isFormComplete(): boolean {
    return (
      formData.nombre.length > 0 &&
      formData.cuit.length > 0 &&
      formData.start_date.length > 0
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <h4 className="headerStyles">Alta y modificación de empresas</h4>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID: {formData.id}
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CUIT
          </label>
          <input
            type="text"
            value={formData.cuit}
            onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fecha de Inicio
          </label>
          <input
            type="date"
            value={formatDateToInput(formData.start_date)}
            onChange={(e) => {
              const [year, month, day] = e.target.value.split("-");
              const newDate = `${day}-${month}-${year}`;
              setFormData({ ...formData, start_date: newDate });
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <button
        disabled={!isFormComplete()}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
