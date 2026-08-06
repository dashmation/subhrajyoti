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


/* ─── Project Spec Modal ──────────────────────────────── */

/* ── Data map ── */
const projectData = {
  'one-checkout': {
    title:    'One Checkout',
    role:     'QA Lead / Quality Assurance Team Lead',
    company:  'BT Group',
    period:   'Apr 2026 – Present',
    teamSize: 20,
    star: {
      situation: 'Customers wanting to buy broadband and a mobile SIM together had to go through separate purchase journeys — different carts, different forms, different confirmations — creating a frustrating and lengthy buying experience.',
      task:      'Build a unified checkout that combines broadband and mobile purchases into a single, seamless flow — reducing drop-offs and simplifying the customer journey.',
      action:    'A converged cart was designed that holds both broadband and mobile products together. Customers now fill in their details once, go through a single payment step, and place one combined order. Behind the scenes, the system intelligently splits and routes each product to the right fulfilment channel automatically.',
      result:    'Customers experience a frictionless, one-click-style purchase for bundled products. Fewer steps, no duplicate data entry, and a single order confirmation — making buying multiple products as simple as buying one.'
    },
    tech: [
      { label: 'React',             cls: 'tag-fw'   },
      { label: 'Flutter',           cls: 'tag-lang' },
      { label: 'Hybris',            cls: 'tag-api'  },
      { label: 'Java · Spring Boot', cls: 'tag-lang' }
    ]
  },

  'digital-sales-manager': {
    title:    'Digital Sales: Learn and Buy Broadband',
    role:     'QA Engineering Manager',
    company:  'BT Group',
    period:   'May 2024 – Mar 2026',
    teamSize: 80,
    star: {
      situation: 'Customers looking to purchase broadband, TV, or sport packages faced fragmented digital journeys. Whether they were new customers buying broadband for the first time, existing customers upgrading their plan, moving home, or adding TV and sport — each scenario had its own disconnected experience. This created confusion, drop-offs, and inconsistency across channels (web and app).',
      task:      'Build a unified digital sales platform that covers the full spectrum of broadband, TV, and sport purchase journeys — from discovery and browsing through to checkout and fulfilment. The platform needed to serve new acquisitions, plan upgrades (regrades), home moves, in-life add-ons, TV-led bundles, soft bundles, and even colleague product purchases — all under one cohesive tribe.',
      action:    'Multiple specialist squads were formed — Get Broadband (new customer acquisition), Get Better Broadband (existing customer upgrades/regrades), Browse (product discovery and learn pages), Home Move, TV & Sport, Inlife Add-On, and Engineering Capability. Each squad owns its end-to-end journey with dedicated frontend micro-frontends, backend APIs integrating with systems like Hybris, Pega, and a Journey Orchestrator. A shared architecture, CMS layer, and common engineering practices tie everything together. The platform also extended to BT.com and the EE Home App.',
      result:    'A comprehensive digital sales ecosystem where customers can discover, compare, and purchase broadband, TV, and sport products through a single, consistent experience — whether they\'re buying for the first time, upgrading, moving home, or adding entertainment packages to their existing plan.'
    },
    tech: [
      { label: 'React',             cls: 'tag-fw'   },
      { label: 'Flutter',           cls: 'tag-lang' },
      { label: 'Java · Spring Boot', cls: 'tag-lang' }
    ]
  },

  'digital-sales-specialist': {
    title:    'Get Better Broadband Journey',
    role:     'QA Engineering Specialist',
    company:  'BT Group',
    period:   'Jul 2023 – May 2024',
    teamSize: 15,
    star: {
      situation: 'Existing broadband customers wanting to upgrade (regrade) their plan — whether moving from a legacy BT package to the new Nayan platform, or upgrading within Nayan — faced a complex process. The system needed to check current assets, verify technical eligibility at their address, present available offers, and handle the transition seamlessly without service disruption.',
      task:      'Build a digital self-service journey that allows existing customers to upgrade their broadband speed, add extras (like Smart Wi-Fi, Cyber Security, or Home Phone), and switch plans — all online without needing to call in. The journey needed to support both BT-to-Nayan migrations and Nayan-to-Nayan regrades.',
      action:    'The squad built a Single Page Application (SPA) integrated with a Journey Orchestrator (JO) that handles the end-to-end flow. The system fetches customer details and billing accounts, checks current assets via Product Inventory, runs technical eligibility against the customer\'s address (using Openreach NAD keys), and then presents qualifying offers through Product Offering Qualification APIs. Customers can choose a new speed, select add-ons (Wi-Fi boosters, security packages), set up direct debit payments, and place an order — all following TMF (TeleManagement Forum) standard APIs. The journey also handles the converged checkout for customers adding a SIM alongside their broadband upgrade.',
      result:    'Customers can now browse, compare, and upgrade their broadband package entirely online in minutes — seeing only the plans and extras they\'re eligible for based on their address and current setup. The digital-first approach reduces call centre volume and gives customers control over their upgrade journey.'
    },
    tech: [
      { label: 'React',             cls: 'tag-fw'   },
      { label: 'Flutter',           cls: 'tag-lang' },
      { label: 'Java · Spring Boot', cls: 'tag-lang' }
    ]
  }
};

