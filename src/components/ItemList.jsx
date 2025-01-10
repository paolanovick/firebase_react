/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";

const ItemList = ({ paquetes = [] }) => {
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

  if (paquetes.length === 0) {
    return <div>No hay paquetes disponibles.</div>;
  }

  return (
    <div className="row">
      {paquetes.map((paquete) => (
        <div
          key={paquete.paquete_externo_id}
          className="col-lg-3 col-md-4 col-sm-6"
        >
          <div className="card">
            <img
              src={
                paquete.url && paquete.url[0]
                  ? paquete.url[0]
                  : "/placeholder.jpg"
              } // Validar existencia de imágenes
              alt={paquete.titulo || "Imagen no disponible"}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{paquete.titulo || "Sin título"}</h5>
              <p className="card-text">
                {paquete.incluye || "Sin descripción"}
              </p>
              <p>
                <strong>Precios:</strong>
                <br />
                Habitación Doble: {formatearPrecio(paquete.doble_precio)}
                <br />
                Habitación Triple: {formatearPrecio(paquete.triple_precio)}
                <br />
                Habitación Familiar: {formatearPrecio(paquete.familia_1_precio)}
              </p>

              <div className="m-3">
                <Link to={`/detalle/${paquete.paquete_externo_id}`}>
                  <Button label="Ver más" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Asegúrate de que la prop "paquetes" sea un array
ItemList.propTypes = {
  paquetes: PropTypes.array.isRequired,
};

export default ItemList;
