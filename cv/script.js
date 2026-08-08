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

// Mobile: FAB removed — bottom tab bar handles mobile nav
if (sidebarOpen) sidebarOpen.addEventListener('click', () => {});

// Legacy — no longer used
const sidebarBackdrop = null;
function toggleMobileSidebar(forceClose) {}

document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', () => {});
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
// Top navbar is hidden on mobile — bottom tab bar handles mobile nav.
// Keep desktop nav-links toggle as fallback (navbar visible on desktop is also hidden,
// so this is purely defensive).
if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      const icon = navToggle.querySelector('i');
      if (icon) { icon.className = 'fas fa-bars'; }
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
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.opacity    = '0';
  item.style.transform  = 'translateY(20px)';
  item.style.transition = `opacity 0.45s ease ${i * 0.06}s, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.06}s`;
  timelineObserver.observe(item);
});

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
  c.style.opacity    = '0';
  c.style.transform  = 'translateY(22px)';
  c.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s`;
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
      situation: 'Customers wanting to buy <strong>broadband and a mobile SIM together</strong> had to go through <strong>separate purchase journeys</strong> — different carts, different forms, different confirmations — creating a <strong>frustrating and lengthy buying experience</strong>.',
      task:      'Build a <strong>unified checkout</strong> that combines broadband and mobile purchases into a <strong>single, seamless flow</strong> — reducing drop-offs and simplifying the customer journey.',
      action:    'A <strong>converged cart</strong> was designed that holds both broadband and mobile products together. Customers now <strong>fill in their details once</strong>, go through a <strong>single payment step</strong>, and place <strong>one combined order</strong>. Behind the scenes, the system <strong>intelligently splits and routes</strong> each product to the right fulfilment channel automatically.',
      result:    'Customers experience a <strong>frictionless, one-click-style purchase</strong> for bundled products. <strong>Fewer steps, no duplicate data entry</strong>, and a single order confirmation — making buying multiple products <strong>as simple as buying one</strong>.'
    },
    tech: [
      { label: 'React',              cls: 'tag-fw'   },
      { label: 'Flutter',            cls: 'tag-lang' },
      { label: 'Hybris',             cls: 'tag-api'  },
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
      situation: 'Customers looking to purchase <strong>broadband, TV, or sport packages</strong> faced <strong>fragmented digital journeys</strong>. Whether they were new customers buying broadband for the first time, existing customers upgrading their plan, moving home, or adding TV and sport — each scenario had its own <strong>disconnected experience</strong>. This created <strong>confusion, drop-offs, and inconsistency</strong> across channels (web and app).',
      task:      'Build a <strong>unified digital sales platform</strong> that covers the full spectrum of broadband, TV, and sport purchase journeys — from <strong>discovery and browsing through to checkout and fulfilment</strong>. The platform needed to serve <strong>new acquisitions, plan upgrades (regrades), home moves, in-life add-ons, TV-led bundles, soft bundles</strong>, and even colleague product purchases — all under one cohesive tribe.',
      action:    'Multiple <strong>specialist squads</strong> were formed — <strong>Get Broadband</strong> (new customer acquisition), <strong>Get Better Broadband</strong> (existing customer upgrades/regrades), <strong>Browse</strong> (product discovery and learn pages), <strong>Home Move, TV &amp; Sport, Inlife Add-On</strong>, and Engineering Capability. Each squad owns its end-to-end journey with dedicated <strong>frontend micro-frontends</strong>, backend APIs integrating with systems like <strong>Hybris, Pega</strong>, and a <strong>Journey Orchestrator</strong>. A shared architecture, CMS layer, and common engineering practices tie everything together. The platform also extended to <strong>BT.com and the EE Home App</strong>.',
      result:    'A comprehensive <strong>digital sales ecosystem</strong> where customers can discover, compare, and purchase <strong>broadband, TV, and sport products</strong> through a <strong>single, consistent experience</strong> — whether they\'re buying for the first time, upgrading, moving home, or adding entertainment packages to their existing plan.'
    },
    tech: [
      { label: 'React',              cls: 'tag-fw'   },
      { label: 'Flutter',            cls: 'tag-lang' },
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
      situation: 'Existing broadband customers wanting to <strong>upgrade (regrade) their plan</strong> — whether moving from a <strong>legacy BT package to the new Nayan platform</strong>, or upgrading within Nayan — faced a complex process. The system needed to <strong>check current assets, verify technical eligibility</strong> at their address, present available offers, and handle the transition <strong>seamlessly without service disruption</strong>.',
      task:      'Build a <strong>digital self-service journey</strong> that allows existing customers to <strong>upgrade their broadband speed, add extras</strong> (like Smart Wi-Fi, Cyber Security, or Home Phone), and switch plans — <strong>all online without needing to call in</strong>. The journey needed to support both <strong>BT-to-Nayan migrations</strong> and <strong>Nayan-to-Nayan regrades</strong>.',
      action:    'The squad built a <strong>Single Page Application (SPA)</strong> integrated with a <strong>Journey Orchestrator (JO)</strong> that handles the end-to-end flow. The system fetches customer details and billing accounts, checks current assets via <strong>Product Inventory</strong>, runs <strong>technical eligibility</strong> against the customer\'s address (using <strong>Openreach NAD keys</strong>), and then presents qualifying offers through <strong>Product Offering Qualification APIs</strong>. Customers can choose a new speed, select add-ons (Wi-Fi boosters, security packages), set up direct debit payments, and place an order — all following <strong>TMF (TeleManagement Forum) standard APIs</strong>. The journey also handles the <strong>converged checkout</strong> for customers adding a SIM alongside their broadband upgrade.',
      result:    'Customers can now <strong>browse, compare, and upgrade their broadband package entirely online</strong> in minutes — seeing only the plans and extras they\'re eligible for based on their address and current setup. The <strong>digital-first approach reduces call centre volume</strong> and gives customers <strong>full control over their upgrade journey</strong>.'
    },
    tech: [
      { label: 'React',              cls: 'tag-fw'   },
      { label: 'Flutter',            cls: 'tag-lang' },
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

  function toBullets(text) {
    const sentences = text
      .split(/(?<=\.)\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    if (sentences.length <= 1) {
      return `<ul class="proj-star-bullets"><li>${text}</li></ul>`;
    }
    return `<ul class="proj-star-bullets">${sentences.map(s => `<li>${s}</li>`).join('')}</ul>`;
  }

  const starHTML = ['situation', 'task', 'action', 'result'].map(k => `
    <div class="proj-star-section">
      <div class="proj-star-label"><i class="fas ${starIcons[k]}"></i> ${starLabels[k]}</div>
      ${toBullets(d.star[k])}
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

