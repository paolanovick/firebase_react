/* eslint-disable no-unused-vars */
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Nombre en el Footer */}
      <div style={styles.nombre}>TravelAr</div>

      {/* Textos típicos de un footer */}
      <div style={styles.textoFooter}>
        <p>&copy; 2024 TravelAr. Todos los derechos reservados.</p>
        <p>
          <a href="/politica-privacidad" style={styles.enlace}>
            Política de privacidad
          </a>
          {" | "}
          <a href="/terminos-condiciones" style={styles.enlace}>
            Términos y condiciones
          </a>
        </p>
        <p>Contacto: contacto@travelar.com</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
    bottom: 0,
    width: "100%",
    marginTop: "40px", // Agregado para añadir espacio entre el contenido y el footer
  },
  nombre: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#007BFF",
  },
  textoFooter: {
    fontSize: "14px",
    color: "#6c757d",
  },
  enlace: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default Footer;
