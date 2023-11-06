export const tableReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = STATE_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
};

export const tableInitial = [];

const config = {
  headers: {
    Authorization: JSON.parse(sessionStorage.getItem("userLogged")).token,
    "Content-Type": "application/json",
  },
};

export const ACTION_TYPES = {
  GET: "GET",
  PATCH: "PATCH",
  /* CLEAR: "CLEAR", */
};

const STATE_BY_ACTION = {
  [ACTION_TYPES.GET]: async (state, action) => {
    console.log(action);
    const { url, body = {} } = action.payload;

    const response = await fetch(url, config);
    const json = await response.json();

    /* if (!response.ok) {
      if (response.status === 401) {
        Swal.fire("Sesión expirada", "Será redirigido al login.", "error");
        setUserLogged(defaultUserLogState);
        navigate("/login");
      }

      if (
        response.status === 400 ||
        (response.status > 401 && response.status < 500)
      ) {
        throw new Error(
          `Hubo un error con la petición: ${response.status} : ${response.statusText}`
        );
      }

      if (response.status > 499) {
        throw new Error(
          `Hubo un error con el servidor: ${response.status} : ${response.statusText}`
        );
      }
    } */

    const newState = [...json];
    console.log(newState);

    return newState;
  },

  [ACTION_TYPES.PATCH]: (state, action) => {
    const { id } = action.payload;
    const newState = state.filter((item) => item.id !== id);
    return newState;
  },

  /* [ACTION_TYPES.CLEAR]: () => {
    updateLocalStorage([]);
    return [];
  }, */
};