/* ─── Career Highlight STAR Stories ─────────────────────── */

const highlightStories = {
  'manual-hours': {
    title:  'Eliminated 720 Manual Testing Hours / Quarter',
    icon:   'fa-flask',
    star: {
      situation: 'The QA team at <strong>BT Group</strong> was spending over <strong>720 hours every quarter</strong> manually executing repetitive API test scenarios for broadband checkout journeys. Every release cycle consumed <strong>weeks of engineer time</strong> on regression runs that produced inconsistent results and <strong>blocked deployments</strong>.',
      task:      'As <strong>QA Engineering Specialist</strong>, I was tasked with building a <strong>robust, maintainable API automation suite</strong> that could replace manual regression entirely and integrate directly into the <strong>CI/CD pipeline</strong> for every release.',
      action:    'I designed and implemented <strong>180+ end-to-end API test scenarios</strong> using <strong>Postman collections</strong> and <strong>Newman CLI</strong>, covering critical customer journeys — eligibility checks, product qualification, order placement, and payment flows. Each test was <strong>contract-validated against TMF APIs</strong> and wired into <strong>Jenkins</strong> for automated execution on every pull request and nightly build.',
      result:    '<strong>Manual API regression was fully eliminated.</strong> The suite ran in <strong>under 25 minutes</strong> on Jenkins, saving <strong>720 engineering hours every quarter</strong> and enabling the team to <strong>release with confidence on demand</strong> rather than on a fixed manual cycle.'
    }
  },

  'automation-coverage': {
    title:  '95% Automation Coverage Across Customer Journeys',
    icon:   'fa-shield-halved',
    star: {
      situation: 'Automation coverage across the <strong>broadband and SIM checkout journeys</strong> was fragmented — different squads had different coverage levels, large chunks of the end-to-end flow had <strong>no automated checks</strong>, and releases depended heavily on <strong>manual exploratory testing</strong>.',
      task:      'Define a <strong>unified automation strategy</strong> and systematically close the coverage gaps across <strong>Web, App, API, and contract testing layers</strong> for all customer-facing journeys — new acquisition, upgrade, home move, and converged checkout.',
      action:    'I mapped every critical user journey to an automation layer — <strong>Playwright</strong> for UI and API flows, <strong>Appium</strong> for the EE Home App, and <strong>WireMock</strong> for component-level stub testing. I established <strong>coverage tracking dashboards</strong> in Jira and set <strong>quality gates</strong> that blocked merges below threshold. Squads were onboarded onto the framework with pairing sessions and shared libraries.',
      result:    'Coverage rose from a patchy <strong>~40% to a consistent 95%</strong> across all critical journeys. Release confidence increased significantly, <strong>manual regression effort dropped to near zero</strong>, and the coverage metric became a <strong>standard quality gate</strong> across the entire Digital Sales tribe.'
    }
  },

  'release-cadence': {
    title:  'Monthly → Bi-weekly Release Cadence',
    icon:   'fa-bolt',
    star: {
      situation: 'BT Group\'s Digital Sales platform was releasing to production <strong>only once a month</strong>. Each release was a <strong>high-risk event</strong> that required days of manual regression, multiple sign-off gates, and a large coordination overhead — making it impossible to respond quickly to <strong>business priorities or production incidents</strong>.',
      task:      'As <strong>QA Engineering Manager</strong>, I needed to <strong>compress the release cycle</strong> by making quality validation fast, reliable, and automated enough that the team could confidently <strong>ship every two weeks</strong> instead of every month.',
      action:    'I introduced <strong>in-sprint automation as a non-negotiable</strong>: every story that shipped had automated tests before it merged. I replaced manual regression gates with <strong>automated pipeline stages</strong> — full <strong>Playwright UI suite</strong>, <strong>Karate API contract suite</strong>, and smoke tests post-deployment. I also introduced <strong>environment-level quality gates</strong> and worked with DevOps to set up stable staging environments for parallel validation.',
      result:    'The team moved from <strong>monthly to bi-weekly releases</strong> within two quarters. Each release cycle was cleaner, faster, and lower-risk. The business could respond to customer feedback and market priorities in <strong>half the time</strong>, and <strong>production incidents dropped</strong> because issues were caught earlier in the pipeline.'
    }
  },

  'zero-defect': {
    title:  '5 Consecutive Zero-Defect Production Releases',
    icon:   'fa-award',
    star: {
      situation: 'Despite having a large QA team, production releases at BT Group regularly saw <strong>post-release defects</strong> — missed edge cases in checkout flows, payment failures under specific configurations, and cross-journey regressions. Each production incident required <strong>firefighting, hotfixes</strong>, and damaged <strong>customer trust</strong>.',
      task:      'Redesign the <strong>end-to-end quality validation framework</strong> to catch all critical defects before they reached production, with the goal of achieving at least <strong>three consecutive clean releases</strong>.',
      action:    'I introduced a <strong>layered quality framework</strong>: <strong>API contract tests</strong> caught integration breaks early; <strong>component tests using WireMock stubs</strong> validated each service in isolation; <strong>UI regression</strong> covered full end-to-end journeys; and a <strong>production smoke suite</strong> ran immediately after every deployment. I also introduced mandatory <strong>post-release monitoring dashboards</strong> and defined <strong>incident SLAs</strong> that fed back into the test strategy.',
      result:    'The team achieved <strong>5 consecutive zero-defect production releases</strong> — the <strong>longest clean streak in the tribe\'s history</strong>. Customer-reported bugs dropped significantly, the team\'s credibility with stakeholders improved, and the zero-defect streak became a <strong>benchmark across the broader BT QA community</strong>.'
    }
  },

  'attrition': {
    title:  'Attrition Reduced from 25% → 12%',
    icon:   'fa-users',
    star: {
      situation: 'When I stepped into the <strong>QA Engineering Manager</strong> role, the team was experiencing <strong>25% annual attrition</strong> — engineers were leaving due to a lack of <strong>career growth visibility</strong>, repetitive work with no learning opportunities, and unclear performance expectations. Losing experienced engineers mid-sprint was <strong>disrupting delivery</strong> and increasing onboarding overhead.',
      task:      'Stabilise the team by creating a <strong>clear career progression framework</strong>, investing in individual growth, and building an environment where engineers felt <strong>valued and challenged</strong> — not just utilised.',
      action:    'I introduced a <strong>QA Career Ladder</strong> that mapped out <strong>Engineer → Senior → Specialist → Lead</strong> paths with clear skill expectations and promotion criteria. I ran <strong>monthly 1:1s</strong> focused on growth, not just delivery status. I introduced <strong>rotation opportunities</strong> across squads, encouraged engineers to own automation framework components, and set up an <strong>internal knowledge-sharing series</strong>. High performers were given <strong>stretch assignments</strong> — leading framework design or mentoring juniors.',
      result:    'Attrition dropped from <strong>25% to 12%</strong> within <strong>18 months</strong>. <strong>88% of high-performers were retained.</strong> Team morale improved measurably — engineers began proactively contributing ideas, and two engineers who had been at risk of leaving were <strong>promoted within the year</strong>. The structured career framework was later <strong>adopted by adjacent QA teams</strong> in the tribe.'
    }
  },

  'ai-hours-saved': {
    title:  '800 Engineering Hours Saved Annually via AI',
    icon:   'fa-microchip',
    star: {
      situation: 'Writing boilerplate automation code — page objects, step definitions, API test scaffolding, data builders — was consuming a <strong>disproportionate amount of engineer time</strong> at BT Group. Engineers were spending <strong>30–40% of their automation effort</strong> on repetitive scaffolding rather than on <strong>test logic and coverage</strong>.',
      task:      'Drive <strong>practical AI adoption</strong> across the QA team to reduce the time spent on low-value repetitive coding tasks, improve code quality, and free engineers to focus on <strong>complex test design and exploratory testing</strong>.',
      action:    'I piloted <strong>GitHub Copilot</strong> and <strong>Amazon Q</strong> within the team, establishing prompt patterns for generating Playwright selectors, Karate feature files, Java test data builders, and CI configuration. I ran <strong>hands-on sessions</strong> teaching engineers how to use AI tools effectively — including when not to trust suggestions. I also introduced <strong>KIRO</strong> for spec-to-test generation and <strong>MCP-based agentic workflows</strong> for exploratory test scenario generation.',
      result:    'The team saved over <strong>800 engineering hours annually</strong> — equivalent to roughly <strong>20 engineering weeks</strong>. Code generation time for standard automation components dropped by <strong>~60%</strong>. Engineers redirected that time toward higher-value work: designing test strategies, improving framework architecture, and expanding exploratory coverage on complex journeys.'
    }
  },

  'shift-left': {
    title:  'Early Defect Detection: 18% → 62%',
    icon:   'fa-magnifying-glass-chart',
    star: {
      situation: 'At BT Group, the majority of defects — around <strong>82%</strong> — were being found <strong>late in the testing cycle</strong>, during system integration or end-to-end testing. By then, fixing a bug was <strong>5–10x more expensive</strong> and caused sprint carry-overs, release delays, and frustration across the delivery team.',
      task:      'Introduce <strong>shift-left practices</strong> that moved defect detection to the <strong>earliest possible point</strong> in the development cycle — ideally at the <strong>API contract and component level</strong>, before full system integration even began.',
      action:    'I introduced <strong>API contract testing using Karate</strong> aligned to TMF standards, so any API change that violated the agreed contract was flagged <strong>at the PR stage</strong>. I set up <strong>WireMock stubs</strong> for upstream dependencies so component tests could run independently without needing a full environment. I also introduced a <strong>Definition of Ready checklist</strong> requiring API contracts and test scenarios to be reviewed before a story was picked up for development.',
      result:    'Early-stage defect detection jumped from <strong>18% to 62%</strong> within three quarters. Sprint carry-overs due to late-found bugs dropped by <strong>over 50%</strong>. Developers started catching integration issues in their own branches before raising PRs — a <strong>genuine shift-left cultural change</strong>, not just a process change.'
    }
  },

  'defect-leakage': {
    title:  'Defect Leakage: 30% → 5%',
    icon:   'fa-bug-slash',
    star: {
      situation: 'When I became <strong>QA Engineering Manager</strong>, <strong>30% of defects</strong> were leaking through to production — customers were encountering broken checkout flows, <strong>failed payments</strong>, and incorrect plan displays. Each leaked defect required an <strong>emergency fix, a hotfix release</strong>, and a post-mortem, consuming significant unplanned engineering effort.',
      task:      'Systematically <strong>reduce defect leakage</strong> by identifying the root causes of escapes, closing the gaps in the test strategy, and using <strong>AI-assisted analysis</strong> to surface patterns that manual review was missing.',
      action:    'I ran a <strong>structured RCA programme</strong> across <strong>6 months</strong> — every production defect was logged, categorised, and traced back to the point where it should have been caught. I used <strong>AI-assisted analysis (Amazon Q)</strong> to cluster defect patterns and identify systemic gaps — missing negative test scenarios, untested configuration combinations, and gaps in cross-journey regression. I then <strong>rebuilt the regression suite</strong> to address each gap systematically, and introduced a <strong>defect escape metric</strong> as a first-class quality KPI reviewed in every sprint review.',
      result:    'Defect leakage dropped from <strong>30% to 5%</strong> over two quarters. <strong>Production incidents declined sharply</strong>, customer-reported issues fell, and the team\'s quality reputation with stakeholders improved. The <strong>5% target became the standard SLA</strong> for defect leakage across the BT Digital Sales tribe.'
    }
  }
};

