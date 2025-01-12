

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";

// CartContext.jsx
const CartContext = createContext();
 // Estado de los elementos en el carrito
// Esto define la variable cart

// Hook para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider");
  }
  return context;
};

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState(null); // Detalles de la compra

  // Function to update the entire cart with new items
  const updateCart = (newCartItems) => {
    setCartItems(newCartItems);
  };
  // Función para decrementar la cantidad de un artículo en el carrito
  const decrementFromCart = (itemId) => {
    console.log(`Decrementando cantidad para el artículo con ID: ${itemId}`);
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0); // Filtra los artículos con cantidad > 0
      console.log("Nuevo carrito después de decrementar:", updatedItems);
      return updatedItems;
    });
  };

  // Función para agregar un producto al carrito
  const addToCart = (item) => {
    console.log(`Agregando artículo al carrito:`, item);
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      if (updatedItems.find((cartItem) => cartItem.id === item.id)) {
        console.log("Artículo existente, cantidad incrementada:", updatedItems);
        return updatedItems;
      }

      const newItems = [...prevItems, { ...item, quantity: 1 }];
      console.log("Nuevo artículo agregado:", newItems);
      return newItems;
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (itemId) => {
    console.log(`Eliminando artículo con ID: ${itemId}`);
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.paquete_externo_id !== itemId
      );
      console.log("Nuevo carrito después de eliminar:", updatedItems);
      return updatedItems;
    });
  };

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.selectedPrice) || 0; // Convertir a número y usar 0 si no es válido
      const quantity = Number(item.quantity) || 1;
      console.log(`Item: ${item.name}, Price: ${price}, Quantity: ${quantity}`);
 
      return total + price * quantity;
    }, 0);
  };
  // Contador de productos en el carrito
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Mostrar  del carrito
  console.log("Estado actual del carrito:", cartItems);
  // Función para vaciar el carrito
  const clearCart = () => {
    console.log("Vaciando el carrito");
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        decrementFromCart,
        itemCount,
        cart,
        setCart,
        updateCart,
        calcularTotal,
        purchaseDetails,
        setPurchaseDetails,
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
