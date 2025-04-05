// Replace 'YOUR_API_KEY' with your OpenWeatherMap API Key
const API_KEY = "ee0180aee459070add4f8ebcb4fbe5ca"; 
const CITY = "Magboro"; 
const COUNTRY = "NG"; 

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

        // Extract Current Weather Data
        const temperature = data.main.temp;
        const conditionMain = data.weather[0].main;  // Get the main weather category
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // Convert main weather condition to a friendly description
        const conditionText = getWeatherDescription(conditionMain);

        // Extract 3-day forecast
        const forecastList = forecastData.list.filter((entry, index) => index % 8 === 0).slice(0, 3);
        const forecastHTML = forecastList.map(entry => {
            const dateTime = new Date(entry.dt_txt);
            const formattedDate = dateTime.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
            const formattedTime = dateTime.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
            const forecastCondition = getWeatherDescription(entry.weather[0].main);
        
            return `<p><strong>${formattedDate}, ${formattedTime}</strong>: ${entry.main.temp}°C, ${forecastCondition}</p>`;
        }).join("");
        
        // Update HTML
        document.getElementById("weather").innerHTML = `
            <p><strong>Current:</strong> ${temperature}°C, ${conditionText} <img src="${icon}" alt="Weather icon"></p>
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

// Helper function to map weather conditions to friendly descriptions
function getWeatherDescription(condition) {
    switch (condition) {
        case "Clear":
            return "☀️ Sunny";
        case "Clouds":
            return "☁️ Cloudy";
        case "Rain":
            return "🌧️ Rainy";
        case "Drizzle":
            return "🌦️ Light Rain";
        case "Thunderstorm":
            return "⛈️ Stormy";
        case "Snow":
            return "❄️ Snowy";
        case "Mist":
        case "Fog":
            return "🌫️ Foggy";
        default:
            return condition; // Use the original description if no match
    }
}

// Run the function when the page loads
document.addEventListener("DOMContentLoaded", fetchWeather);


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

// ✅ Updated: Update Year and Last Modified Date
function updateDateInfo() {
    const yearElement = document.getElementById("year");
    const lastModifiedElement = document.getElementById("lastModified");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (lastModifiedElement) {
        const now = new Date();
        lastModifiedElement.textContent = `Last Updated: ${now.toLocaleString()}`;
    }
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



document.addEventListener("DOMContentLoaded", function() {
    async function fetchItems() {
        try {
            const response = await fetch("data/items.json");
            const items = await response.json();

            const container = document.getElementById("items-container");
            container.innerHTML = '';  // Clear any existing content

            items.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <h2>${item.title}</h2>
                    <figure>
                        <img src="${item.image}" alt="${item.title}" />
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button onclick="window.location.href='${item.link}'">Learn More</button>
                `;

                container.appendChild(card);
            });
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    // Fetch items when the page is loaded
    fetchItems();
});


 // Open Modal Function
 function openModal(title, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('myModal').style.display = "block";
}

// Close Modal Function
function closeModal() {
    document.getElementById('myModal').style.display = "none";
}
