export type EncabezadoPedidoType = {
  id: number;
  persona: string;
  empresa: string;
  cantProductos: number;
  cantServicios: number;
  fechaCreacion: string;
  total: number;
  anulado: boolean;
};

export const defaultValuesPedidoType = {
  id: -1,
  persona: "",
  empresa: "",
  cantProductos: 0,
  cantServicios: 0,
  fechaCreacion: "",
  total: 0,
  anulado: false,
};
