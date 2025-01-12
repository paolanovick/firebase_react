/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams
import { useCart } from "../context/CartContext";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Carousel } from "react-bootstrap";
// Asegúrate de tener esta función en tu archivo de Firebase

import Button from "../components/Button";
import { Container, Row, Col, Card, Image } from "react-bootstrap";



const ItemDetailContainer = () => {
  const { id } = useParams(); // Obtén el idProducto desde los parámetros de la URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    if (!id) {
      setError("ID no válido");
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        const db = getFirestore(); // Inicializa Firestore
        const itemsCollection = collection(db, "items"); // Referencia a la colección
const numericId = Number(id);

        const q = query(
          itemsCollection,
          where("paquete_externo_id", "==", numericId) // Ensure `id` matches the stored value
        );

        try {
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            console.log("No matching documents found");
          } else {
            querySnapshot.forEach((doc) => {
              console.log("Found Document:", doc.id, "=>", doc.data());
            });
          }
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
        // Filtra por el campo
        const querySnapshot = await getDocs(q); // Ejecuta la consulta

        if (!querySnapshot.empty) {
          // Si se encuentra el documento, tomamos el primero (en caso de haber múltiples coincidencias)
          const docSnap = querySnapshot.docs[0];
          setItem({ id: docSnap.id, ...docSnap.data() }); // Guarda el documento en el estado
        } else {
          console.log("No se encontró el documento");
          setError("No se encontró el documento.");
        }
      } catch (error) {
        // Si hay un error en la consulta, lo mostramos
        console.error("Error al obtener el item:", error);
        setError("Error al obtener el item.");
      } finally {
        // Cuando termine la consulta, dejamos de mostrar el indicador de carga
        setLoading(false);
      }
    };

    // Llamamos a la función que obtiene el ítem
    fetchItem();
  }, [id]); // Dependemos del `id` para que el efecto se ejecute cuando cambie

  const handleAddToCart = () => {
    console.log("el item es :", item);
    if (item) {
      const to_add = { item, quantity: 1 };
      addToCart(to_add);
    }
    console.log("el carrito es :", cartItems);
  };

  const obtenerPrecioValido = (paquete) => {
    const precios = [
      paquete.doble_precio,
      paquete.familia_1_precio,
      paquete.triple_precio,
    ];

    const preciosValidos = precios
      .filter((precio) => !isNaN(precio) && parseFloat(precio) > 0)
      .map((precio) => parseFloat(precio));

    if (preciosValidos.length > 0) {
      return preciosValidos[0].toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
    }

    return "No disponible";
  };

  const formatFecha = (fecha) => {
    if (fecha) {
      const date = new Date(fecha.seconds * 1000); // Firebase almacena las fechas como timestamps
      return date.toLocaleDateString("es-AR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "Fecha no disponible";
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const {
    titulo,
    destino,
    url = [],
    incluye,
    
    fecha_vigencia_desde,
    fecha_vigencia_hasta,
    hotel,
    galeria_imagenes = [],
  } = item || {};

  return (
    
    <Container className="item-detail-container">
      <h1 className="titulo-detalle text-center my-4">{titulo}</h1>

      <Row className="producto-card">
        <Col md={4} className="imagen-principal">
          {url.length > 0 && <Image src={url[0]} alt={titulo} fluid rounded />}
        </Col>

        <Col md={8} className="descripcion">
          <Card className="product-details">
            <Card.Body>
              <Card.Title>{titulo}</Card.Title>
              <Card.Text>{destino}</Card.Text>
              <p>
                <strong>Hotel:</strong> {hotel}
              </p>
              <p>
                <strong>Destino:</strong> {destino}
              </p>
              <p>
                <strong>Incluye:</strong> {incluye}
              </p>
              <p>
                <strong>Fecha de vigencia desde:</strong>{" "}
                {formatFecha(fecha_vigencia_desde)}
              </p>
              <p>
                <strong>Fecha de vigencia hasta:</strong>{" "}
                {formatFecha(fecha_vigencia_hasta)}
              </p>
              <div className="precios">{obtenerPrecioValido(item)}</div>
              <Button label="Agregar al carrito" onClick={handleAddToCart} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="galeria_imagenes">
        {/* Muestra todas las imágenes en una galería */}
        {url.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Imagen ${index + 1}`}
            fluid
            rounded
            onError={(e) => (e.target.style.display = "none")} // Oculta imagen si hay un error de carga
          />
        ))}
      </div>
    </Container>
  );
};

export default ItemDetailContainer;
