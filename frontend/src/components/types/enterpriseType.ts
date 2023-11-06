export type EnterpriseType = {
  id: number;
  nombre: string;
  cuit: string;
  start_date: string;
  eliminado: boolean;
};

export const defaultEnterpriseType = {
  id: -1,
  nombre: "",
  cuit: "",
  start_date: "",
  eliminado: false,
};
