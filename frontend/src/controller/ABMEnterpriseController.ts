import { EnterpriseType } from "../components/types/enterpriseType";

let enterprises: EnterpriseType[] = [];

const URL_API_EMPRESAS = "http://localhost:8080/api/empresas";

export const fetchEnterprises = async (
  setIsLoadingCallback: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(`${URL_API_EMPRESAS}`, {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("userLogged")).token,
        "Content-Type": "application/json",
      },
    });
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

export async function createEnterprise(
  overrides: Partial<EnterpriseType> = {}
) {
  try {
    await fetch(`${URL_API_EMPRESAS}`, {
      method: "POST",
      body: JSON.stringify({
        nombre: overrides.nombre,
        cuit: overrides.cuit,
        start_date: overrides.start_date,
      }),
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("userLogged")).token,
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400)
        console.log("El servidor respondió con error", resp.status);
    });
  } catch (error) {
    console.error("Ocurrió un error al crear usuario:", error);
    throw error;
  }
}

export async function modifyEnterprise(
  id: number,
  updatedData: Partial<EnterpriseType>
) {
  try {
    await fetch(`${URL_API_EMPRESAS}/${updatedData.id}`, {
      method: "POST",
      body: JSON.stringify({
        nombre: updatedData.nombre,
        cuit: updatedData.cuit,
        start_date: updatedData.start_date,
      }),
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("userLogged")).token,
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

export async function deleteEnterprise(id: number) {
  try {
    await fetch(`${URL_API_EMPRESAS}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("userLogged")).token,
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

export function countEnterprises(): number {
  return enterprises.length;
}

export function getNextID() {
  const maxID = Math.max(...enterprises.map((enterprise) => enterprise.id));
  return maxID + 1;
}

export function createEnterpriseDefaultValues(): EnterpriseType {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return {
    id: 0,
    nombre: "",
    cuit: "",
    start_date: formattedDate,
  };
}

export function findEnterpriseById(id: number): EnterpriseType | null {
  console.log(enterprises);
  const foundItem = enterprises.find((item) => item.id === id);
  return foundItem ? foundItem : null;
}

export function findEnterpriseByCUIT(cuit: string): EnterpriseType | null {
  const foundItem = enterprises.find((item) => item.cuit === cuit);
  return foundItem ? foundItem : null;
}
