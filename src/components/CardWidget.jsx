/* eslint-disable no-unused-vars */
import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CardWidget = () => {
  const { itemCount } = useCart();

  return (
    <Link to="/cart" className="cart-widget">
      🛒 <span>{itemCount}</span>
    </Link>
  );
};

export default CardWidget;
