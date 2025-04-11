document.addEventListener("DOMContentLoaded", function () {
  // Common (navigation, last modified)
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (menuToggle && nav) {
    let isOpen = false;
    menuToggle.addEventListener('click', () => {
      isOpen = !isOpen;
      nav.classList.toggle('open');
      menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });
  }

  const lastMod = document.getElementById("lastModified");
  if (lastMod) {
    lastMod.textContent = document.lastModified;
  }

  // Contact form page
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const message = document.querySelector("#message").value;

      localStorage.setItem("formName", name);
      localStorage.setItem("formEmail", email);
      localStorage.setItem("formMessage", message);

      window.location.href = "formdisplay.html";
    });
  }

  // Display page
  if (window.location.pathname.includes("formdisplay.html")) {
    const name = localStorage.getItem("formName") || "Not provided";
    const email = localStorage.getItem("formEmail") || "Not provided";
    const message = localStorage.getItem("formMessage") || "Not provided";

    document.getElementById("displayName").textContent = name;
    document.getElementById("displayEmail").textContent = email;
    document.getElementById("displayMessage").textContent = message;
  }
});
