/**
 * ESTATEFLOW — NEW YORK CITY REAL ESTATE
 * Vanilla JavaScript: Property Data, Multi-Criteria Filtering, Modal Viewport, Dual Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('estateYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu
  const mobileToggle = document.getElementById('estateMobileToggle');
  const mobileNav = document.getElementById('estateMobileNav');
  const mobileItems = document.querySelectorAll('.mobile-item, .mobile-cta');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    mobileItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 3. Complete 6 Fictional NYC Properties Dataset
  const propertiesData = [
    {
      id: 'madison-residence',
      name: 'The Madison Residence',
      borough: 'Manhattan',
      address: '740 Madison Ave, Upper East Side, Manhattan',
      price: 1250000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1850,
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      description: 'A sun-drenched pre-war residence featuring herringbone white oak floors, high ceilings, custom millwork, and private keyed elevator access just moments from Central Park.',
      amenities: [
        '24/7 Attended Doorman & Concierge',
        'Private Keyed Elevator Access',
        'Herringbone White Oak Flooring',
        'Chef\'s Kitchen with Miele Appliances',
        'Custom Built-In Storage Solutions',
        'Private Basement Storage Unit'
      ]
    },
    {
      id: 'brooklyn-heights-house',
      name: 'Brooklyn Heights House',
      borough: 'Brooklyn',
      address: '42 Willow Street, Brooklyn Heights, Brooklyn',
      price: 985000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2200,
      type: 'House',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      description: 'A classic Anglo-Italianate brick and brownstone residence with lush private landscaped garden, working wood-burning fireplaces, and sweeping tree-lined street views.',
      amenities: [
        'Private Landscaped Backyard & Patio',
        'Working Wood-Burning Fireplaces',
        'Original Restored Crown Molding',
        'Full Finished Garden Level Suite',
        'Sub-Zero Wine Storage Cellar',
        'Steps to Brooklyn Promenade'
      ]
    },
    {
      id: 'park-avenue-penthouse',
      name: 'Park Avenue Penthouse',
      borough: 'Upper West Side',
      address: '380 Central Park West, Upper West Side, NY',
      price: 2400000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2750,
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      description: 'An exceptional full-floor architectural penthouse with wrap-around private terrace, panoramic park views, marble bathrooms, and soaring double-height salon ceilings.',
      amenities: [
        '900 Sq Ft Wrap-Around Terrace',
        'Direct Panoramic Central Park Views',
        'Calacatta Gold Marble Bathrooms',
        'Smart Lutron Lighting & Motorized Shades',
        'Private Resident Wellness Spa',
        'Deeded On-Site Garage Parking'
      ]
    },
    {
      id: 'williamsburg-loft',
      name: 'The Williamsburg Loft',
      borough: 'Brooklyn',
      address: '88 North 6th Street, Williamsburg, Brooklyn',
      price: 795000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1450,
      type: 'Loft',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      description: 'Authentic industrial timber-and-brick loft in the heart of North Williamsburg. 13-foot timber ceilings, cast-iron columns, oversized casement windows, and private roof cabana.',
      amenities: [
        '13-Foot Exposed Timber Ceilings',
        'Oversized Steel Casement Windows',
        'Private Deeded Rooftop Cabana',
        'Exposed Historic Brickwork',
        'Industrial Gas Range & Island',
        'In-Unit Washer & Vented Dryer'
      ]
    },
    {
      id: 'queens-garden-residence',
      name: 'Queens Garden Residence',
      borough: 'Queens',
      address: '71 Burns Street, Forest Hills Gardens, Queens',
      price: 675000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1700,
      type: 'House',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      description: 'Charming Tudor-style single-family home in picturesque Forest Hills. Private front courtyard, attached garage, sunroom, and quick 15-minute express transit to Midtown.',
      amenities: [
        'Private Sunroom & Enclosed Porch',
        'Attached Garage & Private Driveway',
        'Original Stained Glass Windows',
        'Spacious Chef\'s Country Kitchen',
        'Private Community Security Patrol',
        'Walking Distance to Express E/F Trains'
      ]
    },
    {
      id: 'manhattan-studio-collection',
      name: 'Manhattan Studio Collection',
      borough: 'Manhattan',
      address: '215 East 24th Street, Gramercy, Manhattan',
      price: 485000,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 720,
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      description: 'Thoughtfully planned alcove one-bedroom apartment in vibrant Gramercy. Custom Italian Murphy bed cabinetry, breakfast bar, renovated bathroom, and common rooftop deck.',
      amenities: [
        'Custom Integrated Murphy Bed & Desk',
        'Designer Kitchen with Quartz Counters',
        'Landscaped Common Roof Deck',
        'Live-In Resident Superintendent',
        'Co-op Subletting Permitted',
        'Low Monthly Maintenance Fees'
      ]
    }
  ];

  // 4. Render Property Cards
  const listingsGrid = document.getElementById('listingsGrid');
  const resultsCount = document.getElementById('resultsCount');
  const noResultsState = document.getElementById('noResultsState');

  // Search & Filter Inputs
  const filterLocation = document.getElementById('filterLocation');
  const filterType = document.getElementById('filterType');
  const filterMinPrice = document.getElementById('filterMinPrice');
  const filterMaxPrice = document.getElementById('filterMaxPrice');
  const searchSubmitBtn = document.getElementById('searchSubmitBtn');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const locationTabs = document.querySelectorAll('.tab-btn');

  let activeFilters = {
    location: 'all',
    type: 'all',
    minPrice: 0,
    maxPrice: 99999999
  };

  function formatPrice(val) {
    return '$' + val.toLocaleString('en-US');
  }

  function renderListings(properties) {
    if (!listingsGrid) return;

    if (properties.length === 0) {
      listingsGrid.innerHTML = '';
      if (noResultsState) noResultsState.style.display = 'block';
      if (resultsCount) resultsCount.textContent = 'Showing 0 properties';
      return;
    }

    if (noResultsState) noResultsState.style.display = 'none';
    if (resultsCount) resultsCount.textContent = `Showing ${properties.length} of ${propertiesData.length} properties`;

    listingsGrid.innerHTML = properties.map(p => `
      <article class="listing-card" data-id="${p.id}">
        <div class="listing-image-wrap">
          <img 
            src="${p.image}" 
            alt="${p.name} — ${p.borough} residence" 
            class="listing-photo"
            loading="lazy"
          >
          <span class="listing-badge">${p.type}</span>
          <span class="listing-price-tag">${formatPrice(p.price)}</span>
        </div>
        <div class="listing-body">
          <span class="listing-borough">${p.borough}</span>
          <h3 class="listing-title">${p.name}</h3>
          
          <div class="listing-specs">
            <span class="spec-item"><strong>${p.bedrooms}</strong> beds</span>
            <span class="spec-dot">·</span>
            <span class="spec-item"><strong>${p.bathrooms}</strong> baths</span>
            <span class="spec-dot">·</span>
            <span class="spec-item"><strong>${p.sqft.toLocaleString()}</strong> sq ft</span>
          </div>

          <div class="listing-action-row">
            <button type="button" class="view-details-btn" data-property-id="${p.id}">
              View Details ↗
            </button>
            <span class="type-indicator">${p.borough}</span>
          </div>
        </div>
      </article>
    `).join('');

    // Wire "View Details" buttons
    const detailButtons = listingsGrid.querySelectorAll('.view-details-btn');
    detailButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const propId = btn.getAttribute('data-property-id');
        const property = propertiesData.find(p => p.id === propId);
        if (property) openPropertyModal(property);
      });
    });
  }

  function applyFilters() {
    const filtered = propertiesData.filter(p => {
      const matchLoc = activeFilters.location === 'all' || p.borough.toLowerCase() === activeFilters.location.toLowerCase();
      const matchType = activeFilters.type === 'all' || p.type.toLowerCase() === activeFilters.type.toLowerCase();
      const matchMin = p.price >= activeFilters.minPrice;
      const matchMax = p.price <= activeFilters.maxPrice;
      return matchLoc && matchType && matchMin && matchMax;
    });

    renderListings(filtered);
  }

  // Location tabs click
  locationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      locationTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const loc = tab.getAttribute('data-location');
      activeFilters.location = loc;
      if (filterLocation) filterLocation.value = loc;
      applyFilters();
    });
  });

  // Top search bar submit
  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', () => {
      activeFilters.location = filterLocation.value;
      activeFilters.type = filterType.value;
      activeFilters.minPrice = parseInt(filterMinPrice.value, 10);
      activeFilters.maxPrice = parseInt(filterMaxPrice.value, 10);

      // Sync tabs
      locationTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-location').toLowerCase() === activeFilters.location.toLowerCase());
      });

      applyFilters();

      // Smooth scroll to listings
      const propsSec = document.getElementById('properties');
      if (propsSec) propsSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function resetAllFilters() {
    activeFilters = {
      location: 'all',
      type: 'all',
      minPrice: 0,
      maxPrice: 99999999
    };
    if (filterLocation) filterLocation.value = 'all';
    if (filterType) filterType.value = 'all';
    if (filterMinPrice) filterMinPrice.value = '0';
    if (filterMaxPrice) filterMaxPrice.value = '99999999';

    locationTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-location') === 'all');
    });

    applyFilters();
  }

  if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
  if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', resetAllFilters);

  // Neighborhood cards quick-filter
  const neighborhoodCards = document.querySelectorAll('.neighborhood-card');
  neighborhoodCards.forEach(card => {
    card.addEventListener('click', () => {
      const borough = card.getAttribute('data-filter-borough');
      if (borough) {
        activeFilters.location = borough;
        if (filterLocation) filterLocation.value = borough;
        locationTabs.forEach(tab => {
          tab.classList.toggle('active', tab.getAttribute('data-location').toLowerCase() === borough.toLowerCase());
        });
        applyFilters();

        const propsSec = document.getElementById('properties');
        if (propsSec) propsSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Footer borough links
  const boroughQuickLinks = document.querySelectorAll('.borough-quick');
  boroughQuickLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const borough = link.getAttribute('data-borough');
      if (borough) {
        activeFilters.location = borough;
        if (filterLocation) filterLocation.value = borough;
        locationTabs.forEach(tab => {
          tab.classList.toggle('active', tab.getAttribute('data-location').toLowerCase() === borough.toLowerCase());
        });
        applyFilters();
      }
    });
  });

  // 5. Property Details Modal
  const propertyModal = document.getElementById('propertyModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const inqMessage = document.getElementById('inqMessage');
  const inqLocation = document.getElementById('inqLocation');

  function openPropertyModal(p) {
    if (!propertyModal || !modalContent) return;

    modalContent.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="modal-photo">
      
      <div class="modal-title-row">
        <div>
          <span class="sub-label">${p.borough} · ${p.type}</span>
          <h2 class="modal-residence-name">${p.name}</h2>
          <p style="font-size: 0.85rem; color: #898983; margin-top: 2px;">${p.address}</p>
        </div>
        <div class="modal-price">${formatPrice(p.price)}</div>
      </div>

      <div class="modal-specs-strip">
        <span><strong>${p.bedrooms}</strong> Bedrooms</span>
        <span>·</span>
        <span><strong>${p.bathrooms}</strong> Bathrooms</span>
        <span>·</span>
        <span><strong>${p.sqft.toLocaleString()}</strong> Interior Sq Ft</span>
        <span>·</span>
        <span><strong>${p.type}</strong> Residence</span>
      </div>

      <p class="modal-desc">${p.description}</p>

      <div class="modal-amenities">
        <h4 class="amenities-heading">Residence Highlights & Amenities</h4>
        <ul class="amenities-list">
          ${p.amenities.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-tour-cta-box">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h4 style="font-family: var(--font-serif); font-size: 1.15rem; margin-bottom: 0.25rem;">Interested in ${p.name}?</h4>
            <p style="font-size: 0.82rem; color: #666;">Schedule a private appointment with our advisory team.</p>
          </div>
          <button type="button" class="btn btn-estate btn-sm" id="modalInquireBtn">
            Inquire on this Residence ↓
          </button>
        </div>
      </div>
    `;

    propertyModal.style.display = 'flex';
    propertyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook the modal inquiry button
    const modalInquireBtn = document.getElementById('modalInquireBtn');
    if (modalInquireBtn) {
      modalInquireBtn.addEventListener('click', () => {
        closeModal();
        if (inqMessage) inqMessage.value = `Inquiry regarding ${p.name} (${formatPrice(p.price)}) in ${p.borough}.`;
        if (inqLocation) inqLocation.value = p.borough;

        const formSec = document.getElementById('inquire-form');
        if (formSec) formSec.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function closeModal() {
    if (!propertyModal) return;
    propertyModal.style.display = 'none';
    propertyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && propertyModal && propertyModal.style.display === 'flex') {
      closeModal();
    }
  });

  // Initial render of all 6 properties
  renderListings(propertiesData);

  // 6. Dual Form Validation: Property Inquiry & Listing Inquiry
  function setupFormValidation(formId, successBoxId, summaryTextId, resetBtnId, isListingForm) {
    const form = document.getElementById(formId);
    if (!form) return;

    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const successBox = document.getElementById(successBoxId);
    const summaryText = document.getElementById(summaryTextId);
    const resetBtn = document.getElementById(resetBtnId);

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkField(input, valid) {
      const group = input.closest('.form-group');
      if (!group) return true;
      if (!valid) {
        group.classList.add('has-error');
        return false;
      } else {
        group.classList.remove('has-error');
        return true;
      }
    }

    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
      input.addEventListener('change', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkField(nameInput, nameInput.value.trim().length >= 2);
      const isEmailValid = checkField(emailInput, validateEmail(emailInput.value.trim()));
      let isPhoneValid = true;
      if (phoneInput) {
        isPhoneValid = checkField(phoneInput, phoneInput.value.trim().length >= 7);
      }

      let isCustomValid = true;
      if (isListingForm) {
        const locInput = form.querySelector('input[name="propertyLocation"]');
        const typeSelect = form.querySelector('select[name="propertyType"]');
        if (locInput) isCustomValid = isCustomValid && checkField(locInput, locInput.value.trim().length >= 2);
        if (typeSelect) isCustomValid = isCustomValid && checkField(typeSelect, typeSelect.value !== '');
      }

      if (isNameValid && isEmailValid && isPhoneValid && isCustomValid) {
        if (isListingForm) {
          const loc = form.querySelector('input[name="propertyLocation"]').value;
          const type = form.querySelector('select[name="propertyType"]').value;
          summaryText.innerHTML = `
            Listing valuation prepared for <strong>${nameInput.value.trim()}</strong>.<br>
            • <strong>Property:</strong> ${type} in ${loc}<br>
            • <strong>Contact:</strong> ${emailInput.value.trim()}
          `;
        } else {
          const loc = form.querySelector('select[name="location"]').value;
          const budget = form.querySelector('select[name="budget"]').value;
          summaryText.innerHTML = `
            Private viewing request prepared for <strong>${nameInput.value.trim()}</strong>.<br>
            • <strong>Target Borough:</strong> ${loc} · <strong>Budget:</strong> ${budget}<br>
            • <strong>Contact:</strong> ${phoneInput.value.trim()} · ${emailInput.value.trim()}
          `;
        }

        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const firstErr = form.querySelector('.has-error input, .has-error select');
        if (firstErr) firstErr.focus();
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        successBox.style.display = 'none';
      });
    }
  }

  setupFormValidation('inquiryForm', 'inquirySuccess', 'inquirySummaryText', 'inquiryResetBtn', false);
  setupFormValidation('listingForm', 'listingSuccess', 'listingSummaryText', 'listingResetBtn', true);
});
