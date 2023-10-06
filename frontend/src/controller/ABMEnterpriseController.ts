import { showNotification } from "../components/ToastNotification";
import { EnterpriseType } from "../components/types/enterpriseType";

let enterprises: EnterpriseType[] = [];

export const fetchEnterprises = async (
  setIsLoadingCallback: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch("jsons/enterpriseJson.json");
    const data = await response.json();
    enterprises = data;
    return data;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    throw error;
  }
};

export const selectAll = (): EnterpriseType[] => {
  return enterprises;
};

export function createEnterprise(overrides: Partial<EnterpriseType> = {}) {
  const defaults: EnterpriseType = {
    id: 0,
    name: "",
    cuit: "",
    startDate: new Date(),
  };

  const combined = { ...defaults, ...overrides };
  enterprises.push(combined);
  showNotification("add", "Creacion exitosa", "Nueva empresa creada", true);
}

export function modifyEnterprise(
  id: number,
  updatedData: Partial<EnterpriseType>
) {
  const indexToModify = enterprises.findIndex((item) => item.id === id);
  if (indexToModify === -1) {
    console.error(`Item with id ${id} not found.`);
    return;
  }

  const itemToModify = enterprises[indexToModify];
  const updatedItem = { ...itemToModify, ...updatedData };
  enterprises[indexToModify] = updatedItem;
  showNotification("edit", "Modificacion exitosa", "Empresa modificada", true);
}

export function deleteEnterprise(id: number) {
  const indexToDelete = enterprises.findIndex((item) => item.id === id);
  if (indexToDelete === -1) {
    console.error(`Item with id ${id} not found.`);
    return;
  }
  enterprises.splice(indexToDelete, 1);
  showNotification("delete", "Borrado exitoso", "Empresa borrada", true);
}

export function countEnterprises(): number {
  return enterprises.length;
}

export function getNextID() {
  const maxID = Math.max(...enterprises.map((enterprise) => enterprise.id));
  return maxID + 1;
}

export function createEnterpriseDefaultValues(): EnterpriseType {
  return {
    id: 0,
    name: "",
    cuit: "",
    startDate: new Date(),
  };
}

export function findEnterpriseById(id: number): EnterpriseType | null {
  const foundItem = enterprises.find((item) => item.id === id);
  return foundItem ? foundItem : null;
}

export function findEnterpriseByCUIT(cuit: string): EnterpriseType | null {
  const foundItem = enterprises.find((item) => item.cuit === cuit);
  return foundItem ? foundItem : null;
}
