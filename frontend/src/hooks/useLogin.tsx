import { UserLoggedContext } from "../contexts/UserLoggedContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultPedidoState } from "../components/types/UserLogged";

export const useLogin = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const { setUserLogged, setPedido } = useContext(UserLoggedContext);
  const [authError, setAuthError] = useState<string>("");
  const [responseError, setResponseError] = useState<boolean>(false);
  const [user, setUser] = useState({
    usuario: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleLogin = async (e: any) => {
    e.preventDefault();
    navigate(`/login`, { replace: true });
    try {
      if (validateLoginForm()) {
        setLoading(true);
        const response = await fetch("http://localhost:8080/login", settings);
        const json = await response.json();
        if (!response.ok) {
          setLoading(false);
          setResponseError(true);
          setAuthError(json.message);
        } else {
          const token = window.atob(json.token.split(".")[1]);
          const claims = JSON.parse(token);
          const isAdmin = claims.isAdmin;
          const roles = JSON.parse(claims.authorities).map(
            (rol: any) => rol.authority
          ); //roles mapeados por alguna feature

          sessionStorage.setItem("roles", JSON.stringify(roles));
          setUserLogged({
            id: json.id,
            email: claims.sub,
            isAuth: true,
            isAdmin: isAdmin,
            token: `Bearer ` + json.token,
          });
          setPedido(defaultPedidoState);

          setLoading(false);
          navigate("/home", { replace: true });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMailChange = (e: any) => {
    setResponseError(false);
    setErrors([]);
    setUser({ ...user, usuario: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
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
    loading,
  };
};
