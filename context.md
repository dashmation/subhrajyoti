# context.md — LLM Resumption File
> Last updated: 2026-08-06  
> Project: GitHub Pages CV for Subhrajyoti Dash  
> Status: **COMPLETE** — all three files created and ready to deploy

---

## Project Goal
Build a professional single-page CV website for **Subhrajyoti Dash** to be hosted on GitHub Pages, derived from his resume PDF (`Subhrajyoti_Dash_GenAI-SDET.pdf`) and LinkedIn export (`Profile-linkedin.pdf`).

---

## Files Created

| File | Purpose | Lines |
|---|---|---|
| `index.html` | Full CV layout (HTML structure) | ~608 |
| `styles.css` | Dark GitHub-inspired theme, design tokens, responsive | ~761 |
| `script.js` | Animations, scroll effects, counters, mobile nav | ~194 |

---

## Extracted Profile Data

### Personal Info
- **Name:** Subhrajyoti Dash (goes by SJ)
- **Title:** QA Lead | SDET | AI-Driven Test Automation
- **Location:** Bengaluru, India
- **Email:** sjdash13@gmail.com
- **Phone:** +91-8897800010
- **LinkedIn:** linkedin.com/in/subhrajyotidash
- **GitHub:** github.com/dashmation

### Professional Summary
Quality Engineering Leader with 10+ years of QA Automation experience across Telecom, Broadband, OTT, Gaming, Mobile Applications, and Enterprise Platforms. Expert in automation architecture, Playwright, Selenium, Appium, API, Performance and Security Testing, CI/CD, AI-assisted testing, MCP workflows, and engineering leadership. Currently QA Lead at BT Group driving release excellence and AI-enabled productivity.

### Career Highlights (Key Metrics)
- Automated 180+ end-to-end API scenarios → eliminated 720 manual testing hours/quarter
- Automation coverage increased to 95% across critical customer journeys
- Release cadence improved from monthly → bi-weekly releases
- 5 consecutive zero-defect production releases
- Retained 88% of high-performers; attrition reduced from 25% → 12%
- Saved 800 engineering hours/year via AI-assisted automation
- Early defect detection improved from 18% → 62% (shift-left API contract validation)
- Defect leakage reduced from 30% → 5%

### Technical Skills

| Category | Skills |
|---|---|
| AI & Modern QA | Prompt Engineering, GitHub Copilot, Amazon Q, KIRO, MCP, Agentic AI, AI-Assisted Testing |
| Test Automation | Playwright, Selenium, Appium, WDIO, Karate, Robot Framework |
| Programming | Java, Python, JavaScript, TypeScript, Shell Script, Scala |
| API Testing | Rest Assured, Postman, Newman, Swagger, Wiremock |
| Frameworks | TestNG, Pytest, Cucumber, BDD, POM |
| CI/CD | Jenkins, GitHub, GitLab, Docker, Kubernetes |
| Performance | K6, JMeter, Gatling, BlazeMeter |
| Security & Cloud | OWASP ZAP, Pynt, AWS, Oracle Cloud |

### Professional Experience

| Period | Company | Role | Location |
|---|---|---|---|
| Apr 2026 – Present | BT Group | QA Lead / QA Team Lead | Bengaluru |
| May 2024 – Mar 2026 | BT Group | QA Engineering Manager | Bengaluru |
| Jul 2023 – May 2024 | BT Group | QA Engineering Specialist | Bengaluru |
| May 2021 – Jun 2023 | Airtel Digital | Principal Software Engineer | Bengaluru |
| Aug 2020 – May 2021 | Oracle | Senior Software Engineer | Hyderabad |
| Dec 2018 – Aug 2020 | ProKarma | Senior Software Engineer | Hyderabad |
| Mar 2016 – Nov 2018 | IMImobile | Test Engineer | Hyderabad |
| Jun 2015 – Dec 2015 | Aricent | Test Engineer | Hyderabad |
| Feb 2014 – Apr 2015 | Essar Steel (Odisha) | Industrial Automation Engineer | Paradip, Odisha |

### Education

| Degree | Institution | Year |
|---|---|---|
| BTech – Electronics & Telecom Engineering | SIET Dhenkanal / BPUT Odisha | 2009–2013 |
| Intermediate (PCMB) | S.V.M. Autonomous College, Jagatsinghpur | 2007–2008 |
| Matriculation (10th) | Pankapal High School | 2003–2006 |

---

## Website Structure (index.html sections)

1. **Navbar** — fixed, scrolled glass effect, mobile hamburger toggle, active link highlight
2. **Hero** — name, title, location, tagline, CTA buttons (Email / LinkedIn / GitHub), animated stat counters (10+ yrs, 95% coverage, 800+ hrs saved, 50+ engineers led)
3. **About** — summary paragraphs, 4 about-cards (AI-First Testing, Automation Architecture, Engineering Leadership, CI/CD & DevOps)
4. **Highlights** — 8 impact cards with icons and metric descriptions
5. **Skills** — 8 skill-groups in a grid with colour-coded tags per category
6. **Experience** — vertical timeline with 9 roles, bullets, domain tags, period/location
7. **Education** — 3 edu-cards
8. **Contact** — 4 contact cards (Email, Phone, LinkedIn, GitHub)
9. **Footer** — copyright line
10. **Back-to-top button** — fixed, appears after 400px scroll

---

## Design System (styles.css)

- **Theme:** Dark GitHub-inspired (`#0d1117` base, `#161b22` cards)
- **Accent:** `#58a6ff` (blue), `#3fb950` (green)
- **Typography:** Inter (body) + JetBrains Mono (code/tags/meta)
- **Tag colours:** Each skill category has its own background/text token pair
- **Responsive:** Breakpoints at 900px, 700px, 480px

---

## Interactivity (script.js)

- Navbar scroll class + active section detection
- Mobile nav toggle (hamburger ↔ X)
- Back-to-top button
- IntersectionObserver fade-in for all `.fade-in` elements
- Animated counters for hero stats (ease-out cubic)
- Staggered timeline item entrance (translateX)
- Staggered skill tag pop-in (scale)
- Staggered highlight / edu / contact card entrances
- Smooth scroll for all `a[href^="#"]` links

---

## Deployment (GitHub Pages)

To deploy:
```bash
git add index.html styles.css script.js context.md
git commit -m "Add GitHub Pages CV site"
git push origin main
```
Then go to **Settings → Pages → Source: main / root** in the GitHub repo.

The site will be live at: `https://<username>.github.io/<repo-name>/`

---

## Possible Enhancements (for future LLM)

- Add a downloadable PDF resume button (link to the PDF in the repo)
- Add a `_config.yml` for Jekyll-based GitHub Pages metadata
- Add Open Graph / Twitter meta tags for better social sharing previews
- Add a dark/light mode toggle
- Add a `robots.txt` and `sitemap.xml`
- Add project showcase section (GitHub repos via API)
- Add certifications section if Subhrajyoti acquires any
