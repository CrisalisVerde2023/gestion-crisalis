import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { PencilFill, XCircleFill, Search } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {
  fetchEnterprises,
  selectAll as selectAllEnterprise,
  deleteEnterprise,
  modifyEnterprise,
} from "./../../controller/ABMEnterpriseController";
import { EnterpriseType } from "../types/enterpriseType";
import { ConfirmDialog } from "../ConfirmDialog";
import LoadingComponent from "../LoadingComponent";
import { formatDate } from "../../tools/formatDate";

export default function LB_Empresas() {
  const [data, setData] = useState<EnterpriseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedElement, setSelectedElement] = useState<EnterpriseType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const fetchData = async () => {
    try {
      const fetchedData = await fetchEnterprises(setIsLoading);
      setData(fetchedData);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    if (selectAllEnterprise().length === 0) {
      fetchData();
    } else {
      setData(selectAllEnterprise());
    }
  }, [location]);

  const handleSearch = () => {
    const filteredData = selectAllEnterprise().filter(
      (empresa: EnterpriseType) =>
        empresa.id.toString().includes(searchTerm) ||
        empresa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empresa.cuit.replace(/-/g, "").includes(searchTerm.replace(/-/g, ""))
    );
    setData(filteredData);
  };

  const onConfirm = () => {
    if (selectedElement) {
      deleteEnterprise(selectedElement.id);
      setShowDialog(false);
      setData(selectAllEnterprise());
    }
  };

  const handleClickedElement = (selected: EnterpriseType) => {
    setSelectedElement(selected);
    setShowDialog(true);
  };

  const actionButtons = (row: EnterpriseType) => (
    <div className="d-flex flex-row justify-content-evenly align-items-center">
      <button
        className="actionButton"
        onClick={() => handleClickedElement(row)}
      >
        <XCircleFill />
      </button>
      <Link className="actionButton" to={`/empresas/AMEmpresas/${row.id}`}>
        <PencilFill />
      </Link>
    </div>
  );

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center mb-4">
          <div className="flex-auto">
            <input
              type="text"
              placeholder="Buscar"
              className="inputSearch"
              value={searchTerm}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  setData(selectAllEnterprise());
                  setSearchTerm("");
                } else {
                  setSearchTerm(e.target.value);
                }
              }}
            />
          </div>
          <div className="flex-auto">
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
            <div>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300">ID</th>
                    <th className="border border-gray-300">Nombre</th>
                    <th className="border border-gray-300">CUIT</th>
                    <th className="border border-gray-300">Fecha de Inicio</th>
                    <th className="border border-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300">{row.id}</td>
                      <td className="border border-gray-300">{row.name}</td>
                      <td className="border border-gray-300">{row.cuit}</td>
                      <td className="border border-gray-300">
                        {row.startDate}
                      </td>
                      <td className="border border-gray-300">
                        {actionButtons(row)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
