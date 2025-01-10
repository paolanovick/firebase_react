/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams
import { useCart } from "../context/CartContext";
import { getItems } from "../firebase/db"; // Asegúrate de tener la función getItems en tu archivo de Firebase

import Button from "../components/Button";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

const ItemDetailContainer = () => {
  const { idProducto } = useParams(); // Obtén el idProducto desde los parámetros de la URL
  const [detalleProducto, setDetalleProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const itemsData = await getItems(); // Llama a Firebase para obtener los productos
        const producto = itemsData.find(
          (item) => item.paquete_externo_id === idProducto
        ); // Busca el producto por el ID
        if (producto) {
          setDetalleProducto(producto); // Actualiza el estado con los detalles del producto
        } else {
          setError("Producto no encontrado.");
        }
      } catch (err) {
        setError("Error al obtener los detalles del producto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idProducto]); // Se vuelve a ejecutar cuando cambia el idProducto

  const handleAddToCart = () => {
    let to_add = {
      detalleProducto,
      quantity: 1,
    };
    addToCart(to_add); // Añadir al carrito utilizando el método del contexto
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const {
    detalles_adicionales,
    destinos,
    fecha_vigencia_desde,
    fecha_vigencia_hasta,
    incluye,
    hoteles,
    galeria_imagenes,
  } = detalleProducto || {};

  const renderPrecio = (paquete) => {
    const precioFormateado = obtenerPrecioValido(paquete);

    if (precioFormateado === "No disponible") {
      return (
        <p>
          <strong>Precio no disponible</strong>
        </p>
      );
    }

    return (
      <p>
        <strong>Precio:</strong> {precioFormateado}
      </p>
    );
  };

  return (
    <Container className="item-detail-container">
      <h1 className="titulo-detalle text-center my-4">{titulo}</h1>

      <Row className="producto-card">
        <Col md={4} className="imagen-principal">
          <Image src={imagen_principal} alt={titulo} fluid rounded />
        </Col>

        <Col md={8} className="descripcion">
          <Card className="product-details">
            <Card.Body>
              <Card.Title>{titulo}</Card.Title>
              <Card.Text>{descripcion}</Card.Text>
              <div className="precios">{renderPrecio(detalleProducto)}</div>
              <Button label="Agregar al carrito" onClick={handleAddToCart} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Galería de imágenes */}
      <div className="galeria-imagenes">
        {galeria_imagenes.map((url, index) => (
          <Image key={index} src={url} fluid rounded />
        ))}
      </div>
    </Container>
  );
};

export default ItemDetailContainer;
