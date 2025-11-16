/* ============================================================
   main.js - Reescrito para compatibilidade com novo HTML/CSS
   - dropdown acessível
   - menu mobile acessível
   - máscaras (telefone, cpf, cep)
   - envio de formulário (simulado)
   - modo alto contraste
   - clique fora para fechar menus
   ============================================================ */

/* UTIL HELPERS */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------------------------
   MOBILE NAV (hamburger)
   --------------------------- */
const hamburger = $('.hamburger');
const mobileNav = $('#mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    mobileNav.setAttribute('aria-hidden', String(expanded)); // toggle
  });

  // Close mobile nav when clicking a link
  $$('#mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ---------------------------
   DROPDOWN ACESSÍVEL
   --------------------------- */
$$('.has-dropdown').forEach(has => {
  const btn = $('.dropdown-btn', has);
  const menuId = btn?.getAttribute('aria-controls');
  const menu = menuId ? document.getElementById(menuId) : $('.dropdown', has);

  if (!btn || !menu) return;

  // Toggle function
  const toggle = (open) => {
    btn.setAttribute('aria-expanded', String(Boolean(open)));
    menu.setAttribute('aria-hidden', String(!open));
  };

  // Mouse hover (desktop)
  has.addEventListener('mouseenter', () => toggle(true));
  has.addEventListener('mouseleave', () => toggle(false));

  // Click / keyboard activation
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    toggle(!isOpen);
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      toggle(!isOpen);
    } else if (e.key === 'Escape') {
      toggle(false);
      btn.focus();
    }
  });

  // Close dropdown when clicking a menu item
  Array.from(menu.querySelectorAll('a')).forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });
});

/* ---------------------------
   CLICK OUTSIDE (close menus)
   --------------------------- */
document.addEventListener('click', (e) => {
  // close dropdowns if click outside
  $$('.has-dropdown').forEach(has => {
    const btn = $('.dropdown-btn', has);
    const menu = $('.dropdown', has);
    if (!btn || !menu) return;
    if (!has.contains(e.target)) {
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    }
  });

  // close mobile nav if click outside (and not on hamburger)
  if (mobileNav && hamburger) {
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      mobileNav.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }
});

/* ---------------------------
   MÁSCARAS (telefone, cpf, cep)
   --------------------------- */
function maskCPF(value) {
  return value.replace(/\D/g, '')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskTelefone(value) {
  return value.replace(/\D/g, '')
              .replace(/(\d{2})(\d)/, '($1) $2')
              .replace(/(\d{5})(\d)/, '$1-$2');
}

function maskCEP(value) {
  return value.replace(/\D/g, '')
              .replace(/(\d{5})(\d)/, '$1-$2');
}

document.addEventListener('input', (e) => {
  const field = e.target;
  if (!field || !field.id) return;

  if (field.id === 'cpf') field.value = maskCPF(field.value);
  if (field.id === 'telefone') field.value = maskTelefone(field.value);
  if (field.id === 'cep') field.value = maskCEP(field.value);
});

/* ---------------------------
   FORM SEND (simulado)
   --------------------------- */
const formCadastro = $('#form-cadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', (ev) => {
    ev.preventDefault();

    // Simple validation
    const required = Array.from(formCadastro.querySelectorAll('[required]'));
    const invalid = required.filter(i => !i.value.trim());
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    // Show animated message
    const msg = $('#mensagemSucesso');
    if (msg) {
      msg.style.display = 'block';
      msg.style.opacity = '1';
      // hide after 6s
      setTimeout(() => {
        msg.style.transition = 'opacity 0.9s';
        msg.style.opacity = '0';
        setTimeout(()=> { msg.style.display = 'none'; msg.style.opacity = ''; }, 1000);
      }, 6000);
    }

    formCadastro.reset();
  });
}

/* ---------------------------
   ALTO CONTRASTE
   --------------------------- */
const botaoContraste = $('#btn-contraste');
if (botaoContraste) {
  botaoContraste.addEventListener('click', () => {
    const active = document.body.classList.toggle('high-contrast');
    botaoContraste.setAttribute('aria-pressed', String(active));
    botaoContraste.textContent = active ? 'Modo Normal' : 'Alto Contraste';
  });
}

/* ---------------------------
   KEYBOARD SUPPORT for card-click
   --------------------------- */
$$('.card-click').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.querySelector('a');
    if (link && link.href) window.location.href = link.href;
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});
