/* ==========================================================================
   WEBBROS interactions
   - Responsive navigation (with Escape to close)
   - Header state, scroll progress and active section highlighting
   - Accessible reveal animations
   - Service CTAs that preselect the enquiry form
   - WhatsApp project-enquiry form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation: toggle the menu and keep ARIA state in sync.
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  const setMenu = (open) => {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('is-open')));

    // Close the mobile menu after the visitor selects a section.
    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

    // Escape closes the menu and returns focus to the toggle button.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    // Reset the menu if the window is resized to the desktop layout.
    window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  // Header background and thin page progress indicator, updated without blocking scroll.
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    if (progress) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // Highlight the navigation link for the section currently in view.
  const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-contact)')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach((section) => spy.observe(section));
  }

  // Reveal sections as they enter the viewport; fall back gracefully on older browsers.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Service CTAs preselect the matching option in the enquiry form.
  const projectForm = document.getElementById('project-form');
  const typeInput = document.getElementById('project-type');
  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!typeInput) return;
      const wanted = link.dataset.service;
      const match = [...typeInput.options].find((option) => option.text === wanted);
      if (match) typeInput.value = match.value || match.text;
    });
  });

  // Build a WhatsApp message from the validated project enquiry form.
  // The form does not submit data to a server; it opens WhatsApp for the visitor to send.
  const formError = document.getElementById('form-error');
  const whatsappNumber = '918095406516'; // Primary WhatsApp number: +91 80954 06516

  if (projectForm) {
    projectForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('client-name');
      const contactInput = document.getElementById('client-contact');
      const detailsInput = document.getElementById('project-details');

      // Use native form validation and keep a clear fallback message for invalid fields.
      if (!projectForm.checkValidity()) {
        if (formError) formError.hidden = false;
        projectForm.reportValidity();
        return;
      }

      if (formError) formError.hidden = true;

      const name = nameInput.value.trim();
      const service = typeInput.value.trim();
      const contact = contactInput ? contactInput.value.trim() : '';
      const details = detailsInput.value.trim();

      // Encode each value safely so spaces, punctuation, and line breaks survive the URL.
      const message = [
        'Hello WEBBROS, I would like to discuss a project.',
        '',
        `Name: ${name}`,
        `Service needed: ${service}`,
        ...(contact ? [`Phone / email: ${contact}`] : []),
        '',
        'Project requirements:',
        details
      ].join('\n');

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });

    // Hide the error message again once the visitor starts correcting the form.
    projectForm.addEventListener('input', () => {
      if (formError && !formError.hidden && projectForm.checkValidity()) formError.hidden = true;
    });
  }

  // Keep the footer year current without requiring a manual annual update.
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
