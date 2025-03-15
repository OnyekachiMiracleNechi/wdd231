// Replace 'YOUR_API_KEY' with your OpenWeatherMap API Key
const API_KEY = "ee0180aee459070add4f8ebcb4fbe5ca"; 
const CITY = "Magboro"; // Change to your location
const COUNTRY = "NG"; // Nigeria

// Get Weather Data
async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`;

    try {
        // Fetch Current Weather
        const response = await fetch(url);
        const data = await response.json();

        // Fetch Forecast
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Extract Weather Data
        const temperature = data.main.temp;
        const condition = data.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // Extract 3-day forecast
        const forecastList = forecastData.list.filter((entry, index) => index % 8 === 0).slice(0, 3);
        const forecastHTML = forecastList.map(entry => {
            return `<p><strong>${new Date(entry.dt_txt).toLocaleDateString()}</strong>: ${entry.main.temp}°C, ${entry.weather[0].description}</p>`;
        }).join("");

        // Update HTML
        document.getElementById("weather").innerHTML = `
            <p><strong>Current:</strong> ${temperature}°C, ${condition} <img src="${icon}" alt="Weather icon"></p>
        `;

        document.querySelector(".weather-forecast").innerHTML = `
            <h3>📅 Weather Forecast</h3>
            ${forecastHTML}
        `;
    } catch (error) {
        document.getElementById("weather").innerHTML = `<p>❌ Error fetching weather data.</p>`;
        console.error("Weather Fetch Error:", error);
    }
}

// Fetch businesses
async function getBusinesses() {
    try {
        const response = await fetch("data/members.json");
        const businesses = await response.json();
        displayBusinesses(businesses);
    } catch (error) {
        console.error("Error fetching business data:", error);
    }
}

// Display businesses in grid or list
function displayBusinesses(businesses) {
    const directory = document.getElementById("business-directory");
    directory.innerHTML = "";

    businesses.forEach((business) => {
        const businessCard = document.createElement("div");
        businessCard.classList.add("business-card");

        businessCard.innerHTML = `
            <img src="images/${business.image}" alt="${business.name}">
            <h3>${business.name}</h3>
            <p><strong>Address:</strong> ${business.address}</p>
            <p><strong>Phone:</strong> ${business.phone}</p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(business.membership)}</p>
            <a href="${business.website}" target="_blank">Visit Website</a>
        `;

        directory.appendChild(businessCard);
    });

    filterBusinesses(); // Apply filtering after loading
}

// Membership Level Mapping
function getMembershipLevel(level) {
    return ["Unknown", "Member", "Silver Member", "Gold Member"][level] || "Unknown";
}

// Toggle View
function toggleView(viewType) {
    const directory = document.getElementById("business-directory");
    directory.classList.toggle("grid-view", viewType === "grid");
    directory.classList.toggle("list-view", viewType === "list");
}

// Filter businesses
function filterBusinesses() {
    const searchBar = document.getElementById("searchBar");
    if (!searchBar) return;

    const searchTerm = searchBar.value.toLowerCase();
    const businessCards = document.querySelectorAll(".business-card");

    businessCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(searchTerm) ? "flex" : "none";
    });
}

// Update Year and Last Modified Date
function updateDateInfo() {
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
}

// Handle Form Submission
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("joinForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            confirmationMessage.classList.add("show");

            // Hide the message after 1 second
            setTimeout(() => confirmationMessage.classList.remove("show"), 1000);

            // Clear form
            form.reset();
        });
    }

    // Load Weather and Businesses
    fetchWeather();
    getBusinesses();

    // Update Date and Last Modified
    updateDateInfo();

    // Handle Menu Toggle
    const menuButton = document.querySelector(".menu-button");
    const navMenu = document.querySelector("nav ul");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", function (event) {
            navMenu.classList.toggle("show");
            event.stopPropagation();
        });

        document.addEventListener("click", function (event) {
            if (!navMenu.contains(event.target) && !menuButton.contains(event.target)) {
                navMenu.classList.remove("show");
            }
        });

        navMenu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    // Handle Search
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", filterBusinesses);
    }

    // Handle View Toggle
    const gridViewBtn = document.getElementById("gridViewBtn");
    const listViewBtn = document.getElementById("listViewBtn");
    const directorySection = document.getElementById("business-directory");

    if (gridViewBtn && listViewBtn && directorySection) {
        gridViewBtn.addEventListener("click", () => {
            directorySection.classList.remove("list-view");
            directorySection.classList.add("grid-view");
        });

        listViewBtn.addEventListener("click", () => {
            directorySection.classList.remove("grid-view");
            directorySection.classList.add("list-view");
        });
    }
});
