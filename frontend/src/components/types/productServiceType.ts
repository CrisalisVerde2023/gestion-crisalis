export enum ProductOrService {
  Producto = "PRODUCTO",
  Servicio = "SERVICIO",
}

export type ProductServiceType = {
  id: number;
  nombre: string;
  tipo: ProductOrService;
  costo: number;
  impuesto: number;
  soporte: number | null;
  cantidad: number;
  garantia: number | null;
};
