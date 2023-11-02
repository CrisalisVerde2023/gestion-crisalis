import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  countEnterprises,
  createEnterprise,
  findEnterpriseById,
  getNextID,
  modifyEnterprise,
} from "./../../controller/ABMEnterpriseController";
import { EnterpriseType } from "./../types/enterpriseType";
import { formatDate, formatDateToInput } from "../../tools/formatDate";

export default function AM_Empresa() {
  const { idEnterprise } = useParams<{ idEnterprise: string }>();
  const idToModify = idEnterprise ? parseInt(idEnterprise, 10) : undefined;
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState<EnterpriseType>(
    idToModify !== undefined
      ? findEnterpriseById(idToModify) || {
          id: 0,
          nombre: "",
          cuit: "",
          start_date: "",
        }
      : { id: 0, nombre: "", cuit: "", start_date: "" }
  );

  const isFormComplete = () => {
    return formData.nombre && formData.cuit && formData.start_date;
  };

  useEffect(() => {
    if (idToModify === undefined) {
      setFormData({
        ...formData,
        id: getNextID(),
      });
    }
  }, []);

  const handleSubmit = async () => {
    if (isFormComplete()) {
      try {
        if (idToModify !== undefined) {
          await modifyEnterprise(idToModify, formData);
        } else {
          await createEnterprise(formData);
        }
        goBack();
      } catch (error) {
        console.error("Error while saving data:", error);
      }
    }
  };

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
