
/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const SelectPrices = ({ item, onSelectPrice }) => {
  const [selectedPrice, setSelectedPrice] = useState(""); // Store selected price

  // Sample price data
  const priceOptions = [
    { id: 1, label: "Precio base doble", price: item.item.doble_precio },
    { id: 2, label: "Precio base triple", price: item.item.triple_precio }, // Nueva opción
    { id: 3, label: "Plan familiar", price: item.item.familia_1_precio }, // Nueva opción
  ];

  // Handle selection change
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPrice(selectedValue);
    console.log("Selected Price:", selectedValue);

    // Llamar a la función `onPriceSelect` con el precio seleccionado
    if (onSelectPrice) {
      onSelectPrice(selectedValue);
    } else {
      console.error("onPriceSelect no está definido");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <label
        htmlFor="price-list"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Choose a Plan:
      </label>
      <select
        id="price-list"
        value={selectedPrice}
        onChange={handleChange}
        style={{
          display: "block",
          marginTop: "10px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <option value="" disabled>
          -- Select a Plan --
        </option>
        {priceOptions.map((option) => (
          <option key={option.id} value={option.price}>
            {option.label} - ${option.price}
          </option>
        ))}
      </select>

      {/* Display the selected price */}
      {selectedPrice && (
        <p style={{ marginTop: "20px", fontSize: "18px", color: "green" }}>
          You selected: ${selectedPrice}
        </p>
      )}
    </div>
  );
};

export default SelectPrices;
