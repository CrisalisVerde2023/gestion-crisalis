import { showNotification } from "../components/ToastNotification";
import { UsuariosType } from "../components/types/userType";

export const fetchUsuarios = async (
  setIsLoadingCallback: React.Dispatch<React.SetStateAction<boolean>>,
  id: number
) => {
  try {
    const response = await fetch(`http://localhost:8080/api/usuarios${(id > 0) ? `/${id}` : ""}`);
    const data = await response.json();

    return data;
  } catch (error) {
    showNotification("error", "Obtención de usuarios errónea", "No se pudieron obtener los usuarios debido a un error", true);
    console.error(error);
  }
};

export async function createUsuario(overrides: Partial<UsuariosType> = {}) {
  try{
    await fetch("http://localhost:8080/api/usuarios", {
      method: 'POST',
      body: JSON.stringify({usuario: overrides.usuario, password: overrides.password}),
      headers:{'Content-Type': 'application/json'}
    });

    showNotification("add", "Creacion exitosa", "Se ha creado el usuario correctamente", true);
  }
  catch (error) {
    showNotification("error", "Creación errónea", "No se pudo crear el usuario debido a un error", true);
    console.error(error);
  }
}

export async function modifyUsuario(updatedData: Partial<UsuariosType>) {
  try{
    await fetch(`http://localhost:8080/api/usuarios/${updatedData.id}`, {
      method: 'POST',
      body: JSON.stringify({usuario: updatedData.usuario, password: updatedData.password}),
      headers:{'Content-Type': 'application/json'}
    });

    showNotification("edit", "Modificación exitosa", "Se ha modificado el usuario correctamente", true);
  }
  catch (error) {
    showNotification("error", "Modificación errónea", "No se pudo modificar el usuario debido a un error", true);
    console.error(error);
  }
}

export async function deleteUsuario(id: number) {
  try{
    await fetch(`http://localhost:8080/api/usuarios/${id}`, { method: 'PATCH' });

    showNotification("delete", "Cambio de estado exitoso", "Se ha cambiado el estado del usuario correctamente", true);
  }
  catch (error) {
    showNotification("error", "Cambio de estado erróneo", "No se pudo cambiar el estado del usuario debido a un error", true);
    console.error(error);
  }
}