/* ── Render highlight STAR modal ── */
function renderHighlightModal(key) {
  const d = highlightStories[key];
  if (!d) return '';

  const starIcons  = { situation: 'fa-circle-info', task: 'fa-bullseye', action: 'fa-gears', result: 'fa-chart-line' };
  const starLabels = { situation: 'Situation', task: 'Task', action: 'Action', result: 'Result' };

  const starHTML = ['situation', 'task', 'action', 'result'].map(k => `
    <div class="proj-star-section">
      <div class="proj-star-label"><i class="fas ${starIcons[k]}"></i> ${starLabels[k]}</div>
      <p class="proj-star-text">${d.star[k]}</p>
    </div>`).join('');

  return `
    <div class="proj-modal-header">
      <h2 class="proj-modal-title" id="projModalTitle">
        <i class="fas ${d.icon}" style="color:var(--accent);margin-right:0.5rem;font-size:1rem;"></i>${d.title}
      </h2>
      <div class="proj-modal-meta">
        <span class="proj-modal-role">Career Highlight · STAR Story</span>
      </div>
    </div>
    ${starHTML}`;
}

/* ── Highlight card hover popup ── */

const hlPopup = document.createElement('div');
hlPopup.className = 'hl-popup';
hlPopup.setAttribute('role', 'tooltip');
document.body.appendChild(hlPopup);

