export type UserLogged = {
  id: number;
  email: string;
};

export type UserLoggedContextType = {
  userLogged: UserLogged;
  setUserLogged: React.Dispatch<React.SetStateAction<UserLogged>>;
};

export const defaultUserLogState = { id: -1, email: "" };

export const defaultContext: UserLoggedContextType = {
  userLogged: defaultUserLogState,
  setUserLogged: () => {}
};
