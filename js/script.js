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

    /* AUDIO PLAYER (modern, safe checks) */
    const player = $('#player');
    const playBtn = $('#playBtn');
    const playIcon = $('#playIcon');
    const seekBar = $('#seekBar');
    const timeEl = $('#time');
    const volumeBar = $('#volumeBar');
    const volumeIcon = $('#volumeIcon');

    if (player && playBtn && seekBar && timeEl && volumeBar && volumeIcon) {
      player.volume = 1;
      volumeBar.value = 100;

      // play/pause
      playBtn.addEventListener('click', () => {
        if (player.paused) { player.play(); playIcon.className = 'fa-solid fa-pause'; playBtn.setAttribute('aria-label','Pause'); }
        else { player.pause(); playIcon.className = 'fa-solid fa-play'; playBtn.setAttribute('aria-label','Play'); }
      });

      // update time & seek
      player.addEventListener('timeupdate', () => {
        if (!player.duration || isNaN(player.duration)) return;
        const pct = (player.currentTime / player.duration) * 100;
        seekBar.value = pct;
        const m = Math.floor(player.currentTime / 60);
        const s = String(Math.floor(player.currentTime % 60)).padStart(2,'0');
        timeEl.textContent = `${m}:${s}`;
      });

      seekBar.addEventListener('input', () => {
        if (!player.duration || isNaN(player.duration)) return;
        const pct = Number(seekBar.value);
        player.currentTime = (pct / 100) * player.duration;
      });

      // volume
      const updateVolumeIcon = (v) => {
        if (v <= 0) volumeIcon.className = 'fa-solid fa-volume-xmark';
        else if (v < 0.5) volumeIcon.className = 'fa-solid fa-volume-low';
        else volumeIcon.className = 'fa-solid fa-volume-high';
      };
      volumeBar.addEventListener('input', () => {
        const vol = Number(volumeBar.value) / 100;
        player.volume = vol;
        updateVolumeIcon(vol);
      });

      // mute toggle
      let lastVol = 1;
      volumeIcon.addEventListener('click', () => {
        if (player.volume > 0) {
          lastVol = player.volume;
          player.volume = 0; volumeBar.value = 0; updateVolumeIcon(0);
        } else {
          player.volume = lastVol || 1; volumeBar.value = player.volume * 100; updateVolumeIcon(player.volume);
        }
      });
    }

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
