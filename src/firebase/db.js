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

// Función para obtener los productos (items)
export const getItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    const itemsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return itemsData; // Devuelve los datos de los productos
  } catch (err) {
    console.error("Error al obtener los productos:", err);
    throw new Error("Error al obtener los productos"); // Lanza un error si algo falla
  }
};

// Función para obtener el carrito de Firebase
export const getCartFromFirebase = async () => {
  try {
    const cartCollection = collection(db, "cart");
    const cartSnapshot = await getDocs(cartCollection);
    const cartList = cartSnapshot.docs.map((doc) => doc.data());
    return cartList;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    return []; // Devuelve un array vacío en caso de error
  }
};

// Función para guardar el carrito en Firebase
export const setCartToFirebase = async (userId, cartData) => {
  try {
    const cartRef = doc(db, "carts", userId); // Asegúrate de usar 'doc' para acceder a un documento específico
    await setDoc(cartRef, cartData); // Guarda los datos del carrito en Firebase
    console.log("Carrito guardado correctamente");
  } catch (error) {
    console.error("Error al guardar el carrito en Firebase:", error);
  }
};

// Función para obtener un item por su ID
export const getItemById = async (itemId) => {
  if (!itemId) {
    throw new Error("ID del item no proporcionado");
  }

  // Accede al documento en la colección "items"
  const docRef = doc(db, "items", itemId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // Devuelve los datos si el documento existe
  } else {
    throw new Error("Item no encontrado");
  }
};

// Exporta las funciones necesarias
export default app;
