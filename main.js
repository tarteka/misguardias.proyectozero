(() => {
  // Única fuente de verdad para la versión mostrada en la web. Actualizar aquí con cada release en Google Play.
  const APP_VERSION = '2.0.0';

  const badge = document.getElementById('app-badge');
  if (badge) badge.textContent = `${badge.textContent} · v${APP_VERSION}`;

  const STORAGE_KEY = 'mg-theme';
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const calImg = document.getElementById('calendar-screenshot');

  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const icons = {
    light: svg('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>'),
    dark:  svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  };
  const calScreenshots = {
    light: 'assets/calendario-claro.png',
    dark:  'assets/calendario-oscuro.png',
  };

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    toggle.innerHTML = icons[theme];
    if (calImg) calImg.src = calScreenshots[theme];
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }

  function getInitialTheme() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'light';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  applyTheme(getInitialTheme());
})();
