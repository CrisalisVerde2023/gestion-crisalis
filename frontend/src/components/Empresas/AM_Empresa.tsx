import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreateEmpresa,
  useFetchEmpresas,
  useModifyEmpresa,
} from "./../../controller/ABMEnterpriseController";
import {
  EnterpriseType,
  defaultEnterpriseType,
} from "./../types/enterpriseType";
import { formatDate, formatDateToInput } from "../../tools/formatDate";
import { useFetchReturnType } from "../../hooks/useFetch";
import Swal from "sweetalert2";
import VolverBtn from "../UI Elements/VolverBtn";

export default function AM_Empresa() {
  const { idEnterprise } = useParams<{ idEnterprise: string }>();
  const idToModify =
    idEnterprise !== undefined
      ? idEnterprise === "0"
        ? 0
        : parseInt(idEnterprise)
      : undefined;
  const navigate = useNavigate();
  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldModify, setShouldModify] = useState(false);
  const [response, setResponse] = useState<useFetchReturnType | null>(null);
  const [formData, setFormData] = useState<EnterpriseType>(
    defaultEnterpriseType
  );
  let fetchedData: useFetchReturnType | null = null;

  if (idToModify !== undefined) {
    fetchedData = useFetchEmpresas(idToModify, true);
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

  const errorsForm = () => {
    const errors = [];

    // Validate 'nombre' (name of the enterprise)
    if (!formData.nombre.length)
      errors.push("El nombre de la empresa es obligatorio");

    // Validate 'cuit' (Unique Tax Identification Code)
    // The CUIT must be exactly 11 digits with no special characters.
    if (!formData.cuit.length) errors.push("El CUIT es obligatorio");
    const cuitPattern = /^\d{11}$/;
    if (!cuitPattern.test(formData.cuit))
      errors.push(
        "El CUIT debe ser un número de 11 dígitos sin caracteres especiales"
      );

    // Validate 'start_date' if necessary
    if (!formData.start_date.length)
      errors.push("La fecha de inicio es obligatoria");
    // Add more validations if needed for 'start_date' or other fields

    return errors;
  };

  const createResponse = useCreateEmpresa(formData, shouldCreate);
  const modifyResponse = useModifyEmpresa(formData, shouldModify);

  const handleSubmit = () => {
    const errors = errorsForm();
    const complete = isFormComplete();

    if (errors.length === 0 && complete) {
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

  function isFormComplete(): boolean {
    return (
      formData.nombre.length > 0 &&
      formData.cuit.length > 0 &&
      formData.start_date.length > 0
    );
  }

  return (
    <section className={idToModify ? "bg-atlantis-25" : "bg-denim-25"}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {idToModify ? "Modificación" : "Alta"} de empresa
            </h1>
            <div className="space-y-4 md:space-y-6">
              {/* ID is displayed only if modifying an existing entry */}
              {idToModify && (
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    ID: {formData.id}
                  </label>
                </div>
              )}
              {/* Nombre */}
              <div>
                <label
                  htmlFor="nombre"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nombre de la empresa"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
              </div>
              {/* CUIT */}
              <div>
                <label
                  htmlFor="cuit"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  CUIT
                </label>
                <input
                  type="text"
                  name="cuit"
                  id="cuit"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="CUIT de la empresa"
                  value={formData.cuit}
                  onChange={(e) =>
                    setFormData({ ...formData, cuit: e.target.value })
                  }
                />
              </div>
              {/* Fecha de Inicio */}
              <div>
                <label
                  htmlFor="start_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formatDateToInput(formData.start_date)}
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split("-");
                    const newDate = `${day}-${month}-${year}`;
                    setFormData({ ...formData, start_date: newDate });
                  }}
                />
              </div>
              {/* Buttons */}
              <div className="flex items-center justify-between mt-4">
                <button
                  disabled={!isFormComplete()}
                  onClick={handleSubmit}
                  className={`${
                    !isFormComplete()
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-denim hover:bg-denim-500"
                  } px-4 py-2 rounded-md text-white font-medium tracking-wide`}
                >
                  {idToModify ? "Modificar" : "Crear"}
                </button>

                {/* Add your logic to handle 'goBack' or provide a way for the user to navigate back */}
                <VolverBtn fnOnClick={goBack} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
