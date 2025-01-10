/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartFromFirebase, setCartToFirebase } from "../firebase/config"; // Ajusta la importación a tu archivo config.js
import Button from "../components/Button";
import { useCart } from "../context/CartContext";
import SelectPrices from "../components/SelectPrices";
import ItemCount from "../components/ItemCount"; // Importa tu componente de botón personalizado

// Función exportada fuera del componente Cart.jsx
export const obtenerPrecioValido = (paquete) => {
  console.log("el parquete es :", paquete);
  return 0;
};
const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateCart, calcularTotal, removeFromCart } = useCart();
  const [cart, setCart] = useState([]);
  const [totalBeforeClear, setTotalBeforeClear] = useState(0);
  const [total, setTotal] = useState(calcularTotal());

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
    // Perform any additional logic here
  }, [cartItems]); // Dependency on cartItems

  const updateCartInFirebase = async (updatedCart) => {
    const cartData = {
      items: updatedCart || cart,
      total: calcularTotal(updatedCart || cart),
    };

    try {
      //await setCartToFirebase(cartData);
      setCart(updatedCart || cart);
      setTotal(calcularTotal());
    } catch (error) {
      console.error("Error al guardar el carrito en Firebase:", error);
    }

    console.log("El estado del carrito es :", cartItems);
  };

  const handleRemoveFromCart = (paquete_externo_id) => {
    removeFromCart(paquete_externo_id);
  };

  const handleCheckout = () => {
    const total = calcularTotal();
    setTotalBeforeClear(total);
    updateCartInFirebase([]); // Limpiar carrito
    navigate(`/checkout?total=${total}`);
  };

  const handlePriceSelect = (itemId, selectedPrice) => {
    console.log("Estoy en handle price select");
    cartItems.map((item) => {
      if (item.item.paquete_externo_id === itemId) {
        item.selectedPrice = selectedPrice;
      }
      return item;
    });
    setCart(cartItems);
    updateCartInFirebase(cartItems);
    console.log("CART ITEMS ES:", cartItems);
    setTotal(calcularTotal());
    console.log("el total es :", total);

    //updateCartInFirebase(updatedCart);
  };

  return (
    <div
      className="cart"
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        gap: "20px",
      }}
    >
      <div style={{ flex: 2 }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Carrito de Compras
        </h2>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
            El carrito está vacío.
          </p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div
                key={item.item.paquete_externo_id || `item-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  marginBottom: "15px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                  <img
                    src={item.item.url[0]}
                    alt={item.item.titulo}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                      marginRight: "20px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>
                      {item.item.titulo}
                    </h3>
                    <p style={{ margin: "5px 0", color: "#777" }}>
                      {item.item.incluye}
                    </p>

                    <SelectPrices
                      item={item}
                      onSelectPrice={(price) =>
                        handlePriceSelect(item.item.paquete_externo_id, price)
                      }
                    />

                    <ItemCount
                      stock={item.quantity}
                      item={item}
                      onAdd={() => {
                        const updatedCart = [...cartItems];
                        const index = updatedCart.findIndex(
                          (i) =>
                            i.item.paquete_externo_id ===
                            item.item.paquete_externo_id
                        );
                        if (index !== -1) {
                          updatedCart[index].quantity += 1;
                        }
                        updateCartInFirebase(updatedCart);
                      }}
                      decrement={() => {
                        const updatedCart = [...cartItems];
                        const index = updatedCart.findIndex(
                          (i) =>
                            i.item.paquete_externo_id ===
                            item.item.paquete_externo_id
                        );
                        if (index !== -1 && updatedCart[index].quantity > 1) {
                          updatedCart[index].quantity -= 1;
                        }
                        updateCartInFirebase(updatedCart);
                      }}
                    />
                  </div>
                </div>

                <div style={{ textAlign: "right", flex: 1 }}>
                  <Button
                    label="Eliminar"
                    onClick={() =>
                      handleRemoveFromCart(item.item.paquete_externo_id)
                    }
                    style={{
                      backgroundColor: "#ff3b30",
                      color: "#fff",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Resumen de Compra
        </h3>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
          Total: {total}
        </p>
        <Button
          label="Ir a Checkout"
          onClick={handleCheckout}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
      </div>
    </div>
  );
};

export default Cart;
