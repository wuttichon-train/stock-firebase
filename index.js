import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

connectFirestoreEmulator(db, 'localhost', 8080);

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




