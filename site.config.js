/**
 * ============================================================
 *  SITE CONFIGURATION
 *  Toggle any page, section, or feature ON (true) or OFF (false)
 *  Changes take effect immediately on next page load.
 * ============================================================
 */
window.SITE_CONFIG = {

  /* ----------------------------------------------------------
   * PORTAL — homepage cards (index.html)
   * ---------------------------------------------------------- */
  pages: {
    myProfile:     true,   // "My Profile" portal card → cv/index.html
    knowledgeBase: true,   // "Knowledge Base" portal card → knowledge/index.html
  },

  /* ----------------------------------------------------------
   * QUICK LINKS — homepage footer links (index.html)
   * ---------------------------------------------------------- */
  quickLinks: {
    email:    true,   // sjdash13@gmail.com
    linkedin: true,   // LinkedIn profile
    github:   true,   // GitHub profile
    resume:   true,   // Resume PDF download
  },

  /* ----------------------------------------------------------
   * CV SECTIONS — cv/index.html
   * ---------------------------------------------------------- */
  cvSections: {
    about:       true,   // About / Summary
    highlights:  true,   // Career Highlights
    skills:      true,   // Technical Skills
    experience:  true,   // Professional Experience
    education:   true,   // Education
    contact:     true,   // Get In Touch
  },

  /* ----------------------------------------------------------
   * KNOWLEDGE BASE — cheatsheet cards (knowledge/index.html)
   * ---------------------------------------------------------- */
  cheatsheets: {
    javaPython:          true,   // Java & Python
    seleniumPlaywright:  true,   // Selenium & Playwright
    linuxCommands:       true,   // Linux Commands
    sql:                 true,   // SQL
    docker:              true,   // Docker
    cicd:                true,   // CI/CD
    kubernetes:          true,   // Kubernetes
    mobileTesting:       true,   // Mobile Testing
    dsaInterview:        true,   // DSA Interview
    aiTesting:           true,   // AI Testing
  },

};
