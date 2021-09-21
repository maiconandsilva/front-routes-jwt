import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Context } from "../context/AuthContext";

import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Usuario from "../pages/Usuario";
import Vacina from "../pages/Vacina";

function CustomRoute({ isAdmin, isUser, ...rest }) {
  const { isLoading, profile } = useContext(Context);

  if (isLoading) {
    return <h3>Carregando...</h3>;
  }
  console.log(
    "isAdmin",
    isAdmin,
    "isUser",
    isUser,
    "profile",
    profile,
    "isLoading",
    isLoading,
    rest.path
  );
  if (isAdmin && profile !== "admin") {
    return <Redirect to="/login" />;
  }
  if (isUser && !profile) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isUser exact path="/registro" component={Registro} />
      <CustomRoute isUser exact path="/usuario" component={Usuario} />
      <CustomRoute isAdmin exact path="/vacina" component={Vacina} />
    </Switch>
  );
}
