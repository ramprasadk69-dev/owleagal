/* ═══════════════════════════════════════════════════════
   O. W. LEGAL ASSOCIATES — main.js
═══════════════════════════════════════════════════════ */

/* ─── DISCLAIMER ─────────────────────────────────────── */
function acceptDisclaimer() {
  const el = document.getElementById('disclaimer-overlay');
  el.classList.add('hidden');
  setTimeout(() => (el.style.display = 'none'), 500);
  sessionStorage.setItem('ow_disc', '1');
}
(function () {
  if (sessionStorage.getItem('ow_disc')) {
    const el = document.getElementById('disclaimer-overlay');
    if (el) el.style.display = 'none';
  }
})();

/* ─── SCROLL NAV ─────────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // When ticker bar is closed, shift nav up to top: 0
  const ticker = document.getElementById('news-ticker-bar');
  if (ticker) {
    const closeBtn = ticker.querySelector('.ticker-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        navbar.style.top = '0';
        // also fix mobile dropdown
        const links = document.getElementById('nav-links');
        if (links) links.style.setProperty('--mobile-top', '68px');
      });
    }
  }
})();

/* ─── NEWS TICKER SEAMLESS LOOP ──────────────────────── */
(function () {
  const track = document.getElementById('ticker-track');
  if (!track) return;
  // Duplicate content so scroll appears infinite
  track.innerHTML += track.innerHTML;
})();

/* ─── MOBILE HAMBURGER NAV ───────────────────────────── */
(function () {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  function openMenu() {
    navLinks.classList.add('mobile-open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('mobile-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    navLinks.classList.contains('mobile-open') ? closeMenu() : openMenu();
  });

  // Close on any nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ─── SCROLL REVEAL ──────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.07 }
  );
  els.forEach(el => observer.observe(el));
})();
