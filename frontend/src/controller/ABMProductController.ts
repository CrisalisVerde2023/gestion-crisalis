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
export function createProductService(
  overrides: Partial<ProductServiceType> = {}
) {
  let defaults: ProductServiceType = {
    id: 0,
    name: "",
    type: ProductOrService.Producto,
    cost: 0,
    support: 0,
  };

  const combined = { ...defaults, ...overrides };

  if (combined.type === ProductOrService.Producto) {
    combined.support = 0;
  }

  if (combined.type === ProductOrService.Servicio) {
    combined.cost = 0;
  }
  console.log("Created prod/serv");
  console.log(combined);
  productsAndServices.push(combined);
  const successMessage =
    combined.type === ProductOrService.Producto
      ? "Producto creado"
      : "Servicio creado";
  // Show the notification
  showNotification("add", "Creacion exitosa", successMessage, true);
}

// Modify a Product or Service
// Modify a Product or Service
export function modifyProductService(
  id: number,
  updatedData: Partial<ProductServiceType>
) {
  const indexToModify = productsAndServices.findIndex((item) => item.id === id);

  if (indexToModify === -1) {
    console.error(`Item with id ${id} not found.`);
    return productsAndServices;
  }

  const itemToModify = productsAndServices[indexToModify];
  console.log("Before modification: ");
  console.log(itemToModify);

  // Adjusting based on type
  if (updatedData.type === ProductOrService.Producto) {
    updatedData.support = 0;
  } else if (updatedData.type === ProductOrService.Servicio) {
    updatedData.cost = 0;
  }

  const updatedItem = { ...itemToModify, ...updatedData };
  console.log("After modification: ");
  console.log(updatedItem);

  // Update the original array
  productsAndServices[indexToModify] = updatedItem;
  const successMessage =
    updatedItem.type === ProductOrService.Producto
      ? "Producto modificado"
      : "Servicio modificado";
  // Show the notification
  showNotification("edit", "Modificación exitosa", successMessage, true);
}

// Delete a Product or Service
export function deleteProductService(id: number) {
  const indexToDelete = productsAndServices.findIndex((item) => item.id === id);
  if (indexToDelete === -1) {
    console.error(`Item with id ${id} not found.`);
    showNotification(
      "delete",
      "Eliminacion fallo",
      "No se encuentra el item",
      true
    );
    return productsAndServices;
  }

  // Remove the item from the original array
  const message =
    productsAndServices[indexToDelete].type === ProductOrService.Producto
      ? "Producto eliminado"
      : "Servicio eliminado";
  productsAndServices.splice(indexToDelete, 1);
  showNotification("delete", "Borrado exitoso", message, true);
  return productsAndServices;
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

export function createProductServiceDefaultValues(): ProductServiceType {
  return {
    id: 0, // you can replace this with a logic to generate a unique id
    name: "",
    type: ProductOrService.Producto,
    cost: 0,
    support: 0,
  };
}
