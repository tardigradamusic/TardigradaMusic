(function () {
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  
  const navToggle = $('#navToggle');
  const drawer = $('#drawer');
  navToggle && navToggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    drawer.setAttribute('aria-hidden', String(!open));
  });
  drawer && drawer.addEventListener('click', e => { if (e.target.tagName === 'A') drawer.classList.remove('open'); });
  
  const header = document.querySelector('.header');
  const headerHeight = () => header ? header.offsetHeight : 56;
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      ev.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight();
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

    /* Hero reveal (subtle) */
    const hero = document.querySelector('.hero');
    window.addEventListener('load', () => { hero && setTimeout(() => hero.classList.add('visible'), 260); });

    /* Theme toggle (persist) */
    const themeBtn = $('#themeBtn');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') document.body.classList.add('light');
    themeBtn && themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      if (!isLight) document.body.classList.remove('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    /* Fade-in on scroll */
    const fades = $$('.hero-content, .music-card, .card, .grid');
    const reveal = () => {
      const th = window.innerHeight - 120;
      fades.forEach(el => { if (el.getBoundingClientRect().top < th) el.classList.add('visible'); });
    };
    window.addEventListener('scroll', reveal, { passive:true });
    window.addEventListener('resize', reveal);
    reveal();

    /* Tour: mark past dates */
    $$('.tour-item').forEach(item => {
      const ds = item.dataset.date;
      if (!ds) return;
      const eventDate = new Date(ds + 'T23:59:59');
      if (eventDate < new Date()) item.classList.add('past');
    });

    /* Accessibility: ESC closes drawer */
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') drawer && drawer.classList.remove('open'); });
  })();
