const toast = document.querySelector('#toast');
let toastTimer;

function showNote(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelectorAll('[data-note]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showNote(link.dataset.note);
  });
});

const menu = document.querySelector('#main-nav');
document.querySelector('#menu-toggle').addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  document.querySelector('#menu-toggle').setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menu.classList.remove('open')));

document.querySelector('#newsletter').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  showNote('Thanks for your interest in Zedu!');
  event.currentTarget.reset();
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.feature-card,.impact-card,.toolkit-grid article,.solution-grid article,.price-card').forEach((item) => {
    item.classList.add('scroll-reveal');
    observer.observe(item);
  });
}
