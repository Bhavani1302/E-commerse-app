import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";


import axios from 'axios';

// Firestore configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBOjRfNgNZKEkxEjvCXPGuK0cfy2luo2g4",
  authDomain: "e-commerce-830bc.firebaseapp.com",
  projectId: "e-commerce-830bc",
  storageBucket: "e-commerce-830bc.appspot.com", 
  messagingSenderId: "936611872172",
  appId: "1:936611872172:web:09aee9ca407e2119374e09",
};


const app = initializeApp(firebaseConfig);

// Initializing firestore
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};

// Example of using fetchProducts to get product data
fetchProducts().then(products => {
  console.log("Fetched products:", products);
}).catch(error => {
  console.error("Error fetching products:", error);
});


export {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  fetchProducts,  
};
