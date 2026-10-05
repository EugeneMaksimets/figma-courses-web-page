document.addEventListener('DOMContentLoaded', () => {
  const heroGlow = document.querySelector('.glow-top');
  const otherGlows = document.querySelectorAll('.glow:not(.glow-top)');

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  // 1. Параллакс от движения мыши на 1-м экране (Hero)
  window.addEventListener('mousemove', (e) => {
    // Вычисляем смещение от центра экрана
    mouseX = (e.clientX - window.innerWidth / 2) * 0.08;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.08;
  });

  // 2. Плавная анимация параллакса (Mouse + Scroll)
  function animate() {
    const scrolled = window.pageYOffset;

    // Для розового блика 1-го экрана объединяем скролл и движение мыши
    if (heroGlow) {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      // Увеличенный сдвиг по вертикали при скролле (умножаем на 0.65)
      const scrollY = scrolled * 0.65; 

      heroGlow.style.transform = `translate3d(${currentX}px, ${scrollY + currentY}px, 0)`;
    }

    // Для остальных бликов (3-й экран) стандартный параллакс от скролла
    otherGlows.forEach((glow) => {
      const speed = parseFloat(glow.getAttribute('data-speed')) || 0.3;
      const moveY = scrolled * speed * 1.5;
      glow.style.transform = `translate3d(0, ${moveY}px, 0)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
});