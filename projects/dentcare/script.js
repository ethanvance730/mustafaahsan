/**
 * DENTCARE — CHICAGO, IL
 * Vanilla JavaScript: Mobile Drawer, Treatment Selection, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('dentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 3. Treatment Card Actions Quick-Select
  const treatmentActions = document.querySelectorAll('.treatment-action');
  const treatmentSelect = document.getElementById('dentTreatment');

  treatmentActions.forEach(action => {
    action.addEventListener('click', () => {
      const treatment = action.getAttribute('data-treatment');
      if (treatment && treatmentSelect) {
        treatmentSelect.value = treatment;
      }
    });
  });

  // 4. Appointment Form Validation & Demo Feedback
  const dentForm = document.getElementById('dentCareForm');
  if (dentForm) {
    const nameInput = document.getElementById('dentName');
    const emailInput = document.getElementById('dentEmail');
    const phoneInput = document.getElementById('dentPhone');
    const formTreatmentSelect = document.getElementById('dentTreatment');
    const dateInput = document.getElementById('dentDate');
    const notesInput = document.getElementById('dentNotes');

    const successCard = document.getElementById('dentSuccessAlert');
    const summaryText = document.getElementById('dentSuccessSummary');
    const resetBtn = document.getElementById('dentResetBtn');

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
      const field = input.closest('.form-row-field');
      if (!field) return true;
      if (!valid) {
        field.classList.add('has-error');
        return false;
      } else {
        field.classList.remove('has-error');
        return true;
      }
    }

    [nameInput, emailInput, phoneInput, formTreatmentSelect, dateInput].forEach(inp => {
      if (!inp) return;
      inp.addEventListener('input', () => {
        const field = inp.closest('.form-row-field');
        if (field) field.classList.remove('has-error');
      });
      inp.addEventListener('change', () => {
        const field = inp.closest('.form-row-field');
        if (field) field.classList.remove('has-error');
      });
    });

    dentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkField(nameInput, nameInput.value.trim().length >= 2);
      const isEmailValid = checkField(emailInput, validateEmail(emailInput.value.trim()));
      const isPhoneValid = checkField(phoneInput, phoneInput.value.trim().length >= 7);
      const isTreatmentValid = checkField(formTreatmentSelect, formTreatmentSelect.value !== '');
      const isDateValid = checkField(dateInput, dateInput.value !== '');

      if (isNameValid && isEmailValid && isPhoneValid && isTreatmentValid && isDateValid) {
        summaryText.innerHTML = `
          We have generated your demo appointment consultation for <strong>${escapeHtml(nameInput.value.trim())}</strong>.<br>
          • <strong>Treatment:</strong> ${escapeHtml(formTreatmentSelect.value)}<br>
          • <strong>Preferred Date:</strong> ${escapeHtml(dateInput.value)}<br>
          • <strong>Contact:</strong> ${escapeHtml(phoneInput.value.trim())} · ${escapeHtml(emailInput.value.trim())}<br>
          • <strong>Clinical Notes:</strong> "${escapeHtml(notesInput.value.trim() || 'New patient standard consultation')}"
        `;

        successCard.style.display = 'block';
        successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const firstErr = dentForm.querySelector('.has-error input, .has-error select');
        if (firstErr) firstErr.focus();
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        dentForm.reset();
        successCard.style.display = 'none';
      });
    }
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
});
