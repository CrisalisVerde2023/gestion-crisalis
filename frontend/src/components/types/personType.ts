export type PersonasType = {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  eliminado: boolean;
};

export const defaultPersonasType = {
  id: -1,
  nombre: "",
  apellido: "",
  dni: "",
  eliminado: false,
};
