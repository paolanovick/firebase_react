/* eslint-disable no-undef */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBo89OyesZwSRBkx-FERQhErX8zVe4uTUQ",
  authDomain: "travelfar-3f8d9.firebaseapp.com",
  projectId: "travelfar-3f8d9",
  storageBucket: "travelfar-3f8d9.firebasestorage.app",
  messagingSenderId: "878666935919",
  appId: "1:878666935919:web:eb62ed6e0cc26a5418679a",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener el carrito desde Firebase
export const getCartFromFirebase = async (paqueteExternoId) => {
  try {
    const cartRef = doc(db, "items", paqueteExternoId.toString()); // Asegúrate de convertir el ID a string
    const docSnap = await getDoc(cartRef);

    if (docSnap.exists()) {
      const cartData = docSnap.data();
      const paqueteExternoIdFromFirebase =
        cartData.item.item.paquete_externo_id;
      console.log(
        "paquete_externo_id desde Firebase:",
        paqueteExternoIdFromFirebase
      );
      return cartData; // Retorna todos los datos del carrito
    } else {
      console.log("Carrito no encontrado");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    return null;
  }
};

// Función para guardar el carrito en Firebase
export const setCartToFirebase = async (cartData) => {
  console.log("Datos del carrito:", cartData); // Depura los datos que llegan a la función

  if (!cartData || !cartData.item || !cartData.item.item) {
    console.error("El carrito no contiene el objeto 'item'");
    return;
  }

  try {
    const paqueteExternoId = cartData.item.item.paquete_externo_id; // Asegúrate de obtener el ID correctamente
    const cartRef = doc(db, "items", paqueteExternoId.toString()); // Usar 'paqueteExternoId' aquí
    await setDoc(cartRef, cartData); // Guardar el carrito en Firebase
    console.log("Carrito guardado correctamente");
  } catch (error) {
    console.error("Error al guardar el carrito en Firebase:", error);
  }
};

// Función para obtener destinos de Firebase
export const fetchDestinos = async (setDestinos, setDestinosFiltrados) => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    const destinosData = querySnapshot.docs.map((doc) => doc.data());
    setDestinos(destinosData); // Asegúrate de definir esta función
    setDestinosFiltrados(destinosData); // Asegúrate de definir esta función
  } catch (err) {
    console.error("Error al obtener los destinos:", err);
    setError(`Error al obtener los destinos: ${err.message}`);
  }
};

// Función para guardar los datos de la compra en Firebase
export const savePurchaseToFirebase = async (purchaseDetails) => {
  try {
    const purchaseRef = collection(db, "compras");

    // Validación de los datos de la compra
    if (
      !purchaseDetails.customer ||
      !purchaseDetails.cartItems ||
      !purchaseDetails.total
    ) {
      throw new Error("Faltan datos en la compra");
    }

    // Guardar los detalles de la compra en la colección 'compras'
    const docRef = await addDoc(purchaseRef, {
      customer: purchaseDetails.customer,
      cartItems: purchaseDetails.cartItems,
      total: purchaseDetails.total,
      purchaseDate: serverTimestamp(), // Usa serverTimestamp para la fecha en Firebase
    });

    console.log("Compra guardada con ID:", docRef.id);
    return docRef.id; // Retorna el ID del documento de compra
  } catch (error) {
    console.error("Error al guardar la compra:", error);
    throw new Error("Error al guardar la compra en Firebase");
  }
};

// Función para obtener un item por su ID
export const getItemById = async (id) => {
  try {
    const docRef = doc(db, "productos", id); // Usa la sintaxis moderna de Firebase v9
    const docSnap = await getDoc(docRef); // Obtiene el documento por su ID

    if (docSnap.exists()) {
      return docSnap.data(); // Devuelve los datos si el documento existe
    } else {
      console.log("Producto no encontrado");
      return null; // Devuelve null si el producto no existe
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para manejar el formulario y enviar los datos
export const handleFormSubmit = async (event, formData) => {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Validación básica del formulario
  if (!formData.nombre || !formData.email || !formData.paqueteId) {
    console.error("Faltan campos en el formulario.");
    return;
  }

  // Crear un objeto con los datos que deseas guardar
  const purchaseDetails = {
    customer: {
      nombre: formData.nombre,
      email: formData.email,
    },
    cartItems: formData.cartItems, // Los items del carrito
    total: formData.total, // El total de la compra
  };

  try {
    const purchaseId = await savePurchaseToFirebase(purchaseDetails); // Guardar los detalles de la compra en Firebase
    console.log("Compra realizada con éxito. ID:", purchaseId);
  } catch (error) {
    console.error("Error al guardar la compra:", error);
  }
};

export { db };
export default app;
