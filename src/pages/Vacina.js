import React, { useEffect, useState } from "react";
import Cabecalho from "../components/Cabecalho";
import api from "../services/api";

const Vacina = () => {
  const [idvacina, setIdvacina] = useState("");
  const [nome, setNome] = useState("");
  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    //chamado ao carregar o componente
    (async () => {
      list();
    })();
  }, []);

  const list = () => {
    api
      .get("/vacina/list")
      .then(({ data }) => {
        setVacinas(data.vacinas);
      })
      .catch((e) => console.log(e.response.data.error[0]));
  };

  const save = (e) => {
    e.preventDefault();
    if (!idvacina) {
      api
        .post("/vacina/create", { nome: nome.trim() })
        .then(() => {
          reset();
          list();
        })
        .catch((e) => {
          alert(e.response.data.error[0]);
        });
    } else {
      api
        .put("/vacina/update", { idvacina, nome: nome.trim() })
        .then(() => {
          reset();
          list();
        })
        .catch((e) => {
          alert(e.response.data.error[0]);
        });
    }
  };

  const remove = (e, idvacina) => {
    e.preventDefault();
    api
      .delete("/vacina/remove", { data: { idvacina } })
      .then(() => {
        list();
      })
      .catch((e) => {
        alert(e.response.data.error[0]);
      });
  };

  const reset = () => {
    setIdvacina("");
    setNome("");
  };

  return (
    <div>
      <Cabecalho />
      <h4>Vacina</h4>
      <form>
        {idvacina && (
          <div>
            <label>ID: {idvacina}</label>
          </div>
        )}
        <div>
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <button onClick={save}>Salvar</button>
          <button onClick={reset}>Limpar</button>
        </div>
      </form>
      {vacinas.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {vacinas.map((item) => (
              <tr
                key={item.idvacina}
                onClick={() => {
                  setIdvacina(item.idvacina);
                  setNome(item.nome);
                }}
                onContextMenu={(e) => remove(e, item.idvacina)}
              >
                <td>{item.idvacina}</td>
                <td>{item.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Vacina;