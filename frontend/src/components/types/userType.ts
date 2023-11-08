export type UsuariosType = {
  id: number;
  usuario: string;
  password: string;
  eliminado: boolean;
};

export const defaultUsuariosType = {
  id: -1,
  usuario: "",
  password: "",
  eliminado: false,
};
