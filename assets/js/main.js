// main.js

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Menu Dropdown
  // =========================
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  dropdownBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const dropdown = document.getElementById(btn.getAttribute("aria-controls"));
      const expanded = btn.getAttribute("aria-expanded") === "true" || false;

      btn.setAttribute("aria-expanded", !expanded);
      dropdown.setAttribute("aria-hidden", expanded);
      dropdown.classList.toggle("show");
    });
  });

  // =========================
  // Menu Hambúrguer Mobile
  // =========================
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.getElementById("mobile-nav");

  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
    mobileNav.setAttribute("aria-hidden", expanded);
    mobileNav.classList.toggle("show");
  });

  // =========================
  // Botão Alto Contraste
  // =========================
  const btnContraste = document.getElementById("btn-contraste");
  btnContraste.addEventListener("click", () => {
    const isPressed = btnContraste.getAttribute("aria-pressed") === "true";
    btnContraste.setAttribute("aria-pressed", !isPressed);
    document.body.classList.toggle("high-contrast");
  });

  // =========================
  // Cards Clicáveis
  // =========================
  const cards = document.querySelectorAll(".card-click");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const ariaLabel = card.getAttribute("aria-label");
      if (ariaLabel === "Faixa Preta na Vida") {
        window.location.href = "/projeto-luta-pela-vida-parte-4/pages/projetos.html#faixa-preta";
      } else if (ariaLabel === "Projeto Social de Formação" || ariaLabel === "Projeto Social") {
        window.location.href = "/projeto-luta-pela-vida-parte-4/pages/projetos.html#formacao";
      } else if (ariaLabel === "Eventos e Campeonatos" || ariaLabel === "Camp") {
        window.location.href = "/projeto-luta-pela-vida-parte-4/pages/projetos.html#camp";
      }
    });

    // Permite navegação por teclado
    card.addEventListener("keypress", e => {
      if (e.key === "Enter" || e.key === " ") {
        card.click();
      }
    });
  });

  // =========================
  // Formulário de Cadastro
  // =========================
  const form = document.getElementById("form-cadastro");
  const msgSucesso = document.getElementById("mensagemSucesso");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      // Checa campos obrigatórios
      let valido = true;
      const inputsObrigatorios = form.querySelectorAll("[required]");
      inputsObrigatorios.forEach(input => {
        if (!input.value.trim()) {
          valido = false;
          input.classList.add("input-error");
        } else {
          input.classList.remove("input-error");
        }
      });

      if (!valido) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
      }

      // Aqui você poderia enviar os dados para um backend ou API
      // Simulamos envio bem-sucedido:
      msgSucesso.style.display = "block";
      form.reset();

      // Ocultar a mensagem depois de 5 segundos
      setTimeout(() => {
        msgSucesso.style.display = "none";
      }, 5000);
    });
  }
});
