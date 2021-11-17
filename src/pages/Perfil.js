import React, { useEffect, useState, useContext } from "react";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import api from "../services/api";
import { Context } from "../context/AuthContext";

const Perfil = () => {
  const [idusuario, setIdusuario] = useState("");
  const [perfil, setPerfil] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const { setErrorMessage } = useContext(Context);

  useEffect(() => {
    //chamado ao carregar o componente
    (async () => {
      list();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = () => {
    api
      .get("/usuario/list")
      .then(({ data }) => {
        setErrorMessage("");
        setUsuarios(data.usuarios);
      })
      .catch((e) => setErrorMessage(e.response.data.error[0]));
  };

  const save = (e) => {
    e.preventDefault();
    if (idusuario && perfil) {
      api
        .put("/usuario/update/perfil", { idusuario, perfil })
        .then(() => {
          reset(e);
          list();
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error[0]);
        });
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setIdusuario("");
    setPerfil("");
  };

  return (
    <div className="App-container">
      <div className="row">
        <Cabecalho />
      </div>
      <div className="row">
        <h4>Perfil de acesso</h4>
      </div>
      <div className="row">
        <form>
          {idusuario && (
            <div className="row">
              <label>ID: {idusuario}</label>
            </div>
          )}
          <div className="row">
            <label>Perfil</label>
            <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
              <option value=""></option>
              <option value="admin">Administrador</option>
              <option value="user">Usuário</option>
            </select>
          </div>
          <div className="column">
            <button onClick={save}>Salvar</button>
            <button onClick={reset}>Limpar</button>
          </div>
        </form>
      </div>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>e-mail</th>
              <th>Perfil</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((item) => (
              <tr
                key={item.idusuario}
                onClick={() => {
                  setIdusuario(item.idusuario);
                  setPerfil(item.perfil);
                }}
              >
                <td>{item.idusuario}</td>
                <td>{item.mail}</td>
                <td>{item.perfil}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
      <Rodape />
    </div>
    </div>
  );
};

export default Perfil;
