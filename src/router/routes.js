import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Context } from "../context/AuthContext";

import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Vacina from "../pages/Vacina";

function CustomRoute({ isAdmin, isUser, ...rest }) {
  const { loading, perfil } = useContext(Context);

  if (loading) {
    return <h3>Carregando...</h3>;
  }

  if (isAdmin && perfil !== "admin") {
    return <Redirect to="/login" />;
  }
  if (isUser && perfil === "") {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isUser exact path="/registro" component={Registro} />
      <CustomRoute isAdmin exact path="/vacina" component={Vacina} />
    </Switch>
  );
}
