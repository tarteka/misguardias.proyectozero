(() => {
  const STORAGE_KEY = 'mg-theme';
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const calImg = document.getElementById('calendar-screenshot');

  const icons = { light: '🌙', dark: '☀️' };
  const calScreenshots = {
    light: 'assets/calendario-claro.png',
    dark:  'assets/calendario-oscuro.png',
  };

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    toggle.textContent = icons[theme];
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
})();
