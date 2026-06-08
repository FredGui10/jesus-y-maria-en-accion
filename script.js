document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "components/header.html");
  loadComponent("sidebar", "components/sidebar.html");
  loadComponent("footer", "components/footer.html");

  setupRevealEffect();
});

function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) return;

  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`No se pudo cargar ${file}`);
      }
      return response.text();
    })
    .then(data => {
      element.innerHTML = data;

      if (id === "header") {
        setupMobileMenu();
        setActiveLink();
      }
    })
    .catch(error => console.error(error));
}

function setupMobileMenu() {
  const button = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (button && nav) {
    button.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
}

function setActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".main-nav a");

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

function setupRevealEffect() {
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 80) {
        element.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}