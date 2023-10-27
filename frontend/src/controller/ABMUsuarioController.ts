import { UsuariosType } from "../components/types/userType";

const URL_API_BASE = "http://localhost:8080/api";

export const fetchUsuarios = async (id: number) => {
  try {
    return await (
      await fetch(`${URL_API_BASE}/usuarios${id > 0 ? `/${id}` : ""}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
    ).json();
  } catch (error) {
    console.error("Ocurrió un error al obtener usuarios:", error);
    throw error;
  }
};

export async function createUsuario(overrides: Partial<UsuariosType> = {}) {
  try {
    await fetch(`${URL_API_BASE}/usuarios`, {
      method: "POST",
      body: JSON.stringify({
        usuario: overrides.usuario,
        password: overrides.password,
      }),
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    });
  } catch (error) {
    console.error("Ocurrió un error al crear usuario:", error);
    throw error;
  }
}

export async function modifyUsuario(updatedData: Partial<UsuariosType>) {
  try {
    await fetch(`${URL_API_BASE}/usuarios/${updatedData.id}`, {
      method: "POST",
      body: JSON.stringify({
        usuario: updatedData.usuario,
        password: updatedData.password,
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

export async function deleteUsuario(id: number) {
  try {
    await fetch(`${URL_API_BASE}/usuarios/${id}`, {
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
