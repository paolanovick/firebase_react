/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const { purchaseDetails } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    if (purchaseDetails === null || !Object.keys(purchaseDetails).length) {
      console.log("No hay detalles de compra. Redirigiendo al checkout...");
      navigate("/checkout");
    }
  }, [purchaseDetails]);

  return (
    <div className="confirmation-form">
      <h2>Confirmación de Compra</h2>
      {purchaseDetails ? (
        <>
          <div className="form-section">
           
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
          </div>

          <div className="form-section">
            <h3>Artículos Comprados:</h3>
            <ul>
              {purchaseDetails.cartItems &&
              purchaseDetails.cartItems.length > 0 ? (
                purchaseDetails.cartItems.map((cartItem, index) => (
                  <li key={index}>
                    <strong>Destino:</strong>{" "}
                    {cartItem.item.titulo || "Sin título"} -{" "}
                    <strong>Cantidad:</strong> {cartItem.quantity || 1}
                  </li>
                ))
              ) : (
                <li>No hay artículos comprados.</li>
              )}
            </ul>
          </div>

          <h3>Total: ${purchaseDetails.total || 0}</h3>
        </>
      ) : (
        <p>No se encontraron detalles de la compra.</p>
      )}
    </div>
  );
};

export default Confirmation;