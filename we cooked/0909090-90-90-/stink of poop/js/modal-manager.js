// Unified Modal Manager for SEE MORE INFORMATION
// Handles 3D modals across inventory/set-ups/mm pages

// Global modal elements (assumes consistent IDs)
const MODAL_ID = '3d-modal'; // fallback ID
const INVENTORY_MODAL_ID = 'inventory-3d-modal';
const VIEWER_ID = 'setup-viewer'; // or 'inventory-viewer'
const TITLE_ID = 'modal-title';
const DESC_ID = 'modal-desc';
const IMG_ID = 'modal-img';
const CLOSE_ID = 'close-modal';

// Polyfill for <dialog> support
if (!window.HTMLDialogElement) {
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-modal-open]')) {
      const modal = document.getElementById(e.target.dataset.modalOpen);
      if (modal) modal.style.display = 'flex';
    }
    if (e.target.matches('[data-modal-close]')) {
      const modal = document.getElementById(e.target.dataset.modalClose);
      if (modal) modal.style.display = 'none';
    }
  });
}

// Unified open function
window.open3DModal = function(src, title, desc = '', imgSrc = '') {
  const modal = document.getElementById(INVENTORY_MODAL_ID) || document.getElementById(MODAL_ID);
  const viewer = document.getElementById('inventory-viewer') || document.getElementById(VIEWER_ID);
  const titleEl = document.getElementById(TITLE_ID);
  const descEl = document.getElementById(DESC_ID);
  const imgEl = document.getElementById(IMG_ID);

  if (!modal) {
    console.error('Modal not found. Expected ID:', INVENTORY_MODAL_ID, 'or', MODAL_ID);
    return;
  }

  // Set content
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.innerHTML = desc.replace(/\n/g, '<br>');
  if (viewer && src) {
    viewer.src = src;
    viewer.addEventListener('load', () => console.log('Model loaded:', src));
  }
  if (imgEl && imgSrc) {
    imgEl.src = imgSrc;
    imgEl.style.display = 'block';
  }

  // Show modal
  if (modal.showModal) {
    modal.showModal();
  } else {
    modal.style.display = 'flex';
    modal.setAttribute('open', 'true');
  }

  // Focus management
  (titleEl || modal).focus();
};

// Unified close
window.close3DModal = function() {
  const modal = document.getElementById(INVENTORY_MODAL_ID) || document.getElementById(MODAL_ID);
  if (!modal) return;

  if (modal.close) {
    modal.close();
  } else {
    modal.style.display = 'none';
    modal.removeAttribute('open');
  }
};

// Init handlers (call once per page)
window.initModalHandlers = function() {
  // Close buttons
  document.querySelectorAll('[data-modal-close], #close-modal, #close-inventory-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      close3DModal();
    });
  });

  // Outside click
  document.addEventListener('click', (e) => {
    const modal = document.getElementById(INVENTORY_MODAL_ID) || document.getElementById(MODAL_ID);
    const content = modal?.querySelector('.modal-content');
    if (modal?.open && !content?.contains(e.target) && !e.target.closest('model-viewer')) {
      close3DModal();
    }
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      close3DModal();
      // Exit fullscreen if active
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  });

  // Fullscreen model-viewer handlers
  document.addEventListener('fullscreenchange', () => {
    const viewers = document.querySelectorAll('model-viewer');
    viewers.forEach(viewer => {
      const btns = viewer.querySelectorAll('.mv-fullscreen-btn svg');
      if (document.fullscreenElement) {
        btns[1]?.style.setProperty('display', 'block', 'important');
        btns[0]?.style.setProperty('display', 'none', 'important');
      } else {
        btns[0]?.style.setProperty('display', 'block', 'important');
        btns[1]?.style.setProperty('display', 'none', 'important');
      }
    });
  });

  console.log('Modal handlers initialized');
};

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', initModalHandlers);

// Export for older browsers
if (typeof module !== 'undefined') {
  module.exports = { open3DModal, close3DModal, initModalHandlers };
}

