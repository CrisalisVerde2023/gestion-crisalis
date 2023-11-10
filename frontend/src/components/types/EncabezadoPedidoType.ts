export type EncabezadoPedidoType = {
  id: number;
  persona: string;
  empresa: string;
  cantProds: number;
  cantServs: number;
  fechaCreacion: string;
  total: number;
  anulado: boolean;
};

export const defaultValuesPedidoType = {
  id: -1,
  persona: "",
  empresa: "",
  cantProds: 0,
  cantServs: 0,
  fechaCreacion: "",
  total: 0,
  anulado: false,
};
