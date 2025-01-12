/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const { purchaseDetails } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si no hay detalles de compra y redirige al checkout
    if (!purchaseDetails) {
      console.log("No hay detalles de compra. Redirigiendo al checkout...");
      navigate("/checkout");
    } else {
      // Debug: Verifica los detalles de la compra
      console.log("Detalles de la compra:", purchaseDetails);
    }
  }, [purchaseDetails, navigate]);

  return (
    <div className="confirmacion-container">
      <h2>Confirmación de Compra</h2>
      {purchaseDetails ? (
        <>
          <h3>Resumen de la compra</h3>
          <p>
            <strong>Nombre:</strong> {purchaseDetails.customer?.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {purchaseDetails.customer?.email || "N/A"}
          </p>
          <p>
            <strong>Dirección:</strong>{" "}
            {purchaseDetails.customer?.address || "N/A"}
          </p>
          <p>
            <strong>Método de pago:</strong>{" "}
            {purchaseDetails.customer?.paymentMethod || "N/A"}
          </p>

          <h3>Artículos Comprados:</h3>
          <ul>
            {purchaseDetails.cartItems &&
            purchaseDetails.cartItems.length > 0 ? (
              purchaseDetails.cartItems.map((cartItem, index) => (
                <li key={index}>
                  {/* Debug: Verifica cada artículo comprado */}
                  {console.log("Artículo comprado:", cartItem)}
                  <strong>Título:</strong> {cartItem.name || "Sin título"} -
                  <strong> Cantidad:</strong> {cartItem.quantity || 1}
                </li>
              ))
            ) : (
              <li>No hay artículos comprados.</li>
            )}
          </ul>

          <h3>Total: {purchaseDetails.total || 0}</h3>
        </>
      ) : (
        <p>No se encontraron detalles de la compra.</p>
      )}
    </div>
  );
};

export default Confirmation;
