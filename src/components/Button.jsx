/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";


const Button = ({ label, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: "transparent", // Sin fondo
        color: "#333", // Color del texto
        border: "1px solid #ccc", // Borde fino y sutil
        padding: "4px ", // Espaciado ajustado
        borderRadius: "5px", // Bordes ligeramente redondeados
        cursor: "pointer", // Manito al pasar
        fontSize: "12px", // Tamaño de fuente moderado
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra ligera
        transition: "all 0.3s ease", // Suavidad en las transiciones
      }}
      onMouseOver={(e) => {
        e.target.style.borderColor = "#333"; // Cambia el color del borde al pasar
        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)"; // Sombra más marcada
      }}
      onMouseOut={(e) => {
        e.target.style.borderColor = "#ccc"; // Vuelve al borde original
        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"; // Vuelve a la sombra original
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};



export default Button;
