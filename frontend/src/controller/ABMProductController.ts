import { Dispatch, SetStateAction } from "react";
import { showNotification } from "../components/ToastNotification";
import {
  ProductOrService,
  ProductServiceType,
} from "../components/types/productServiceType";
import { triggerLoading } from "./loadingEvent";

let productsAndServices: ProductServiceType[] = [];

export const fetchProductServices = async (
  setIsLoadingCallback: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    triggerLoading(true, setIsLoadingCallback);
    const response = await fetch("jsons/productAndServicesJson.json");
    const data = await response.json();
    productsAndServices = data; // <-- This line updates the productsAndServices array
    triggerLoading(false, setIsLoadingCallback);
    return data;
  } catch (error) {
    triggerLoading(false, setIsLoadingCallback);
    console.error(`An error occurred: ${error}`);
    throw error;
  }
};

// Create a Product or Service
export async function createProductService(
  overrides: Partial<ProductServiceType> = {}
) {
  const combined = { ...defaultProductServiceValues, ...overrides };
  try {
    await fetch("http://localhost:8080/api/productosyservicios", {
      method: "POST",
      body: JSON.stringify(combined),
      headers: { "Content-Type": "application/json" },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    });
  } catch (error) {
    console.error("Ocurrió un error al crear producto/servicio:", error);
    throw error;
  }
}

// Modify a Product or Service
export async function modifyProductService(
  id: number,
  updatedData: Partial<ProductServiceType>
) {
  try {
    await fetch(`http://localhost:8080/api/productosyservicios/${id}`, {
      method: "POST",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    });
  } catch (error) {
    console.error("Ocurrió un error al modificar producto/servicio:", error);
    throw error;
  }
}

// Delete a Product or Service
export async function deleteProductService(id: number) {
  try {
    await fetch(`http://localhost:8080/api/productosyservicios/${id}`, {
      method: "PATCH",
    }).then((resp) => {
      if (resp.status >= 400)
        throw new Error("El servidor respondió con error");
    });

    const indexToDelete = productsAndServices.findIndex(
      (item) => item.id === id
    );
    if (indexToDelete === -1) {
      console.error(`Item with id ${id} not found.`);
      return productsAndServices;
    }

    // Remove the item from the original array
    const message =
      productsAndServices[indexToDelete].type === ProductOrService.Producto
        ? "Producto eliminado"
        : "Servicio eliminado";
    productsAndServices.splice(indexToDelete, 1);
    return productsAndServices;
  } catch (error) {
    console.error(
      "Ocurrió un error al cambiar estado de producto/servicio:",
      error
    );
    throw error;
  }
}

export const selectAll = (): ProductServiceType[] => {
  return productsAndServices;
};

export const selectAllProducts = (): ProductServiceType[] => {
  return selectAll().filter(
    (item) => item.type.toString() === ProductOrService.Producto
  );
};

export const selectAllServices = (): ProductServiceType[] => {
  return selectAll().filter(
    (item) => item.type.toString() === ProductOrService.Servicio
  );
};

export function findProductServiceById(id: number): ProductServiceType | null {
  const foundItem = productsAndServices.find((item) => item.id === id);
  return foundItem ? foundItem : null;
}

export function countProductServicios(): number {
  return productsAndServices.length;
}

export function getNextID() {
  const maxID = Math.max(
    ...productsAndServices.map((prodOrServ) => prodOrServ.id)
  );
  return maxID + 1;
}

export const defaultProductServiceValues: ProductServiceType = {
  id: 0, // you can replace this with a logic to generate a unique id
  name: "",
  type: ProductOrService.Producto,
  cost: 0,
  support: 0,
};
