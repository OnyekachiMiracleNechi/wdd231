const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

let isOpen = false;

menuToggle.addEventListener('click', () => {
  isOpen = !isOpen;
  nav.classList.toggle('open');
  menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
});

document.getElementById("lastModified").textContent = document.lastModified;




