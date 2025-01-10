/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const TravelCard = ({ titulo, destinos, imagenPrincipal, precio, url }) => {
  return (
    <div className="card">
      <img src={imagenPrincipal} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">
          {destinos.map((destino, index) => (
            <span key={index}>
              <strong>
                {destino.ciudad}, {destino.pais}
              </strong>
              {index < destinos.length - 1 && ", "}
            </span>
          ))}
        </p>
        <p className="card-text">Precio: ${precio}</p>
        <a
          href={url}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver más
        </a>
      </div>
    </div>
  );
};

export default TravelCard;
