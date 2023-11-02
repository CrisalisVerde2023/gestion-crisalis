import { showNotification } from "../components/ToastNotification";
import { PersonasType } from "./../components/types/personType";

let personas: PersonasType[] = [];

const URL_API_PERSONAS = "http://localhost:8080/api/personas";

export const fetchPersonas = async (id: number) => {
  try {
    return await (
      await fetch(`${URL_API_PERSONAS}${id > 0 ? `/${id}` : ""}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
    ).json();
  } catch (error) {
    console.error("Ocurrió un error al obtener personas:", error);
    throw error;
  }
};

export const selectAll = (): PersonasType[] => {
  return personas;
};

export async function createPersona(overrides: Partial<PersonasType> = {}) {
  try {
    await fetch(`${URL_API_PERSONAS}`, {
      method: "POST",
      body: JSON.stringify({
        nombre: overrides.nombre,
        apellido: overrides.apellido,
        dni: overrides.dni
      }),
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    });
  } catch (error) {
    console.error("Ocurrió un error al crear persona:", error);
    throw error;
  }
}


export async function modifyPersona(updatedData: Partial<PersonasType>) {
  try {
    await fetch(`${URL_API_PERSONAS}/${updatedData.id}`, {
      method: "POST",
      body: JSON.stringify({
        nombre: updatedData.nombre,
        apellido: updatedData.apellido,
        dni: updatedData.dni
      }),
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    });
  } catch (error) {
    console.error("Ocurrió un error al modificar usuario:", error);
    throw error;
  }
}

export async function deletePersona(id: number) {
  try {
    await fetch(`${URL_API_PERSONAS}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    });
  } catch (error) {
    console.error("Ocurrió un error al cambiar estado de usuario:", error);
    throw error;
  }
}

