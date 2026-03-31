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
})();

/* ─── SIDE NAV PANEL ─────────────────────────────────── */
(function () {
  const menuBtn   = document.getElementById('nav-menu-btn');
  const sideNav   = document.getElementById('side-nav');
  const overlay   = document.getElementById('side-overlay');
  const closeBtn  = document.getElementById('side-close-btn');
  if (!menuBtn || !sideNav) return;

  function openPanel() {
    sideNav.classList.add('open');
    overlay && overlay.classList.add('open');
    menuBtn.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    sideNav.classList.remove('open');
    overlay && overlay.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    sideNav.classList.contains('open') ? closePanel() : openPanel();
  });

  closeBtn && closeBtn.addEventListener('click', closePanel);
  overlay  && overlay.addEventListener('click', closePanel);

  // Close on any link click inside panel
  sideNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closePanel);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideNav.classList.contains('open')) closePanel();
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
