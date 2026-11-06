/**
 * MUSTAFA AHSAN — PORTFOLIO JAVASCRIPT
 * Vanilla JS: Navigation, Mobile Menu, Form Validation, Smooth Scroll, Dynamic Year
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item, .mobile-cta');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });

    // Close mobile nav on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // 3. Service Cards CTA Wiring (Pre-selects project type & smooth scrolls to form)
  const serviceCtas = document.querySelectorAll('.service-cta');
  const projectTypeSelect = document.getElementById('formProjectType');
  const contactForm = document.getElementById('contactForm');

  serviceCtas.forEach(cta => {
    cta.addEventListener('click', (e) => {
      const type = cta.getAttribute('data-project-type');
      if (type && projectTypeSelect) {
        projectTypeSelect.value = type;
        projectTypeSelect.dispatchEvent(new Event('change'));
      }
    });
  });

  // 4. Active Navigation State on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-item');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // 5. Contact Form Validation & Demo Submission
  if (contactForm) {
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const projectTypeInput = document.getElementById('formProjectType');
    const budgetInput = document.getElementById('formBudget');
    const messageInput = document.getElementById('formMessage');

    const formSuccess = document.getElementById('formSuccess');
    const successSummaryText = document.getElementById('successSummaryText');
    const mailtoFallbackLink = document.getElementById('mailtoFallbackLink');
    const resetFormBtn = document.getElementById('resetFormBtn');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkField(input, condition) {
      const group = input.closest('.form-group');
      if (!group) return true;
      if (!condition) {
        group.classList.add('has-error');
        return false;
      } else {
        group.classList.remove('has-error');
        return true;
      }
    }

    // Clear error on input
    [nameInput, emailInput, projectTypeInput, messageInput].forEach(field => {
      if (!field) return;
      field.addEventListener('input', () => {
        const group = field.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
      field.addEventListener('change', () => {
        const group = field.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkField(nameInput, nameInput.value.trim().length > 1);
      const isEmailValid = checkField(emailInput, validateEmail(emailInput.value.trim()));
      const isProjectTypeValid = checkField(projectTypeInput, projectTypeInput.value !== '');
      const isMessageValid = checkField(messageInput, messageInput.value.trim().length > 5);

      if (isNameValid && isEmailValid && isProjectTypeValid && isMessageValid) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const projectType = projectTypeInput.value;
        const budget = budgetInput.value;
        const message = messageInput.value.trim();

        // Construct honest demo summary
        successSummaryText.innerHTML = `
          <strong>Inquiry Prepared:</strong><br>
          • <strong>Client:</strong> ${escapeHtml(name)} (${escapeHtml(email)})<br>
          • <strong>Service:</strong> ${escapeHtml(projectType)}<br>
          • <strong>Budget:</strong> ${escapeHtml(budget)}<br>
          • <strong>Project Scope:</strong> "${escapeHtml(message.substring(0, 140))}${message.length > 140 ? '...' : ''}"
        `;

        // Configure Mailto fallback
        const subject = encodeURIComponent(`Project Inquiry: ${projectType} — ${name}`);
        const body = encodeURIComponent(
          `Hi Mustafa,\n\nI'm contacting you regarding a project:\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nEstimated Budget: ${budget}\n\nProject Scope:\n${message}\n\nLooking forward to hearing from you!`
        );
        mailtoFallbackLink.href = `mailto:mustafa@mustafaahsan.com?subject=${subject}&body=${body}`;

        // Show success box
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        // Focus first invalid field
        const firstError = contactForm.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstError) firstError.focus();
      }
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        contactForm.reset();
        formSuccess.style.display = 'none';
      });
    }

    if (closeSuccessBtn) {
      closeSuccessBtn.addEventListener('click', () => {
        formSuccess.style.display = 'none';
      });
    }
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
});