// Dim backdrop
const hlBackdrop = document.createElement('div');
hlBackdrop.className = 'hl-popup-backdrop';
document.body.appendChild(hlBackdrop);

let hlShowTimer  = null;
let hlActiveCard = null;

function buildPopupHTML(key) {
  const d = highlightStories[key];
  if (!d) return '';
  const icons  = { situation: 'fa-circle-info', task: 'fa-bullseye', action: 'fa-gears', result: 'fa-chart-line' };
  const labels = { situation: 'Situation', task: 'Task', action: 'Action', result: 'Result' };

  // Split paragraph into bullet sentences
  function toBullets(text) {
    const sentences = text
      .split(/(?<=\.)\s+/)          // split after full stop + whitespace
      .map(s => s.trim())
      .filter(s => s.length > 0);
    if (sentences.length <= 1) {
      return `<ul class="hlp-bullets"><li>${text}</li></ul>`;
    }
    return `<ul class="hlp-bullets">${sentences.map(s => `<li>${s}</li>`).join('')}</ul>`;
  }

  const rows = ['situation','task','action','result'].map(k => `
    <div class="hlp-row">
      <div class="hlp-label"><i class="fas ${icons[k]}"></i>${labels[k]}</div>
      ${toBullets(d.star[k])}
    </div>`).join('');
  return `
    <div class="hlp-header">
      <i class="fas ${d.icon} hlp-icon"></i>
      <span class="hlp-title">${d.title}</span>
      <button class="hlp-close" aria-label="Close"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="hlp-divider"></div>
    <div class="hlp-body">${rows}</div>`;
}

