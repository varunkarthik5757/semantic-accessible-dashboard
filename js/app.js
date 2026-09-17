document.addEventListener('DOMContentLoaded', () => {
  /* =========================================================================
     Sidebar Toggle
     ========================================================================= */
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.app-sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      const isActive = sidebar.classList.contains('active');
      sidebarToggle.setAttribute('aria-expanded', isActive);
    });
  }

  /* =========================================================================
     Accessible Modal Dialog (Focus Trap, Esc to close, Return Focus)
     ========================================================================= */
  const modalOverlay = document.getElementById('example-modal');
  const triggerModal = document.getElementById('trigger-modal');
  const triggerModalNavForms = document.querySelectorAll('button[aria-haspopup="dialog"]'); // handles multiple triggers
  const closeModalBtns = document.querySelectorAll('.modal-close, #close-modal-footer, #confirm-modal');
  
  let previouslyFocusedElement = null;

  function openModal(triggerElement) {
    previouslyFocusedElement = triggerElement;
    modalOverlay.classList.add('active');
    triggerElement.setAttribute('aria-expanded', 'true');
    
    // Find focusable elements
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements = modalOverlay.querySelectorAll(focusableElementsString);
    focusableElements = Array.prototype.slice.call(focusableElements);
    
    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];

    // Focus first element
    if (firstTabStop) {
      firstTabStop.focus();
    }

    // Trap focus
    modalOverlay.addEventListener('keydown', trapTabKey);
    
    function trapTabKey(e) {
      if (e.keyCode === 9) { // Tab
        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
          }
        } else { // Tab
          if (document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
          }
        }
      }
      
      if (e.keyCode === 27) { // Escape
        closeModal();
      }
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    if (previouslyFocusedElement) {
      previouslyFocusedElement.setAttribute('aria-expanded', 'false');
      previouslyFocusedElement.focus();
    }
  }

  // Event Listeners for Modals
  triggerModalNavForms.forEach(btn => {
    btn.addEventListener('click', (e) => {
      openModal(e.currentTarget);
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  /* =========================================================================
     Form Validation Demonstration (for forms.html)
     ========================================================================= */
  const profileForm = document.getElementById('profile-form');
  const firstNameInput = document.getElementById('first-name');
  const fnameError = document.getElementById('fname-error');

  if (profileForm && firstNameInput && fnameError) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      
      // Basic validation for first name
      if (!firstNameInput.value.trim()) {
        isValid = false;
        firstNameInput.setAttribute('aria-invalid', 'true');
        fnameError.style.display = 'block';
        firstNameInput.focus();
      } else {
        firstNameInput.removeAttribute('aria-invalid');
        fnameError.style.display = 'none';
      }

      if (isValid) {
        // Success case (in a real app, this would submit the data)
        alert('Form submitted successfully!');
        profileForm.reset();
      }
    });

    // Clear error on input
    firstNameInput.addEventListener('input', () => {
      if (firstNameInput.hasAttribute('aria-invalid')) {
        firstNameInput.removeAttribute('aria-invalid');
        fnameError.style.display = 'none';
      }
    });
  }
});
