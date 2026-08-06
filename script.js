/* =========================================================
   SUBHRAJYOTI DASH — CV Interactivity
   ========================================================= */

/* --- Navbar: scroll effect + active link highlighting --- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Scrolled class for frosted background
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

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* --- Mobile nav toggle --- */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  navToggle.querySelector('i').classList.toggle('fa-bars');
  navToggle.querySelector('i').classList.toggle('fa-xmark');
});
// Close on link click
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.querySelector('i').classList.add('fa-bars');
    navToggle.querySelector('i').classList.remove('fa-xmark');
  });
});

/* --- Back to top --- */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --- Fade-in on scroll (IntersectionObserver) --- */
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of grid/list parents
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * i);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => fadeObserver.observe(el));

/* --- Animated counters in hero stats --- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statsSection = document.querySelector('.hero-stats');
let countersStarted = false;
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    document.querySelectorAll('.stat-number[data-target]').forEach(animateCounter);
    statsObserver.disconnect();
  }
}, { threshold: 0.5 });
if (statsSection) statsObserver.observe(statsSection);

/* --- Timeline items: staggered fade-in --- */
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

timelineItems.forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  timelineObserver.observe(item);
});

/* --- Skill tags: pop-in on scroll --- */
const skillGroups = document.querySelectorAll('.skill-group');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.tag');
      tags.forEach((tag, i) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.85)';
        setTimeout(() => {
          tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          tag.style.opacity = '1';
          tag.style.transform = 'scale(1)';
        }, i * 60);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
skillGroups.forEach(g => skillObserver.observe(g));

/* --- Highlight cards: subtle entrance --- */
const highlightCards = document.querySelectorAll('.highlight-card');
const highlightObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      highlightObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

highlightCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(18px)';
  card.style.transition = `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`;
  highlightObserver.observe(card);
});

/* --- Education & About cards --- */
const cardEls = document.querySelectorAll('.edu-card, .about-card, .contact-card');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cardEls.forEach((c, i) => {
  c.style.opacity = '0';
  c.style.transform = 'translateY(16px)';
  c.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
  cardObserver.observe(c);
});

/* --- Smooth-scroll for all anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
