/* eslint-disable no-unused-vars */
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Confirmation = () => {
  const { purchaseDetails } = useCart();
  const navigate = useNavigate();

  if (!purchaseDetails) {
    return (
      <div className="no-info">No se encontró la información de la compra.</div>
    );
  }

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">Compra Finalizada</h2>
      <div className="confirmation-summary">
        <h3 className="section-title">Resumen de tu pedido</h3>
        <ul className="item-list">
          {purchaseDetails.cartItems?.length > 0 ? (
            purchaseDetails.cartItems.map((item) => (
              <li key={item.paquete_externo_id} className="item">
                <span className="item-name">{item.name}</span>
                <span className="item-details">
                  {item.quantity} x ${item.price}
                </span>
              </li>
            ))
          ) : (
            <li>No hay productos en el carrito.</li>
          )}
        </ul>
        <p className="total-amount">Total: ${purchaseDetails.total}</p>
        <h3 className="section-title">Detalles del Cliente</h3>
        <p className="customer-info">
          <strong>Nombre:</strong> {purchaseDetails.customer.name}
        </p>
        <p className="customer-info">
          <strong>Correo:</strong> {purchaseDetails.customer.email}
        </p>
        <p className="customer-info">
          <strong>Dirección:</strong> {purchaseDetails.customer.address}
        </p>
        <p className="customer-info">
          <strong>Método de Pago:</strong>{" "}
          {purchaseDetails.customer.paymentMethod}
        </p>
      </div>
      <Button
        label="Volver a la tienda"
        onClick={handleGoBack}
        className="back-button"
      />
    </div>
  );
};

export default Confirmation;
