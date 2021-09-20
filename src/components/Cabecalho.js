import React, { useContext } from "react";

import { Context } from "../context/AuthContext";

const Cabecalho = () => {
  const { perfil, handleLogout, redirect } = useContext(Context);

  return (
    <div className="cabecalho">
      <h3>Cadastro de vacinas</h3>
      {perfil !== "" && (
        <>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => redirect("/registro")}>Registro</button>
        </>
      )}
      {perfil === "admin" && (
        <button onClick={() => redirect("/vacina")}>Vacina</button>
      )}
    </div>
  );
};

export default Cabecalho;
