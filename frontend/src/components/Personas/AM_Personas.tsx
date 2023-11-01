import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  countPersonas,
  createPersona,
  findPersonaById,
  getNextID,
  modifyPersona,
} from "./../../controller/ABMPersonController";
import { PersonasType } from "./../types/personType";

export default function AM_Persona() {
  const { idPersona } = useParams<{ idPersona: string }>();
  const idToModify = idPersona ? parseInt(idPersona, 10) : undefined;
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState<PersonasType>(
    idToModify !== undefined
      ? findPersonaById(idToModify) || {
          id: 0,
          firstName: "",
          lastName: "",
          dni: "",
        }
      : { id: 0, firstName: "", lastName: "", dni: "" }
  );

  const isFormComplete = () => {
    return formData.firstName && formData.lastName && formData.dni;
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
          await modifyPersona(idToModify, formData);
        } else {
          await createPersona(formData);
        }
        goBack();
      } catch (error) {
        console.error("Error while saving data:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 containerAM">
      <div className="flex justify-center">
        <h4 className="headerStyles">Alta y modificación de personas</h4>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-1/2">
          <label className="block text-gray-700">ID: {formData.id}</label>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700">DNI</label>
          <input
            type="text"
            value={formData.dni}
            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
      <button
        disabled={!isFormComplete()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
