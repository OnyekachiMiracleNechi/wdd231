document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 join.js Loaded");

    // ✅ Handle Form Submission in join.html
    const form = document.getElementById("joinForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const params = new URLSearchParams(formData).toString();

            console.log("✅ Form Submitted. Redirecting to thankyou.html with:", params);

            // Redirect to the thank-you page with form data
            window.location.href = `thankyou.html?${params}`;
        });
    }

    // ✅ Display Submitted Data in thankyou.html
    if (window.location.pathname.includes("thankyou.html")) {
        console.log("✅ Thank You Page Loaded - Extracting Data...");
        displayFormData();
    }

    // ✅ Handle Membership Modals
    setupMembershipModals();
});

// ✅ Function to Display Form Data in thankyou.html
function displayFormData() {
    const params = new URLSearchParams(window.location.search);
    const summaryDiv = document.getElementById("summary"); // ❗ Ensure this matches the div in thankyou.html

    if (!summaryDiv) {
        console.error("⚠️ Error: 'summary' div not found in thankyou.html!");
        return;
    }

    console.log("📌 Extracted Form Data:", Object.fromEntries(params.entries()));

    if (params.has("firstName")) {
        summaryDiv.innerHTML = `
            <p><strong>First Name:</strong> ${params.get("firstName") || "N/A"}</p>
            <p><strong>Last Name:</strong> ${params.get("lastName") || "N/A"}</p>
            <p><strong>Email:</strong> ${params.get("email") || "N/A"}</p>
            <p><strong>Phone Number:</strong> ${params.get("phone") || "N/A"}</p>
            <p><strong>Business Name:</strong> ${params.get("businessName") || "N/A"}</p>
            <p><strong>Submitted On:</strong> ${new Date().toLocaleString()}</p>
            <a href="index.html" class="button">Go to Homepage</a>
        `;
    } else {
        summaryDiv.innerHTML = `<p>⚠️ No form data found. Please submit the form first.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 join.js Loaded");

    setupMembershipModals(); // Ensure modals work correctly
});

// ✅ Setup Membership Modals
function setupMembershipModals() {
    console.log("📌 Setting up membership modals...");

    const modals = document.querySelectorAll(".modal");
    const openButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    // Ensure modals are hidden initially
    modals.forEach(modal => modal.style.display = "none");

    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.style.display = "flex"; // Show modal
                console.log(`📌 Opened modal: ${modalId}`);
            } else {
                console.error(`❌ Modal with ID '${modalId}' not found!`);
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modal = this.closest(".modal");
            if (modal) {
                modal.style.display = "none"; // Hide modal
                console.log(`📌 Closed modal.`);
            }
        });
    });

    // Close when clicking outside modal content
    window.addEventListener("click", function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
                console.log("📌 Closed modal by clicking outside.");
            }
        });
    });
}
