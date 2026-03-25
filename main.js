(() => {
  const STORAGE_KEY = 'mg-theme';
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const calImg = document.getElementById('calendar-screenshot');

  const icons = {
    light: '<span class="material-symbols-rounded">dark_mode</span>',
    dark:  '<span class="material-symbols-rounded">light_mode</span>',
  };
  const calScreenshots = {
    light: 'assets/calendario-claro.png',
    dark:  'assets/calendario-oscuro.png',
  };

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    toggle.innerHTML = icons[theme];
    if (calImg) calImg.src = calScreenshots[theme];
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'light';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  applyTheme(getInitialTheme());

  // ── SLIDER ──
  const track    = document.querySelector('.slider-track');
  const slides   = document.querySelectorAll('.slide');
  const dotsWrap = document.querySelector('.slider-dots');
  const prevBtn  = document.querySelector('.slider-prev');
  const nextBtn  = document.querySelector('.slider-next');
  let current  = 0;
  let autoTimer = null;

  if (track && slides.length) {
    // Generar dots
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'slider-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Ir a la funcionalidad ${i + 1}`);
      d.addEventListener('click', () => { resetAuto(); goTo(i); });
      dotsWrap.appendChild(d);
    });

    function getDots() { return dotsWrap.querySelectorAll('.slider-dot'); }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      getDots().forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 4500);
    }

    prevBtn.addEventListener('click', () => { resetAuto(); goTo(current - 1); });
    nextBtn.addEventListener('click', () => { resetAuto(); goTo(current + 1); });

    // Pausa al hacer hover
    const sliderEl = document.querySelector('.slider');
    sliderEl.addEventListener('mouseenter', () => clearInterval(autoTimer));
    sliderEl.addEventListener('mouseleave', resetAuto);

    // Swipe táctil
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { resetAuto(); diff > 0 ? goTo(current + 1) : goTo(current - 1); }
    });

    resetAuto();
  }

  // Showcase: cambio de captura con fade
  const showcaseImg = document.getElementById('showcase-img');
  document.querySelectorAll('.showcase-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      document.querySelectorAll('.showcase-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (showcaseImg) {
        showcaseImg.style.opacity = '0';
        setTimeout(() => {
          showcaseImg.src = tab.dataset.src;
          showcaseImg.alt = tab.dataset.alt;
          showcaseImg.style.opacity = '1';
        }, 160);
      }
    });
  });
})();
