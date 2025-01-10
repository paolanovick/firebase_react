/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const ItemCount = ({ stock, onAdd, item, decrement, increment }) => {
  // Corregir la propiedad "incrment" a "increment"
  const [count, setCount] = useState(stock);

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(item);
  };

  const handleDecrement = () => {
    console.log("Estoy aca");
    if (count > 1) {
      setCount(count - 1);
      decrement(item.id);
    }
  };

  return (
    <div className="item-count">
      <button onClick={handleDecrement}>-</button>
      <span>{count}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default ItemCount;
