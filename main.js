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

/* ─── VERTICAL DOT NAV ───────────────────────────────── */
(function () {
  // Section IDs to track and their display labels
  const sections = [
    { id: 'hero',      label: 'Home'       },
    { id: 'expertise', label: 'Expertise'  },
    { id: 'people',    label: 'People'     },
    { id: 'thought',   label: 'Insights'   },
    { id: 'legacy',    label: 'Legacy'     },
    { id: 'contact',   label: 'Contact'    },
  ];

  // Build dot nav HTML
  const dotNav = document.getElementById('dot-nav');
  if (!dotNav) return;

  sections.forEach((sec, i) => {
    // Connector line before each dot (except first)
    if (i > 0) {
      const line = document.createElement('div');
      line.className = 'dot-nav-connector';
      dotNav.appendChild(line);
    }
    const item = document.createElement('a');
    item.href = `#${sec.id}`;
    item.className = 'dot-nav-item';
    item.dataset.target = sec.id;
    item.innerHTML = `
      <span class="dot-nav-label">${sec.label}</span>
      <span class="dot-nav-dot"></span>
    `;
    dotNav.appendChild(item);
  });

  // Light-section detection: sections with white bg
  const lightSectionIds = new Set(['people', 'legacy']);

  // IntersectionObserver to track active section
  const sectionEls = sections
    .map(s => document.getElementById(s.id))
    .filter(Boolean);

  const dotItems = dotNav.querySelectorAll('.dot-nav-item');

  function setActive(id) {
    dotItems.forEach(item => {
      item.classList.toggle('active', item.dataset.target === id);
    });
    // Switch dot color for light/dark bg sections
    document.body.classList.toggle('in-light-section', lightSectionIds.has(id));
  }

  const observer = new IntersectionObserver(
    (entries) => {
      // Find the entry that is most visible
      let best = null;
      let bestRatio = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
          bestRatio = entry.intersectionRatio;
          best = entry;
        }
      });
      if (best) setActive(best.target.id);
    },
    { threshold: [0.3, 0.6] }
  );

  sectionEls.forEach(el => observer.observe(el));
  // Set first as default
  setActive('hero');
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
