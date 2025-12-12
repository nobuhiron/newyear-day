/**
 * Shipping Expandable Section functionality
 * Handles expanding/collapsing the shipping schedule section
 */

export function initShippingModal() {
  const section = document.getElementById('shipping');
  if (!section) return;

  const toggleButton = section.querySelector('.p-section-shipping__toggle');
  const closeButton = section.querySelector('.p-section-shipping__close');
  const content = section.querySelector('.p-section-shipping__content');
  const triggers = document.querySelectorAll('[data-modal-trigger="shipping"]');

  function expandSection() {
    section.classList.add('is-expanded');
    toggleButton?.setAttribute('aria-expanded', 'true');

    // Scroll to section if triggered from nav link
    if (document.activeElement?.hasAttribute('data-modal-trigger')) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  function collapseSection() {
    section.classList.remove('is-expanded');
    toggleButton?.setAttribute('aria-expanded', 'false');
  }

  function toggleSection() {
    if (section.classList.contains('is-expanded')) {
      collapseSection();
    } else {
      expandSection();
    }
  }

  // Toggle button
  toggleButton?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSection();
  });

  // Close button
  closeButton?.addEventListener('click', (e) => {
    e.preventDefault();
    collapseSection();
    // Scroll back to preview
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Trigger buttons/links (from SectionNav)
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (!section.classList.contains('is-expanded')) {
        expandSection();
      } else {
        // If already expanded, just scroll to it
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