/* ── Render modal inner HTML from data key ── */
function renderModal(key) {
  const d = projectData[key];
  if (!d) return '';

  const techHTML = d.tech
    .map(t => `<span class="tag ${t.cls}">${t.label}</span>`)
    .join('');

  const starIcons  = { situation: 'fa-circle-info', task: 'fa-bullseye', action: 'fa-gears', result: 'fa-chart-line' };
  const starLabels = { situation: 'Situation',       task: 'Task',        action: 'Action',   result: 'Result'      };

  const starHTML = ['situation', 'task', 'action', 'result'].map(k => `
    <div class="proj-star-section">
      <div class="proj-star-label"><i class="fas ${starIcons[k]}"></i> ${starLabels[k]}</div>
      <p class="proj-star-text">${d.star[k]}</p>
    </div>`).join('');

  return `
    <div class="proj-modal-header">
      <h2 class="proj-modal-title" id="projModalTitle">${d.title}</h2>
      <div class="proj-modal-meta">
        <span class="proj-modal-role">${d.role} &middot; ${d.company}</span>
        <span class="proj-modal-period"><i class="fas fa-calendar"></i> ${d.period}</span>
        ${d.teamSize ? `<span class="proj-modal-team"><i class="fas fa-users"></i> ${d.teamSize}</span>` : ''}
      </div>
    </div>
    ${starHTML}
    <div class="proj-tech-row">
      <span class="proj-tech-label">Tech Stack</span>
      ${techHTML}
    </div>`;
}

/* ── Open / close logic ── */
let _modalTrigger  = null;
const projModal    = document.getElementById('projModal');
const projModalBody = document.getElementById('projModalBody');

function openModal(key, triggerEl) {
  _modalTrigger = triggerEl;
  projModalBody.innerHTML = renderModal(key);
  projModal.removeAttribute('hidden');
  // Force a reflow so the CSS transition fires from the initial state
  void projModal.offsetHeight;
  projModal.classList.add('open');
  document.body.classList.add('proj-open');
  // Accessibility: move focus into the modal
  const closeBtn = projModal.querySelector('.proj-close');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  projModal.classList.remove('open');
  document.body.classList.remove('proj-open');
  // Wait for the CSS transition to finish, then truly hide the element
  projModal.addEventListener('transitionend', function handler() {
    projModal.setAttribute('hidden', '');
    projModal.removeEventListener('transitionend', handler);
    if (_modalTrigger) {
      _modalTrigger.focus();
      _modalTrigger = null;
    }
  }, { once: true });
}

/* ── Wire up trigger buttons (chip + CTA) ── */
document.querySelectorAll('.proj-chip, .proj-cta-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const container = btn.closest('[data-project]');
    if (!container) return;
    openModal(container.dataset.project, btn);
  });
});

/* ── Close via backdrop click ── */
projModal.querySelector('.proj-backdrop').addEventListener('click', closeModal);

/* ── Close via ✕ button ── */
projModal.querySelector('.proj-close').addEventListener('click', closeModal);

/* ── Close via Escape key ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && projModal.classList.contains('open')) closeModal();
});

/* ── Focus trap: keep Tab cycling inside the open modal ── */
projModal.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusable = Array.from(
    projModal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
  ).filter(el => !el.hasAttribute('disabled'));
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
  }
});
