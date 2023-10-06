import { showNotification } from "../components/ToastNotification";
import { PersonasType } from "./../components/types/personType";

let personas: PersonasType[] = [];

export const fetchPersonas = async (
  setIsLoadingCallback: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    // You can use a loading mechanism here, similar to triggerLoading
    const response = await fetch("jsons/personJson.json");
    const data = await response.json();
    personas = data; // Updates the personas array
    // Stop loading mechanism here
    return data;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    throw error;
  }
};

export const selectAll = (): PersonasType[] => {
  return personas;
};

export function createPersona(overrides: Partial<PersonasType> = {}) {
  const defaults: PersonasType = {
    id: 0,
    firstName: "",
    lastName: "",
    dni: "",
  };

  const combined = { ...defaults, ...overrides };
  personas.push(combined);
  showNotification("add", "Creacion exitosa", "Nueva persona creada", true);
}

export function modifyPersona(id: number, updatedData: Partial<PersonasType>) {
  const indexToModify = personas.findIndex((item) => item.id === id);
  if (indexToModify === -1) {
    console.error(`Item with id ${id} not found.`);
    return;
  }

  const itemToModify = personas[indexToModify];
  const updatedItem = { ...itemToModify, ...updatedData };
  personas[indexToModify] = updatedItem;
  showNotification("edit", "Modificacion exitosa", "Persona modificada", true);
}

export function deletePersona(id: number) {
  const indexToDelete = personas.findIndex((item) => item.id === id);
  if (indexToDelete === -1) {
    console.error(`Item with id ${id} not found.`);
    return;
  }
  personas.splice(indexToDelete, 1);
  showNotification("delete", "Borrado exitoso", "Persona borrada", true);
}

export function countPersonas(): number {
  return personas.length;
}

export function getNextID() {
  const maxID = Math.max(...personas.map((persona) => persona.id));
  return maxID + 1;
}

export function createPersonaDefaultValues(): PersonasType {
  return {
    id: 0,
    firstName: "",
    lastName: "",
    dni: "",
  };
}

export function findPersonaById(id: number): PersonasType | null {
  const foundItem = personas.find((item) => item.id === id);
  return foundItem ? foundItem : null;
}

export function findPersonaByDNI(dni: string): PersonasType | null {
  const foundItem = personas.find((item) => item.dni === dni);
  return foundItem ? foundItem : null;
}
