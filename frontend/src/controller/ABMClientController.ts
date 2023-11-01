import { showNotification } from "../components/ToastNotification";
import { PersonasType } from "./../components/types/personType";

let personas: PersonasType[] = [];

const URL_API_CLIENTES = "http://localhost:8080/api/clientes";

export const fetchClientes = async () => {
  try {
    return await (
      await fetch(URL_API_CLIENTES, {
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