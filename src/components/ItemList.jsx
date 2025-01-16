/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";

const ItemList = ({ destinos }) => {
  // Función para obtener y formatear un precio
  const formatearPrecio = (precio) => {
    if (isNaN(precio) || parseFloat(precio) <= 0) {
      return "No disponible";
    }
    return parseFloat(precio).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  return (
    <div className="item-list">
      {destinos.map((destino) => (
        <div key={destino.paquete_externo_id} className="card d-flex flex-row">
          {/* Imagen izquierda */}
          <img
            src={
              destino.url && destino.url[0]
                ? destino.url[0]
                : "/placeholder.jpg"
            }
            alt={destino.titulo || "Imagen no disponible"}
            className="card-img-left"
            style={{
              width: "200px",
              height: "auto",
              margin: "10px",
              borderRadius: "10px", // Bordes redondeados
            }}
            // Ajusta el tamaño de la imagen
          />

          {/* Contenido de la tarjeta */}
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{destino.titulo || "Sin título"}</h5>
            <p className="card-text">{destino.incluye || "Sin descripción"}</p>
            <p>
              <strong>Precios:</strong>
              <br />
              Habitación Doble: {formatearPrecio(destino.doble_precio)}
              <br />
              Habitación Triple: {formatearPrecio(destino.triple_precio)}
              <br />
              Habitación Familiar: {formatearPrecio(destino.familia_1_precio)}
            </p>
            <div className="m-3">
              <Link to={`/detalle/${destino.paquete_externo_id}`}>
                <Button label="Ver más" />
              </Link>
            </div>
          </div>
          {/* Imagen derecha */}
          <img
            src={
              destino.url && destino.url[1]
                ? destino.url[1]
                : "/placeholder.jpg"
            }
            alt={destino.titulo || "Imagen no disponible"}
            className="card-img-right"
            style={{
              width: "200px",
              height: "auto",
              margin: "10px",
              borderRadius: "10px", // Bordes redondeados
            }}
          />
        </div>
      ))}
    </div>
  );
};

// Asegúrate de que la prop "destinos" sea un array
ItemList.propTypes = {
  destinos: PropTypes.array.isRequired,
};

export default ItemList;
