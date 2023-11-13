import React, { useContext, useEffect, useState } from "react";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import SelectedProdsServs from "../SelectedProdsServs";
import SelectedClient from "../SelectedClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useCreatePedidos,
  useModifyPedidos,
} from "../../controller/ABMPedidoController";
import {
  PedidoType,
  SendPedidoType,
  defaultPedidoState,
  defaultSendPedidoType,
} from "../types/UserLogged";
import { useFetchReturnType } from "../../hooks/useFetch";
import {
  EncabezadoPedidoType,
  defaultValuesPedidoType,
} from "../types/EncabezadoPedidoType";
import VolverBtn from "../UI Elements/VolverBtn";

export default function AM_Pedidos() {
  const { pedido, setPedido, userLogged } = useContext(UserLoggedContext);
  const navigate = useNavigate();
  const [pedidoObject, setPedidoObject] = useState<SendPedidoType>(
    defaultSendPedidoType
  );
  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldModify, setShouldModify] = useState(false);
  const [response, setResponse] = useState<useFetchReturnType | null>(null);
  const [formData, setFormData] = useState<EncabezadoPedidoType>(
    defaultValuesPedidoType
  );
  let fetchedData: useFetchReturnType | null = null;

  const createResponse = useCreatePedidos(pedidoObject, shouldCreate);
  const modifyResponse = useModifyPedidos(formData, shouldModify);

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

  const handleCreatePedido = () => {
    // Show loading alert
    Swal.fire({ text: "Espere por favor...", showConfirmButton: false });

    // Create the new pedidoObject from the current state
    const newPedidoObject = createPedidoObject();

    // Update the pedidoObject state
    setPedidoObject(newPedidoObject);
  };

  // useEffect to trigger shouldCreate after pedidoObject is updated
  useEffect(() => {
    // If the pedidoObject is different from the initial state, proceed to create pedido
    if (pedidoObject !== defaultSendPedidoType) {
      setShouldCreate(true);
    }
  }, [pedidoObject]); // Depend on pedidoObject

  // useEffect to handle createResponse changes
  useEffect(() => {
    if (createResponse && !createResponse.loading) {
      Swal.close();
      if (!createResponse.hasError) {
        Swal.fire("Perfecto!", "Pedido creado correctamente", "success");
        setPedido(defaultPedidoState);
        goBack();
      } else {
        Swal.fire("Atención!", "Error al crear pedido", "warning");
      }
      // Reset shouldCreate here to ensure reusability of the creation process
      setShouldCreate(false);
    }
  }, [createResponse]);

  function createPedidoObject(): SendPedidoType {
    console.log("createPedidoObject");
    const pedidoObject = {
      idCliente: pedido.cliente.id,
      idUsuario: userLogged.id,
      detalleOrden:
        pedido.prods_servs?.map(({ id, cantidad, garantia }) => ({
          idServicioProducto: id,
          cantidad,
          garantia: garantia ?? null, // Using nullish coalescing to handle cases where garantia is not present.
        })) || [], // Ensure we default to an empty array if prods_servs is undefined
    };
    console.log(pedidoObject);
    return pedidoObject;
  }

  const clean = () => {
    setPedido(defaultPedidoState);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <strong style={{ margin: "20px" }}>Cliente:</strong>
      <button
        onClick={() => navigate("/clientes?seleccion=simple")}
        style={{ margin: "20px" }}
        className="bg-denim px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-900"
      >
        Seleccionar Cliente
      </button>
      <SelectedClient />

      <strong style={{ margin: "20px" }}>Productos / Servicios:</strong>
      <button
        onClick={() => navigate("/productosyservicios?seleccion=multiple")}
        style={{ margin: "20px" }}
        className="bg-denim px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-900"
      >
        Seleccionar Productos / Servicios
      </button>

      <SelectedProdsServs />

      <div className="flex justify-center items-center my-3">
        <div className="flex justify-evenly mt-2 mx-2">
          <button
            disabled={pedido.cliente.id < 0 || !pedido.prods_servs.length}
            onClick={handleCreatePedido}
            className={`${
              pedido.cliente.id < 0 || !pedido.prods_servs.length
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-denim-400 hover:bg-denim-500"
            } px-4 py-2 rounded-md text-white font-medium tracking-wide`}
          >
            Confirmar pedido
          </button>
        </div>
        <div className="flex justify-evenly mt-2 mx-2">
          <button
            disabled={pedido.cliente.id < 0 && !pedido.prods_servs.length}
            className={`${
              !pedido || (pedido.cliente.id < 0 && !pedido.prods_servs.length)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-denim-400 hover:bg-denim-500"
            } px-4 py-2 rounded-md text-white font-medium tracking-wide`}
            onClick={() => clean()}
          >
            Limpiar
          </button>
        </div>
        <div className="flex justify-evenly mt-2 mx-2">
          <VolverBtn fnOnClick={goBack} />
        </div>
      </div>
    </div>
  );
}
