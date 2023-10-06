export enum ProductOrService {
  Producto = "Producto",
  Servicio = "Servicio",
}

export type ProductServiceType = {
  id: number;
  name: string;
  type: ProductOrService;
  cost: number;
  support: number;
};