function placePopup() {
  const VW = window.innerWidth;
  const VH = window.innerHeight;
  const PADDING = 16;

  // Reset constraints so we can measure natural height
  hlPopup.style.maxHeight = '';
  hlPopup.style.top  = '-9999px';
  hlPopup.style.left = '-9999px';

  const pw = Math.min(520, VW - PADDING * 2);
  hlPopup.style.width = pw + 'px';

  const ph = hlPopup.offsetHeight;
  const maxH = VH - PADDING * 2;

  if (ph > maxH) {
    hlPopup.style.maxHeight = maxH + 'px';
  }

  // Center horizontally and vertically
  const left = Math.max(PADDING, (VW - pw) / 2);
  const top  = Math.max(PADDING, (VH - Math.min(ph, maxH)) / 2);

  hlPopup.style.top  = top + 'px';
  hlPopup.style.left = left + 'px';

  // Remove directional classes — centered popup has no arrow direction
  hlPopup.dataset.dir = 'center';
  hlPopup.classList.remove('hlp-dir-up', 'hlp-dir-down');
  hlPopup.classList.add('hlp-dir-center');
}

function showPopup(card) {
  clearTimeout(hlShowTimer);
  if (hlActiveCard === card && hlPopup.classList.contains('hlp-visible')) return;

  const key = card.dataset.highlight;
  if (!key) return;

  hlActiveCard = card;

  // Render content, make measurable but invisible
  hlPopup.innerHTML = buildPopupHTML(key);
  hlPopup.classList.remove('hlp-visible', 'hlp-dir-up', 'hlp-dir-down', 'hlp-dir-center');
  hlPopup.style.visibility = 'hidden';
  hlPopup.style.display    = 'block';

  // Position centered in viewport
  placePopup();

  // Wire close button
  const closeBtn = hlPopup.querySelector('.hlp-close');
  if (closeBtn) closeBtn.addEventListener('click', hidePopup);

  hlPopup.style.visibility = '';

  // Show backdrop
  hlBackdrop.style.display = 'block';
  requestAnimationFrame(() => hlBackdrop.classList.add('hlp-visible'));

  // Lock body scroll
  document.body.style.overflow = 'hidden';

  // Animate in next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hlPopup.classList.add('hlp-visible');
    });
  });
}

