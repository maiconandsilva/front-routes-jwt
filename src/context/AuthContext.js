import React, { createContext } from "react";

import useAuth from "./hooks/useAuth";

const Context = createContext();

function AuthProvider({ children }) {
  const { perfil, loading, handleLogin, handleLogout, redirect } = useAuth();
  return (
    <Context.Provider
      value={{
        perfil,
        loading,
        handleLogin,
        handleLogout,
        redirect,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
