import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL_LOGIN = `${import.meta.env.VITE_URL_HOST_API}/login`;

export const useLogin = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { setUserLogged } = useContext(UserLoggedContext);
  const [authError, setAuthError] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [user, setUser] = useState({
    usuario: "",
    password: "",
  });

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const validateLoginForm = () => {
    const errors = [];

    if (user.usuario.trim() === "") {
      errors.push("El correo electrónico es obligatorio");
    } else if (!/\S+@\S+\.\S+/.test(user.usuario)) {
      errors.push("El correo electrónico es inválido");
    }

    if (user.password.trim() === "") {
      errors.push("No olvides ingresar tu contraseña");
    } else if (user.password.length < 4 || user.password.length > 15) {
      errors.push("La contraseña debe contener entre 4 y 15 caracteres");
    }
    setErrors(errors);
    return errors.length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    //como no quiero que la persona regrese despues de pasar por el login, lo pongo en true para reemplazar el historial
    navigate({ replace: true });

    try {
      if (validateLoginForm()) {
        const response = await fetch(URL_LOGIN, settings);
        const json = await response.json();

        if (!response.ok) {
          setResponseError(true);
          setAuthError(json.message);
        } else {
          const claims = JSON.parse(window.atob(json.token.split(".")[1]));
          const isAdmin = claims.isAdmin;
          const roles = JSON.parse(claims.authorities).map(
            (rol) => rol.authority
          ); //roles mapeados por alguna feature
          sessionStorage.setItem("token", `Bearer ${json.token}`);

          setUserLogged({
            id: json.id,
            email: claims.sub,
            isAuth: true,
            isAdmin: isAdmin,
          });

          navigate("/home");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMailChange = (e) => {
    setResponseError(false);
    setErrors([]);
    setUser({ ...user, usuario: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setResponseError(false);
    setErrors([]);
    setUser({ ...user, password: e.target.value });
  };

  return {
    handleLogin,
    user,
    errors,
    responseError,
    handleMailChange,
    handlePasswordChange,
    authError,
  };
};
