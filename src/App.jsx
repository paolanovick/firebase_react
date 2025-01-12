/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemList from "./components/ItemList";
import NavBar from "./components/NavBar";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDocs, collection } from "firebase/firestore";
import { getItems } from "./firebase/db";
import { db } from "./firebase/config";

const App = () => {
  const [destinos, setDestinos] = useState([]); // Lista de destinos
  const [destinosFiltrados, setDestinosFiltrados] = useState([]); // Destinos filtrados
  const [paises, setPaises] = useState([]); // Lista de países
  const [paquetes, setPaquetes] = useState([]); // Paquetes de viaje
  const [paisSeleccionado, setPaisSeleccionado] = useState(""); // País seleccionado
  const [error, setError] = useState(""); // Manejo de errores
  const [item, setItem] = useState([]); // Items para el carrito
  const [selectedPrice, setSelectedPrice] = useState(null); // Precio seleccionado

  // Obtener destinos y países desde Firestore
  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const destinosCol = collection(db, "items");
        const destinosSnapshot = await getDocs(destinosCol);
        const destinosData = destinosSnapshot.docs.map((doc) => doc.data());
        setDestinos(destinosData);
        setDestinosFiltrados(destinosData);

        // Filtrar países únicos a partir de los destinos
        const paisesUnicos = [
          ...new Set(
            destinosData.flatMap((destino) => {
              const pais = destino?.destino?.split(",")[0]; // Extraemos solo el país (antes de la coma)
              return pais || [];
            })
          ),
        ];
        setPaises(paisesUnicos);
      } catch (err) {
        setError(`Error al obtener los destinos: ${err.message}`);
        console.error("Error al obtener los destinos:", err);
      }
    };

    fetchDestinos();
  }, []);

  // Filtrar destinos por país
  useEffect(() => {
    const destinosFiltrados = destinos.filter((destino) => {
      if (!paisSeleccionado) return true; // Muestra todos los destinos si no hay selección
      const [pais] = destino?.destino?.split(",").map((item) => item.trim());
      return pais === paisSeleccionado; // Compara solo el país
    });

    setDestinosFiltrados(destinosFiltrados);
  }, [paisSeleccionado, destinos]);

  // Obtener paquetes desde Firestore
  useEffect(() => {
    const fetchPaquetes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const paquetesData = querySnapshot.docs.map((doc) => doc.data());
        setPaquetes(paquetesData);
      } catch (err) {
        console.error("Error al obtener los paquetes:", err);
      }
    };

    fetchPaquetes();
  }, []);

  // Manejar selección de precio
  const handlePriceSelect = (price) => {
    console.log("llego a este precio:", price);
    setSelectedPrice(price);
  };

  // Función para manejar la selección de país
  const handlePaisSeleccionado = (paisSeleccionado) => {
    console.log("Pais seleccionado:", paisSeleccionado);
    setPaisSeleccionado(paisSeleccionado); // Actualizamos el país seleccionado
  };

  // Obtener los items para el carrito desde Firestore
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemsData = await getItems();
        setItem(itemsData);
      } catch (err) {
        setError(`Error al obtener los items: ${err.message}`);
        console.error("Error al obtener los items:", err);
      }
    };

    fetchItem();
  }, [destinos]);

  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <NavBar
            nombre="TravelFar"
            botonLabel="Ver Destinos"
            paises={paises}
            onPaisSeleccionado={handlePaisSeleccionado}
          />
          <Routes>
            <Route path="/" element={<Navigate to="/destinos" />} />
            <Route
              path="/destinos"
              element={<ItemList destinos={destinosFiltrados} />}
            />
            <Route path="/detalle/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmacion" element={<Confirmation />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
