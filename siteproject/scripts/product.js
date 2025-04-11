// scripts/product.js

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    // Fetch product data from the JSON file
    async function fetchProduct() {
        try {
            const response = await fetch('data/product.json'); // ✅ using your file name
            if (!response.ok) throw new Error('Network response was not ok');
            const product = await response.json();
            displayProduct(product); // ✅ match function name
        } catch (error) {
            productContainer.innerHTML = `<p class="error">Failed to load product. ${error}</p>`;
        }
    }

    // Display the products in the grid
    function displayProduct(product) {
        productContainer.innerHTML = product.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">₦${product.price.toLocaleString()}</p>
                <button onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        `).join('');
    }

    fetchProduct();
});

// Add to Cart functionality (to localStorage)
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

let isOpen = false;

menuToggle.addEventListener('click', () => {
  isOpen = !isOpen;
  nav.classList.toggle('open');
  menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
});

document.getElementById("lastModified").textContent = document.lastModified;