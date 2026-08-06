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
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
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

/* ─── Timeline staggered entrance ───────────────────────── */
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateX(0)';
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.opacity   = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  timelineObserver.observe(item);
});

/* ─── Skill tag pop-in ───────────────────────────────────── */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.tag').forEach((tag, i) => {
        tag.style.opacity   = '0';
        tag.style.transform = 'scale(0.85)';
        setTimeout(() => {
          tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          tag.style.opacity   = '1';
          tag.style.transform = 'scale(1)';
        }, i * 60);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

/* ─── Card entrance animations ──────────────────────────── */
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.highlight-card, .edu-card, .about-card, .contact-card').forEach((c, i) => {
  c.style.opacity   = '0';
  c.style.transform = 'translateY(16px)';
  c.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
  cardObserver.observe(c);
});
