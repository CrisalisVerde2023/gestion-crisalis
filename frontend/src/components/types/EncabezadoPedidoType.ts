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
