/* ==========================================================================
   Portfolio interactions
   - Responsive navigation
   - Scroll progress
   - Accessible reveal animations
   - WhatsApp project-brief form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation: toggle the menu and keep ARIA state in sync.
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    // Close the mobile menu after the visitor selects a section.
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  // Update the thin page progress indicator without blocking scroll events.
  const progress = document.querySelector('.scroll-progress');
  const updateProgress = () => {
    if (!progress) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

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

  // Build a WhatsApp message from the validated project brief form.
  // The form does not submit data to a server; it opens WhatsApp for the user to send.
  const projectForm = document.getElementById('project-form');
  const formError = document.getElementById('form-error');
  const whatsappNumber = '918095406516';

  if (projectForm) {
    projectForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('client-name');
      const typeInput = document.getElementById('project-type');
      const detailsInput = document.getElementById('project-details');

      // Use native form validation and keep a clear fallback message for invalid fields.
      if (!projectForm.checkValidity()) {
        if (formError) formError.hidden = false;
        projectForm.reportValidity();
        return;
      }

      if (formError) formError.hidden = true;

      const name = nameInput.value.trim();
      const projectType = typeInput.value.trim();
      const details = detailsInput.value.trim();

      // Encode each value safely so spaces, punctuation, and line breaks survive the URL.
      const message = [
        'Hi Chethan, I would like to discuss a website project.',
        '',
        `Name: ${name}`,
        `Project type: ${projectType}`,
        '',
        'About my project:',
        details
      ].join('\n');

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Keep the footer year current without requiring a manual annual update.
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
