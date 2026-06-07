document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHamburger();
  lucide.createIcons();
});

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

function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

function padZero(n) {
  return String(n).padStart(2, '0');
}

window.EVA = { padZero };
