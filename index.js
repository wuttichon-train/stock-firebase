import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, onSnapshot,connectFirestoreEmulator } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaa9dDkSSkVlXxOCGNjrG5JjClirWyVuk",
    authDomain: "stock-test-80c28.firebaseapp.com",
    projectId: "stock-test-80c28",
    storageBucket: "stock-test-80c28.appspot.com",
    messagingSenderId: "691369369296",
    appId: "1:691369369296:web:fffc9b819f1fdc540808d5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// connectFirestoreEmulator(db, 'localhost', 5002);

    // Realtime listener for product updates
    db.collection('products').onSnapshot((snapshot) => {
        productList.innerHTML = ''; // Clear the list
        snapshot.forEach(doc => {
            const product = doc.data();
            const li = document.createElement('li');
            li.textContent = `${product.name}: ${product.quantity}`;
            productList.appendChild(li);
        });
    });

function addProduct(event){
    event.preventDefault();  
    // Select form and list
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Add product to Firestore
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const productName = document.getElementById('product-name').value;
        const productQuantity = document.getElementById('product-quantity').value;

        db.collection('products').add({
            name: productName,
            quantity: parseInt(productQuantity)
        })
        .then(() => {
            console.log('Product added!');
            productForm.reset();
        })
        .catch((error) => {
            console.error('Error adding product: ', error);
        });
    });
}




