// Import Firebase functions from SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, onSnapshot, connectFirestoreEmulator, query } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaa9dDkSSkVlXxOCGNjrG5JjClirWyVuk",
    authDomain: "stock-test-80c28.firebaseapp.com",
    projectId: "stock-test-80c28",
    storageBucket: "stock-test-80c28.appspot.com",
    messagingSenderId: "691369369296",
    appId: "1:691369369296:web:fffc9b819f1fdc540808d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connect Firestore to the emulator
// connectFirestoreEmulator(db, 'localhost', 5002);

// Select form and list
const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');

// Realtime listener for product updates
onSnapshot(collection(db, 'products'), (snapshot) => {
    productList.innerHTML = ''; // Clear the list
    snapshot.forEach(doc => {
        const product = doc.data();
        const li = document.createElement('li');
        li.textContent = `${product.name}: ${product.quantity}`;
        productList.appendChild(li);
    });
});

// Function to add a new product
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productQuantity = document.getElementById('product-quantity').value;

    try {
        await addDoc(collection(db, 'products'), {
            name: productName,
            quantity: parseInt(productQuantity)
        });
        console.log('Product added!');
        productForm.reset(); // Reset form after submission
    } catch (error) {
        console.error('Error adding product: ', error);
    }
});
