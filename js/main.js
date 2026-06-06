/* =============================================
   MAIN.JS — E.V.A. Global Solution
   Navegação e utilitários compartilhados
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHamburger();
  lucide.createIcons();
});

/* ---- Navegação ativa ---- */
function initNavigation() {
  const links = document.querySelectorAll('.nav-link, .mobile-menu .nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href').split('/').pop() || 'index.html';
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

/* ---- Menu hamburger ---- */
function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Fechar ao clicar em um link
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

/* ---- Utilitário: formatar tempo ---- */
function padZero(n) {
  return String(n).padStart(2, '0');
}

/* ---- Expõe utilitários globais ---- */
window.EVA = { padZero };
