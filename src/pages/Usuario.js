import React, { useState, useContext } from "react";
import Cabecalho from "../components/Cabecalho";
import api from "../services/api";
import { Context } from "../context/AuthContext";
import Rodape from "../components/Rodape";

const Usuario = () => {
  const [mail, setMail] = useState("");
  const [senha, setSenha] = useState("");
  const { setErrorMessage } = useContext(Context);

  const updateMail = (e) => {
    e.preventDefault();
    api
      .put("/usuario/update/mail", { mail: mail.trim() })
      .then(({ data }) => {
        if (data.idusuario) {
          setErrorMessage("e-mail atualizado");
        }
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error[0]);
      });
  };

  const updateSenha = (e) => {
    e.preventDefault();
    api
      .put("/usuario/update/senha", { senha: senha.trim() })
      .then(({ data }) => {
        if (data.idusuario) {
          setErrorMessage("Senha atualizada");
        }
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error[0]);
      });
  };

  return (
    <div className="App-container">
      <div className="row">
        <Cabecalho />
      </div>
      <div className="row">
        <h3>Seus dados de acesso</h3>
      </div>
      <form>
        <div className="row">
          <label>e-mail</label>
          <input value={mail} onChange={(e) => setMail(e.target.value)} />
          <button onClick={updateMail}>Alterar</button>
        </div>
        <div className="row">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button onClick={updateSenha}>Alterar</button>
        </div>
      </form>
      <div className="row">
        <Rodape />
      </div>
    </div>
  );
};

export default Usuario;
