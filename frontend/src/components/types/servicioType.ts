export type ServicioType = {
  id: number;
  estado: boolean;
  fecha: Date;
  persona: string;
  empresa: string;
  servicio: string;
};

export const defaultServicioType: ServicioType = {
  id: -1,
  estado: false,
  fecha: new Date(),
  persona: "",
  empresa: "",
  servicio: "",
};