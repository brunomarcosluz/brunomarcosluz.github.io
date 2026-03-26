// ─────────────────────────────────────────
// Nav — efeito de fundo ao rolar
// ─────────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ─────────────────────────────────────────
// Scroll Reveal — elementos entram ao aparecer na tela
// ─────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ─────────────────────────────────────────
// Hero — animação de entrada imediata
// ─────────────────────────────────────────
document.querySelectorAll(
  '#hero .hero-eyebrow, #hero .avail-badge, #hero h1, #hero p, #hero .hero-actions, #hero .stat-card'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  el.style.transitionDelay = `${i * 0.12}s`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
});
