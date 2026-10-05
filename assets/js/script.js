document.addEventListener('DOMContentLoaded', () => {
  const pinkGlows = document.querySelectorAll('.glow-pink-full');

  let mouseX = 0;
  let mouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  // Коэффициент скорости движения блика (например: 1.35 = на 35% быстрее скролла)
  const SPEED_FACTOR = 1;

  // Реакция на мышь
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
  });

  function animate() {
    currentMouseX += (mouseX - currentMouseX) * 0.08;
    currentMouseY += (mouseY - currentMouseY) * 0.08;

    pinkGlows.forEach((glow) => {
      const section = glow.parentElement;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom > -200 && rect.top < windowHeight + 200) {
        const sectionHeight = section.offsetHeight;

        let progress = 0;

        if (section.classList.contains('section-hero')) {
          // Для 1-й секции
          progress = window.scrollY / (sectionHeight * 0.65);
        } else {
          // Для 3-й секции
          const relativeTop = windowHeight - rect.top;
          progress = relativeTop / (windowHeight + sectionHeight * 0.65);
        }

        // Применяем фактор скорости к прогрессу
        const acceleratedProgress = progress * SPEED_FACTOR;

        // Полный запас расстояния для глубокого ухода под следующую секцию
        const totalTravel = sectionHeight * 1.4;

        // Расчёт итоговой позиции по Y
        const translateY = acceleratedProgress * totalTravel;

        glow.style.transform = `translate3d(calc(-50% + ${currentMouseX}px), ${translateY + currentMouseY}px, 0)`;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});