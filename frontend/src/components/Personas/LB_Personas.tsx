import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { PencilFill, XCircleFill, Search } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {
  fetchPersonas,
  selectAll as selectAllPersonas,
  deletePersona,
  modifyPersona,
} from "./../../controller/ABMPersonController";
import { PersonasType } from "../types/personType";
import { ConfirmDialog } from "../ConfirmDialog";
import LoadingComponent from "../LoadingComponent";

export default function LB_Personas() {
  const [data, setData] = useState<PersonasType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedElement, setSelectedElement] = useState<PersonasType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const fetchData = async () => {
    try {
      const fetchedData = await fetchPersonas(setIsLoading);
      setData(fetchedData);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    if (selectAllPersonas().length === 0) {
      fetchData();
    } else {
      setData(selectAllPersonas());
    }
  }, [location]);

  const handleSearch = () => {
    const filteredData = selectAllPersonas().filter(
      (persona: PersonasType) =>
        persona.id.toString().includes(searchTerm) ||
        persona.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.dni.includes(searchTerm)
    );
    setData(filteredData);
  };

  const onConfirm = () => {
    if (selectedElement) {
      deletePersona(selectedElement.id);
      setShowDialog(false);
      setData(selectAllPersonas());
    }
  };

  const handleClickedElement = (selected: PersonasType) => {
    setSelectedElement(selected);
    setShowDialog(true);
  };

  const actionButtons = (row: PersonasType) => (
    <div className="d-flex flex-row justify-content-evenly align-items-center">
      <button
        className="actionButton"
        onClick={() => handleClickedElement(row)}
      >
        <XCircleFill />
      </button>
      <Link className="actionButton" to={`/personas/AMPersonas/${row.id}`}>
        <PencilFill />
      </Link>
    </div>
  );

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center mb-4">
          <div className="flex-none">
            <input
              type="text"
              placeholder="Buscar"
              className="border rounded p-2"
              value={searchTerm}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  setData(selectAllPersonas());
                  setSearchTerm("");
                } else {
                  setSearchTerm(e.target.value);
                }
              }}
            />
          </div>
          <div className="flex-none ml-2">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Search />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div>
          {isLoading ? (
            <div>
              <LoadingComponent />
            </div>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Nombre</th>
                  <th className="py-2 px-4 border">Apellido</th>
                  <th className="py-2 px-4 border">DNI</th>
                  <th className="py-2 px-4 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">{row.id}</td>
                    <td className="py-2 px-4 border">{row.firstName}</td>
                    <td className="py-2 px-4 border">{row.lastName}</td>
                    <td className="py-2 px-4 border">{row.dni}</td>
                    <td className="py-2 px-4 border">{actionButtons(row)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
