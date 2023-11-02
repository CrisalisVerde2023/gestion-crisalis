import { showNotification } from "../components/ToastNotification";
import { ClienteDTO } from "../components/types/clientType";
import { PersonasType } from "./../components/types/personType";


const URL_API_CLIENTES = "http://localhost:8080/api/clientes";

export const fetchClientes = async (id: number) => {
  try {
    return await (
      await fetch(`${URL_API_CLIENTES}${id > 0 ? `/${id}` : ""}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
    ).json();
  } catch (error) {
    console.error("Ocurrió un error al obtener clientes:", error);
    throw error;
  }
};

export async function createClient(overrides: Partial<ClienteDTO>) {
    try {
      await fetch(`${URL_API_CLIENTES}`, {
        method: "POST",
        body: JSON.stringify({
          persona_id: overrides.persona_id,
          empresa_id: overrides.empresa_id,
        }),
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if (resp.status >= 400) throw "El servidor respondió con error " + resp.status;
      });
    } catch (error) {
      console.error("Ocurrió un error al crear cliente:", error);
      throw error;
    }
}

export async function deleteClient(id: number) {
  try {
    await fetch(`${URL_API_CLIENTES}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error " + resp.status;
    });
  } catch (error) {
    console.error("Ocurrió un error al cambiar estado de cliente:", error);
    throw error;
  }
}

export async function updateClient(overrides: Partial<ClienteDTO>, idCliente: number) {
  try {
    await fetch(`${URL_API_CLIENTES}/${idCliente}`, {
      method: "POST",
      body: JSON.stringify({
        persona_id: overrides.persona_id,
        empresa_id: overrides.empresa_id,
      }),
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error " + resp.status;
      
    });
  } catch (error) {
    console.error("Ocurrió un error al crear cliente:", error);
    throw error;
  }
}