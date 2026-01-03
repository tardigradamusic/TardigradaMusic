(() => {
  /* ===============================
     UTILITIES
  =============================== */
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  /* ===============================
     HEADER / DRAWER (iOS FEEL)
  =============================== */
  const navToggle = $('#navToggle');
  const drawer = $('#drawer');
  const body = document.body;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  };

  navToggle?.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  drawer?.addEventListener('click', e => {
    if (e.target.tagName === 'A') closeDrawer();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  document.addEventListener('click', e => {
    if (
      drawer.classList.contains('open') &&
      !drawer.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeDrawer();
    }
  });

  /* ===============================
     SMOOTH SCROLL (OFFSET HEADER)
  =============================== */
  const header = $('.header');
  const headerOffset = () => header?.offsetHeight || 64;

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      const target = $(id);
      if (!target) return;

      e.preventDefault();
      const y =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset();

      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ===============================
     HERO REVEAL (ON LOAD)
  =============================== */
  window.addEventListener('load', () => {
    const hero = $('.hero');
    hero && hero.classList.add('visible');
  });

  /* ===============================
     SCROLL REVEAL — APPLE STYLE
     (IntersectionObserver)
  =============================== */
  const revealEls = $$('.music-card, .card, .grid, .hero-content');

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -80px 0px'
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ===============================
     THEME TOGGLE (PERSIST)
  =============================== */
  const themeBtn = $('#themeBtn');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') body.classList.add('light');

  themeBtn?.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem(
      'theme',
      body.classList.contains('light') ? 'light' : 'dark'
    );
  });

  /* ===============================
     TOUR DATE AUTO STATUS
  =============================== */
  $$('.tour-item').forEach(item => {
    const date = item.dataset.date;
    if (!date) return;

    const eventDate = new Date(`${date}T23:59:59`);
    if (eventDate < new Date()) {
      item.classList.add('past');
    }
  });

  /* ===============================
     REDUCED MOTION SUPPORT
  =============================== */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
  }
})();

/* ===============================
   HERO BACKGROUND FROM HTML
=============================== */
document.querySelectorAll('[data-background]').forEach(el => {
  const bg = el.getAttribute('data-background');
  if (bg) {
    el.style.backgroundImage =
      `linear-gradient(
        180deg,
        rgba(0,0,0,0.45),
        rgba(0,0,0,0.65)
      ), url("${bg}")`;
  }
});

