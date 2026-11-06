/**
 * ATELIER — MAYFAIR, LONDON
 * Vanilla JavaScript: Mobile Drawer, Editorial Lightbox, Appointment Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('atelierYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Drawer Navigation
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 3. Collection CTAs Auto-Fill Form
  const cardCtas = document.querySelectorAll('.card-cta');
  const serviceSelect = document.getElementById('atelierService');

  cardCtas.forEach(cta => {
    cta.addEventListener('click', () => {
      const service = cta.getAttribute('data-service');
      if (service && serviceSelect) {
        serviceSelect.value = service;
      }
    });
  });

  // 4. Interactive Editorial Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  function openLightbox(imgSrc, captionText) {
    if (!lightboxModal) return;
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;
    lightboxModal.style.display = 'flex';
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.style.display = 'none';
    lightboxModal.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || img.alt;
      if (img) openLightbox(img.src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.style.display === 'flex') {
      closeLightbox();
    }
  });

  // 5. Appointment Booking Form Validation
  const atelierForm = document.getElementById('atelierForm');
  if (atelierForm) {
    const nameInput = document.getElementById('atelierName');
    const emailInput = document.getElementById('atelierEmail');
    const dateInput = document.getElementById('atelierDate');
    const formServiceSelect = document.getElementById('atelierService');
    const messageInput = document.getElementById('atelierMessage');

    const successBox = document.getElementById('atelierSuccessAlert');
    const summaryEl = document.getElementById('atelierSuccessSummary');
    const resetBtn = document.getElementById('atelierResetBtn');

    // Default min date to tomorrow
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkField(input, valid) {
      const wrap = input.closest('.atelier-field');
      if (!wrap) return true;
      if (!valid) {
        wrap.classList.add('has-error');
        return false;
      } else {
        wrap.classList.remove('has-error');
        return true;
      }
    }

    [nameInput, emailInput, dateInput, formServiceSelect].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        const wrap = input.closest('.atelier-field');
        if (wrap) wrap.classList.remove('has-error');
      });
      input.addEventListener('change', () => {
        const wrap = input.closest('.atelier-field');
        if (wrap) wrap.classList.remove('has-error');
      });
    });

    atelierForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkField(nameInput, nameInput.value.trim().length >= 2);
      const isEmailValid = checkField(emailInput, validateEmail(emailInput.value.trim()));
      const isDateValid = checkField(dateInput, dateInput.value !== '');
      const isServiceValid = checkField(formServiceSelect, formServiceSelect.value !== '');

      if (isNameValid && isEmailValid && isDateValid && isServiceValid) {
        summaryEl.innerHTML = `
          We have recorded your appointment inquiry for <strong>${escapeHtml(nameInput.value.trim())}</strong>.<br>
          • <strong>Service:</strong> ${escapeHtml(formServiceSelect.value)}<br>
          • <strong>Preferred Date:</strong> ${escapeHtml(dateInput.value)}<br>
          • <strong>Confirmation Contact:</strong> ${escapeHtml(emailInput.value.trim())}<br>
          • <strong>Garment Notes:</strong> "${escapeHtml(messageInput.value.trim() || 'First-time bespoke consultation')}"
        `;

        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const firstErr = atelierForm.querySelector('.has-error input, .has-error select');
        if (firstErr) firstErr.focus();
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        atelierForm.reset();
        successBox.style.display = 'none';
      });
    }
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
});
