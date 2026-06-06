/* =============================================
   HOME.JS — E.V.A. Global Solution
   Animação de estrelas parallax e navegação
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initParallax();
  lucide.createIcons();
});

/* ---- Gera as estrelas ---- */
function initStars() {
  const container = document.getElementById('hero-stars');
  if (!container) return;

  const fragment = document.createDocumentFragment();

  // Estrelas brancas
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    star.className = 'star';
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: ${(Math.random() * 0.7 + 0.15).toFixed(2)};
    `;
    fragment.appendChild(star);
  }

  // Estrelas coloridas (verde + roxo)
  for (let i = 0; i < 8; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 3 + 2;
    const isGreen = i % 2 === 0;
    const color = isGreen ? '#1D9E75' : '#533AB7';
    star.className = 'colored-star';
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${10 + i * 11}%;
      left: ${5 + i * 12}%;
      opacity: 0.9;
      background-color: ${color};
      box-shadow: 0 0 6px ${color};
    `;
    fragment.appendChild(star);
  }

  container.appendChild(fragment);
}

/* ---- Parallax ao mover o mouse ---- */
function initParallax() {
  const section = document.querySelector('.hero-section');
  const starsEl = document.getElementById('hero-stars');
  const glowEl  = document.getElementById('hero-glow');
  if (!section || !starsEl || !glowEl) return;

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top  - cy) / cy;

    starsEl.style.transform = `scale(1.18) translate(${dx * -18}px, ${dy * -18}px)`;
    glowEl.style.transform  = `translate(${dx * 12}px, ${dy * 12}px)`;
  });

  section.addEventListener('mouseleave', () => {
    starsEl.style.transform = 'scale(1) translate(0,0)';
    glowEl.style.transform  = 'translate(0,0)';
  });
}
