/**
 * HVAC PRO — AUSTIN, TEXAS
 * Vanilla JavaScript: Mobile Menu, Cost Calculator, Form Validation, Smooth Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('hvacYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta-btn');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 3. Service Cards Quick-Select
  const serviceActionLinks = document.querySelectorAll('.service-action-link');
  const hvacServiceSelect = document.getElementById('hvacService');

  serviceActionLinks.forEach(link => {
    link.addEventListener('click', () => {
      const serviceName = link.getAttribute('data-service');
      if (serviceName && hvacServiceSelect) {
        hvacServiceSelect.value = serviceName;
      }
    });
  });

  // 4. Instant HVAC Estimate Tool
  const homeSqftSelect = document.getElementById('homeSqft');
  const serviceCategorySelect = document.getElementById('serviceCategory');
  const efficiencyTierSelect = document.getElementById('efficiencyTier');
  const calcBtn = document.getElementById('calcBtn');
  const estimateOutput = document.getElementById('estimateOutput');
  const estimateDetails = document.getElementById('estimateDetails');
  const applyEstimateBtn = document.getElementById('applyEstimateBtn');
  const hvacMessageArea = document.getElementById('hvacMessage');

  function calculateEstimate() {
    const sqft = parseInt(homeSqftSelect.value, 10);
    const service = serviceCategorySelect.value;
    const tier = efficiencyTierSelect.value;

    let baseLow = 0;
    let baseHigh = 0;
    let detailMsg = '';

    if (service === 'tuneup') {
      baseLow = 89;
      baseHigh = 149;
      detailMsg = 'Full 24-point seasonal inspection, electrical diagnostics, coil check, and drain clearing.';
    } else if (service === 'repair') {
      baseLow = 175;
      baseHigh = 480;
      detailMsg = 'Standard diagnostic and common component repairs (capacitor, contactor, or sensor adjustment).';
    } else if (service === 'iaq') {
      baseLow = 850;
      baseHigh = 1650;
      detailMsg = 'Whole-home media air cleaner or UV-C germicidal disinfection system integrated into air handler.';
    } else {
      // Full replacement
      if (sqft <= 1200) {
        baseLow = 5400;
        baseHigh = 7200;
      } else if (sqft <= 1800) {
        baseLow = 6800;
        baseHigh = 8900;
      } else if (sqft <= 2600) {
        baseLow = 8500;
        baseHigh = 11200;
      } else {
        baseLow = 11800;
        baseHigh = 15900;
      }

      if (tier === 'high') {
        baseLow = Math.round(baseLow * 1.25);
        baseHigh = Math.round(baseHigh * 1.25);
        detailMsg = 'Includes high-efficiency 16+ SEER2 two-stage heat pump, load balance, and smart thermostat.';
      } else if (tier === 'premium') {
        baseLow = Math.round(baseLow * 1.5);
        baseHigh = Math.round(baseHigh * 1.55);
        detailMsg = 'Includes ultra-quiet variable-speed inverter system, maximum electric bill reduction, and 10-year parts warranty.';
      } else {
        detailMsg = 'Includes reliable 14.3 SEER2 single-stage heat pump or AC system with digital control.';
      }
    }

    estimateOutput.textContent = `$${baseLow.toLocaleString()} – $${baseHigh.toLocaleString()}`;
    estimateDetails.textContent = detailMsg;
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', calculateEstimate);
    [homeSqftSelect, serviceCategorySelect, efficiencyTierSelect].forEach(sel => {
      sel.addEventListener('change', calculateEstimate);
    });
  }

  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener('click', () => {
      const currentRange = estimateOutput.textContent;
      const serviceText = serviceCategorySelect.options[serviceCategorySelect.selectedIndex].text;
      
      if (hvacMessageArea) {
        hvacMessageArea.value = `Online Ballpark Estimate: ${currentRange} (${serviceText}, approx. ${homeSqftSelect.value} sq ft).`;
      }
      if (hvacServiceSelect) {
        const cat = serviceCategorySelect.value;
        if (cat === 'install') hvacServiceSelect.value = 'AC Installation';
        else if (cat === 'repair') hvacServiceSelect.value = 'AC Repair';
        else if (cat === 'tuneup') hvacServiceSelect.value = 'HVAC Maintenance';
        else if (cat === 'iaq') hvacServiceSelect.value = 'Indoor Air Quality';
      }
    });
  }

  // 5. Quote Form Validation
  const hvacForm = document.getElementById('hvacQuoteForm');
  if (hvacForm) {
    const nameInput = document.getElementById('hvacName');
    const emailInput = document.getElementById('hvacEmail');
    const phoneInput = document.getElementById('hvacPhone');
    const serviceSelect = document.getElementById('hvacService');
    const citySelect = document.getElementById('hvacCity');
    const messageInput = document.getElementById('hvacMessage');

    const successBox = document.getElementById('hvacSuccessMsg');
    const summaryText = document.getElementById('hvacSummaryText');
    const resetBtn = document.getElementById('hvacResetBtn');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkField(input, valid) {
      const wrap = input.closest('.field-wrap');
      if (!wrap) return true;
      if (!valid) {
        wrap.classList.add('has-error');
        return false;
      } else {
        wrap.classList.remove('has-error');
        return true;
      }
    }

    [nameInput, emailInput, phoneInput, serviceSelect].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        const wrap = input.closest('.field-wrap');
        if (wrap) wrap.classList.remove('has-error');
      });
      input.addEventListener('change', () => {
        const wrap = input.closest('.field-wrap');
        if (wrap) wrap.classList.remove('has-error');
      });
    });

    hvacForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkField(nameInput, nameInput.value.trim().length >= 2);
      const isEmailValid = checkField(emailInput, validateEmail(emailInput.value.trim()));
      const isPhoneValid = checkField(phoneInput, phoneInput.value.trim().length >= 7);
      const isServiceValid = checkField(serviceSelect, serviceSelect.value !== '');

      if (isNameValid && isEmailValid && isPhoneValid && isServiceValid) {
        summaryText.innerHTML = `
          <strong>Demo Quote Prepared for:</strong> ${nameInput.value.trim()}<br>
          • <strong>Phone:</strong> ${phoneInput.value.trim()} · <strong>Email:</strong> ${emailInput.value.trim()}<br>
          • <strong>Service:</strong> ${serviceSelect.value} in ${citySelect.value}, TX<br>
          • <strong>Notes:</strong> ${messageInput.value.trim() || 'Standard diagnostic consultation requested'}
        `;

        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const firstErr = hvacForm.querySelector('.has-error input, .has-error select');
        if (firstErr) firstErr.focus();
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        hvacForm.reset();
        successBox.style.display = 'none';
      });
    }
  }
});
