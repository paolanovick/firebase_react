/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import Carrito from "./Carrito";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CardWidget from "./CardWidget";

const NavBar = ({ nombre, botonLabel, paises, onPaisSeleccionado, }) => {
  const { cartCount } = useCart();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        boxShadow: "0px 4px 6px rgba(19, 18, 18, 0.1)",
        flexWrap: "wrap",
        margin: "20px",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
        {nombre}
      </div>

      <Link to="/destinos" style={{ textDecoration: "none" }}>
        <Button
          label={botonLabel}
          onClick={() => {
            onPaisSeleccionado(""); // Resetea el filtro para mostrar todos los destinos
          }}
        />
      </Link>

      <div style={{ display: "flex", gap: "10px" }}>
        {/* Itera sobre los países y crea un botón para cada uno */}
        {paises.map((pais, index) => (
          <Button
            key={index}
            label={pais}
            onClick={() => onPaisSeleccionado(pais)} // Filtra los destinos por el país seleccionado
          />
        ))}
      </div>

      {/* Cart Widget */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/cart"
          style={{
            textDecoration: "none",
            marginLeft: "20px",
            background: "red",
          }}
        ></Link>
        <CardWidget />
      </div>
    </nav>
  );
};

export default NavBar;