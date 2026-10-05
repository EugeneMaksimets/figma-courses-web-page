document.addEventListener('DOMContentLoaded', () => {
  const heroGlow = document.querySelector('.glow-top');
  const otherGlows = document.querySelectorAll('.glow[data-speed]:not(.glow-top)');

  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  // 1. Движение мыши (для Hero блика)
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
    targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
  });

  // 2. Плавная анимация кадра
  function animate() {
    const scrolled = window.scrollY || window.pageYOffset;

    // Плавный интерполированный сдвиг мыши
    currentMouseX += (targetMouseX - currentMouseX) * 0.08;
    currentMouseY += (targetMouseY - currentMouseY) * 0.08;

    // Индивидуальный параллакс для Hero блика
    if (heroGlow) {
      const speed = parseFloat(heroGlow.getAttribute('data-speed')) || 0.15;
      const moveY = scrolled * speed + currentMouseY;
      heroGlow.style.transform = `translate3d(${currentMouseX}px, ${moveY}px, 0)`;
    }

    // Параллакс для остальных бликов при скролле
    otherGlows.forEach((glow) => {
      const speed = parseFloat(glow.getAttribute('data-speed')) || 0.1;
      const moveY = scrolled * speed;
      glow.style.transform = `translate3d(0, ${moveY}px, 0)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
});