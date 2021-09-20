import { useState, useEffect } from "react";

import api from "../../services/api";
import history from "../../router/history";

export default function useAuth() {
  //const [authenticated, setAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const temp = JSON.parse(user);
      api.defaults.headers.Authorization = `Bearer ${temp.token}`;
      setPerfil(temp.perfil);
      //setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(mail, senha) {
    try {
      const {
        data: { token, perfil },
      } = await api.post("/usuario/login", { mail, senha });

      localStorage.setItem("user", JSON.stringify({ token, perfil }));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      //setAuthenticated(true);
      setPerfil(perfil);
      history.push("/registro");
    } catch (e) {
      if (e.response.data.error) {
        console.log(e.response.data.error[0]);
      } else {
        console.log("Problemas para validar os dados");
      }
    }
  }

  function handleLogout() {
    //setAuthenticated(false);
    setPerfil("");
    localStorage.removeItem("user");
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  }

  function redirect(path) {
    history.push(path);
  }

  return {
    perfil,
    //authenticated,
    loading,
    handleLogin,
    handleLogout,
    redirect,
  };
}
