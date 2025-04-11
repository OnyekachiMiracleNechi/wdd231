// scripts/cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const totalAmountElement = document.getElementById('total-amount');
    const checkoutForm = document.querySelector('.checkout-form');
    const thankYouModal = document.getElementById('thank-you-modal');
    const closeModalButton = document.getElementById('close-modal');

    // Fetch products from the JSON file
    async function fetchProducts() {
        try {
            const response = await fetch('data/product.json'); // Load the product data
            if (!response.ok) throw new Error('Network response was not ok');
            const products = await response.json();
            displayCart(products); // Pass products to display function
        } catch (error) {
            console.error('Failed to load products:', error);
            cartContainer.innerHTML = `<p class="error">Failed to load products. ${error.message}</p>`;
        }
    }

    // Display cart items from localStorage
    function displayCart(products) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
            totalAmountElement.textContent = `Total: ₦0.00`;
            return;
        }

        // Map each item ID in cart to a product card
        cartContainer.innerHTML = cart.map(productId => {
            const product = products.find(p => p.id == productId); // Use == to match number/string
            if (!product) return '';
            total += product.price;
            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <h3>${product.name}</h3>
                    <p class="price">₦${product.price.toLocaleString()}</p>
                </div>
            `;
        }).join('');

        // Display total
        totalAmountElement.textContent = `Total: ₦${total.toLocaleString()}`;
    }

    // Handle checkout form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if cart is empty before placing the order
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before placing an order.");
            return; // Stop the checkout if cart is empty
        }

        // Show thank you modal and clear cart
        thankYouModal.style.display = 'flex';
        localStorage.removeItem('cart'); // Clear cart after checkout
    });

    // Handle closing of the thank you modal
    closeModalButton.addEventListener('click', () => {
        thankYouModal.style.display = 'none';
        window.location.href = 'index.html'; // Redirect to home page
    });

    // Load the cart items when the page is ready
    fetchProducts();
});

// Mobile menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

let isOpen = false;

menuToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    nav.classList.toggle('open');
    menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
});

// Display last modified date
document.getElementById("lastModified").textContent = document.lastModified;
