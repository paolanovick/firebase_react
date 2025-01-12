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
      navigate("/checkout");
    }
  }, [purchaseDetails, navigate]);

  return (
    <div className="confirmacion-container">
      <h2>Confirmación de Compra</h2>
      {purchaseDetails ? (
        <>
          <h3>Resumen de la compra</h3>
          <p>
            <strong>Nombre:</strong> {purchaseDetails.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {purchaseDetails.customer.email}
          </p>
          <p>
            <strong>Dirección:</strong> {purchaseDetails.customer.address}
          </p>
          <p>
            <strong>Método de pago:</strong>{" "}
            {purchaseDetails.customer.paymentMethod}
          </p>

          <h3>Artículos Comprados:</h3>
          <ul>
            {purchaseDetails.cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - Cantidad: {item.quantity || 1}
              </li>
            ))}
          </ul>

          <h3>Total: {purchaseDetails.total}</h3>
        </>
      ) : (
        <p>No se encontraron detalles de la compra.</p>
      )}
    </div>
  );
};

export default Confirmation;
