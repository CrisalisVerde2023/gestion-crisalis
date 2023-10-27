import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LB_Productos from "./LB_ProductService";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TablaProdsServPedido from "./TablaProdsServPedido";

export default function ABMProductServiceComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const seleccion = searchParams.get("seleccion");

  useEffect(() => {}, [location]);
  function goToAMProductos() {
    navigate("/productosyservicios/AMProductos");
  }
  function goToAMServicios() {
    navigate("/productosyservicios/AMServicios");
  }
  function goBack() {
    navigate(-1);
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <div className="mb-2">
          <LB_Productos />
        </div>
        {seleccion && <TablaProdsServPedido seleccion={seleccion} />}
        <div className="flex justify-center items-center mb-4">
          <div className="flex justify-evenly mt-2 mx-2">
            <button
              onClick={goToAMProductos}
              className="bg-denim-400 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-500"
            >
              Crear nuevo producto
            </button>
          </div>
          <div className="flex justify-evenly mt-2 mx-2">
            <button
              onClick={goToAMServicios}
              className="bg-denim-400 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-500"
            >
              Crear nuevo servicio
            </button>
          </div>
          <div className="flex justify-evenly mt-2 mx-2">
            <button
              onClick={goBack}
              className="bg-red-600 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-red-700"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
