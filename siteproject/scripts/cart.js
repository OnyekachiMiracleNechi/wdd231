document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const checkoutButton = document.getElementById('checkout-btn');

    // Fetch product data from the correct path (data/product.json)
    async function fetchProducts() {
        try {
            const response = await fetch('data/product.json'); // Correct path to product.json
            if (!response.ok) throw new Error('Network response was not ok');
            const products = await response.json();
            console.log('Products loaded:', products); // Debugging: Check if products are loaded correctly
            displayCart(products);
        } catch (error) {
            console.error('Failed to load products:', error); // Debugging: Log the error
            cartContainer.innerHTML = `<p class="error">Failed to load products. ${error}</p>`;
        }
    }

    // Display the products in the cart
    function displayCart(products) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Cart data:', cart); // Debugging: Check cart data in localStorage

        if (cart.length === 0) {
            cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
            return;
        }

        cartContainer.innerHTML = cart.map(productId => {
            // Convert productId to string for comparison
            const product = products.find(p => String(p.id) === String(productId));
            if (!product) return ''; // If product not found, skip it
            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <h3>${product.name}</h3>
                    <p class="price">₦${product.price.toLocaleString()}</p>
                    <button class="remove-btn" data-id="${product.id}">Remove</button>
                </div>
            `;
        }).join('');

        // Add event listener to remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                console.log('Removing product with ID:', productId); // Debugging: Check product ID
                removeFromCart(productId, products);
            });
        });
    }

    // Remove a product from the cart
    function removeFromCart(productId, products) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(id => String(id) !== String(productId)); // Remove the product by id
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        console.log('Updated cart:', cart); // Debugging: Check updated cart data
        displayCart(products); // Refresh cart display after removal
    }

    // Proceed to Checkout (Redirect to checkout page)
    checkoutButton.addEventListener('click', () => {
        // Redirect to checkout page
        window.location.href = 'checkout.html'; // Replace with actual checkout page URL
    });

    // Fetch and display products
    fetchProducts();
});

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

let isOpen = false;

menuToggle.addEventListener('click', () => {
  isOpen = !isOpen;
  nav.classList.toggle('open');
  menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
});

document.getElementById("lastModified").textContent = document.lastModified;