function hidePopup() {
  clearTimeout(hlShowTimer);
  hlPopup.classList.remove('hlp-visible');
  hlBackdrop.classList.remove('hlp-visible');
  hlActiveCard = null;
  document.body.style.overflow = '';
  hlPopup.addEventListener('transitionend', function handler() {
    if (!hlPopup.classList.contains('hlp-visible')) {
      hlPopup.style.display = 'none';
      hlBackdrop.style.display = 'none';
    }
    hlPopup.removeEventListener('transitionend', handler);
  });
}

// Clicking the backdrop dismisses the popup
hlBackdrop.addEventListener('click', hidePopup);

document.querySelectorAll('.highlight-card[data-highlight]').forEach(card => {
  // Open on click
  card.addEventListener('click', () => {
    if (hlActiveCard === card && hlPopup.classList.contains('hlp-visible')) {
      hidePopup();
    } else {
      showPopup(card);
    }
  });
  // Keyboard: Enter/Space to open, Escape to close
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPopup(card); }
    if (e.key === 'Escape') hidePopup();
  });
});

// Dismiss on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') hidePopup();
});

/* ─── Floating Bottom Tab Bar ────────────────────────────── */
const bottomTabBar  = document.getElementById('bottomTabBar');
const tabItems      = bottomTabBar ? bottomTabBar.querySelectorAll('.tab-item') : [];

function updateActiveTab() {
  if (!bottomTabBar) return;
  let current = '';
  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight    = document.documentElement.scrollHeight;

  if (scrollBottom >= docHeight - 40) {
    current = sections[sections.length - 1].id;
  } else {
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
    });
  }

  tabItems.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.section === current);
  });
}

// Smooth scroll on tap
tabItems.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(tab.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Integrate with existing scroll listener
window.addEventListener('scroll', updateActiveTab, { passive: true });
updateActiveTab();
