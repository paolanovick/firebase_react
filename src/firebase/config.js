/* eslint-disable no-undef */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
 
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

export const getCartFromFirebase = async (paqueteExternoId) => {
  try {
    const cartRef = doc(db, "items", paqueteExternoId.toString()); // Asegúrate de convertir el ID a string
    const docSnap = await getDoc(cartRef);

    if (docSnap.exists()) {
      const cartData = docSnap.data(); // Obtén los datos del carrito

      // Asegúrate de que 'paquete_externo_id' sea un número
      const paqueteExternoIdFromFirebase = cartData.item.item.paquete_externo_id;
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

export const setCartToFirebase = async (cartData) => {
  console.log("Datos del carrito:", cartData); // Depura los datos que llegan a la función

  // Asegúrate de que `cartData.item` esté definido
  if (!cartData || !cartData.item.item) {
    console.error("El carrito no contiene el objeto 'item'");
    return;
  }

  try {
    const cartRef = doc(db, "items", paquete_externo_id.toString());
    await setDoc(cartRef, cartData);
    console.log("Carrito guardado correctamente");
  } catch (error) {
    //to commit
    console.error("Error al guardar el carrito en Firebase:", error);
  }
};


// Función para obtener destinos de Firebase
export const fetchDestinos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    const destinosData = querySnapshot.docs.map((doc) => doc.data());
    // Asegúrate de definir o pasar las funciones setDestinos y setDestinosFiltrados
    setDestinos(destinosData); // Asegúrate de definir esta función
    setDestinosFiltrados(destinosData); // Asegúrate de definir esta función
  } catch (err) {
    console.error("Error al obtener los destinos:", err);
    // Asegúrate de definir la función setError
    setError(`Error al obtener los destinos: ${err.message}`);
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

export { db };
export default app;
