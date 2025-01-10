/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const withLoading = (Component) => {
  // Este HOC agrega funcionalidad de carga
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <div>Cargando...</div>; // Mostrar un mensaje o spinner mientras carga
    }

    return <Component {...props} />;
  };
};

export default withLoading;
