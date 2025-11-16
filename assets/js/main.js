/* ============================================================
   MENU MOBILE
============================================================ */
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });
}

/* ============================================================
   DROPDOWN DO MENU DESKTOP
============================================================ */
document.querySelectorAll(".has-dropdown").forEach(drop => {
  drop.addEventListener("mouseenter", () => {
    const menu = drop.querySelector(".dropdown");
    if (menu) menu.style.display = "flex";
  });

  drop.addEventListener("mouseleave", () => {
    const menu = drop.querySelector(".dropdown");
    if (menu) menu.style.display = "none";
  });
});

/* ============================================================
   MÁSCARAS DE FORMULÁRIO (CPF, Telefone, CEP)
============================================================ */

function maskCPF(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskTelefone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function maskCEP(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

document.addEventListener("input", (e) => {
  const field = e.target;

  if (field.id === "cpf") field.value = maskCPF(field.value);
  if (field.id === "telefone") field.value = maskTelefone(field.value);
  if (field.id === "cep") field.value = maskCEP(field.value);
});

/* ============================================================
   ENVIO DO FORMULÁRIO (SIMULADO)
============================================================ */
const formCadastro = document.querySelector("#form-cadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", () => {
    alert("Cadastro enviado com sucesso! Obrigado por apoiar o Projeto Luta Pela Vida.");
    formCadastro.reset();
  });
}
