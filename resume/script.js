/* =========================================================
   SUBHRAJYOTI DASH — CV Interactivity
   ========================================================= */

/* ─── Sidebar expand / collapse ─────────────────────────── */
const sidebar      = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOpen  = document.getElementById('sidebarOpen');

function setSidebarExpanded(expanded) {
  if (expanded) {
    sidebar.classList.add('expanded');
    document.body.classList.add('sidebar-expanded');
  } else {
    sidebar.classList.remove('expanded');
    document.body.classList.remove('sidebar-expanded');
  }
}

sidebarToggle.addEventListener('click', () => {
  const isExpanded = sidebar.classList.contains('expanded');
  setSidebarExpanded(!isExpanded);
});

// Mobile: floating button opens/closes bottom sidebar
sidebarOpen.addEventListener('click', () => {
  sidebar.classList.toggle('mobile-open');
});

// Close mobile sidebar when a link is clicked
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
  });
});

/* ─── Active sidebar link on scroll ─────────────────────── */
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections     = document.querySelectorAll('section[id]');

function updateActiveLink() {
  let current = '';
  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight    = document.documentElement.scrollHeight;

  // If near the bottom of the page, force the last section active
  if (scrollBottom >= docHeight - 40) {
    current = sections[sections.length - 1].id;
  } else {
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
    });
  }

  sidebarLinks.forEach(a => {
    a.classList.remove('active');
    if (a.dataset.section === current) a.classList.add('active');
  });
}

/* ─── Smooth scroll for sidebar links ───────────────────── */
sidebarLinks.forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Collapsible sections ───────────────────────────────── */
document.querySelectorAll('.collapse-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const bodyId = btn.getAttribute('aria-controls');
    const body   = document.getElementById(bodyId);
    if (!body) return;

    const isCollapsed = body.classList.contains('collapsed');

    if (isCollapsed) {
      body.classList.remove('collapsed');
      btn.classList.remove('collapsed');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      body.classList.add('collapsed');
      btn.classList.add('collapsed');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ─── Collapse All / Expand All ─────────────────────────── */
const collapseAllBtn = document.getElementById('collapseAllBtn');
const collapseIcon   = collapseAllBtn.querySelector('i');
const collapseLabel  = collapseAllBtn.querySelector('span');
let allCollapsed = false;

collapseAllBtn.addEventListener('click', () => {
  allCollapsed = !allCollapsed;
  document.querySelectorAll('.section-body').forEach(body => {
    const btn = document.querySelector(`[aria-controls="${body.id}"]`);
    if (allCollapsed) {
      body.classList.add('collapsed');
      if (btn) { btn.classList.add('collapsed'); btn.setAttribute('aria-expanded', 'false'); }
    } else {
      body.classList.remove('collapsed');
      if (btn) { btn.classList.remove('collapsed'); btn.setAttribute('aria-expanded', 'true'); }
    }
  });
  collapseIcon.className    = allCollapsed ? 'fas fa-expand-alt' : 'fas fa-compress-alt';
  collapseLabel.textContent = allCollapsed ? 'Expand All' : 'Collapse All';
  collapseAllBtn.title      = allCollapsed ? 'Expand all sections' : 'Collapse all sections';
  dismissHint();
});

/* ─── First-visit hint ───────────────────────────────────── */
const collapseHint        = document.getElementById('collapseHint');
const collapseHintDismiss = document.getElementById('collapseHintDismiss');
let hintTimer;

function dismissHint() {
  collapseHint.classList.remove('visible');
  collapseAllBtn.classList.remove('hinted');
  clearTimeout(hintTimer);
  localStorage.setItem('collapseHintSeen', '1');
}

if (!localStorage.getItem('collapseHintSeen')) {
  // Show after 1.8s so the page has settled
  setTimeout(() => {
    collapseHint.classList.add('visible');
    collapseAllBtn.classList.add('hinted');
    // Auto-dismiss after 5s
    hintTimer = setTimeout(dismissHint, 5000);
  }, 1800);
}

collapseHintDismiss.addEventListener('click', dismissHint);

/* ─── Navbar scroll effect (kept for hero) ──────────────── */
const navbar = document.getElementById('navbar');

function onScroll() {
  // Navbar frosted glass
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back-to-top button
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }

  updateActiveLink();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ─── Back to top ────────────────────────────────────────── */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Mobile nav toggle (top navbar) ────────────────────── */
const navToggle  = document.getElementById('navToggle');
const navLinksEl = document.querySelector('.nav-links');
if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    navToggle.querySelector('i').classList.toggle('fa-bars');
    navToggle.querySelector('i').classList.toggle('fa-xmark');
  });
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      navToggle.querySelector('i').classList.add('fa-bars');
      navToggle.querySelector('i').classList.remove('fa-xmark');
    });
  });
}

/* ─── Fade-in on scroll ──────────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80 * i);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => fadeObserver.observe(el));

/* ─── Animated counters ──────────────────────────────────── */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statsSection   = document.querySelector('.hero-stats');
let countersStarted  = false;
const statsObserver  = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    document.querySelectorAll('.stat-number[data-target]').forEach(animateCounter);
    statsObserver.disconnect();
  }
}, { threshold: 0.5 });
if (statsSection) statsObserver.observe(statsSection);

/* ─── Timeline entrance (fade only, no slide) ───────────── */
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.opacity    = '0';
  item.style.transition = `opacity 0.4s ease ${i * 0.06}s`;
  timelineObserver.observe(item);
});

/* ─── Card entrance animations ──────────────────────────── */
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.highlight-card, .edu-card, .about-card, .contact-card').forEach((c, i) => {
  c.style.opacity    = '0';
  c.style.transition = `opacity 0.4s ease ${i * 0.05}s`;
  cardObserver.observe(c);
});
