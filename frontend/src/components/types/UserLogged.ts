export type UserLogged = {
  id: number;
  email: string;
  isAuth: boolean;
  isAdmin: boolean;
};

export type UserLoggedContextType = {
  userLogged: UserLogged;
  setUserLogged: React.Dispatch<React.SetStateAction<UserLogged>>;
};

export const defaultUserLogState = {
  id: -1,
  email: "",
  isAuth: false,
  isAdmin: false,
};

export const defaultContext: UserLoggedContextType = {
  userLogged: defaultUserLogState,
  setUserLogged: () => {},
};
