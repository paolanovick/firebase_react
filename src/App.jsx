
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./src/app.css";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemList from "./components/ItemList";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDocs, collection } from "firebase/firestore";
import { getItemById, getItems } from "./firebase/db";
import { db } from "./firebase/config";
import SelectPrices from "./components/SelectPrices";

const App = () => {
  const [destinos, setDestinos] = useState([]); // Lista de destinos
  const [destinosFiltrados, setDestinosFiltrados] = useState([]);
  const [paises, setPaises] = useState([]); // Lista de países
  const [paquetes, setPaquetes] = useState([]); // Paquetes de viaje
  const [paisSeleccionado, setPaisSeleccionado] = useState(""); // País seleccionado
  const [error, setError] = useState(""); // Manejo de errores
  const [item, setItem] = useState([]); // Items para el carrito
  const [selectedPrice, setSelectedPrice] = useState(null); // Precio seleccionado

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

  // Filtrar destinos por país cuando el país seleccionado cambie
  useEffect(() => {
     
    if (paisSeleccionado === "") {
      setDestinosFiltrados(destinos);
    } else {
      const destinosFiltradosPorPais = destinos.filter((destino) =>
        destino?.destino?.toLowerCase().includes(paisSeleccionado.toLowerCase())
      );
        console.log("Destinos filtrados:", destinosFiltradosPorPais);
      setDestinosFiltrados(destinosFiltradosPorPais);
    }
  }, [paisSeleccionado, destinos]);

  const handlePaisSeleccionado = (paisSeleccionado) => {
    console.log("Pais seleccionado:", paisSeleccionado);

    // Filtra los destinos por el país seleccionado
    const destinosFiltrados = destinos.filter((destino) => {
      // Asegúrate de que el destino se divida correctamente en país y ciudad
      const [pais, ciudad] = destino.destino
        .split(",")
        .map((item) => item.trim());
      return pais === paisSeleccionado; // Compara solo el país
    });

    // Actualiza los destinos filtrados
    setDestinosFiltrados(destinosFiltrados);

    // Verifica el resultado en la consola
    console.log("Destinos filtrados:", destinosFiltrados);
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
  }, []);

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
              element={
                <ItemList paquetes={paquetes} destinos={destinosFiltrados} />
              }
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
