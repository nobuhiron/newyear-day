/**
 * Navigation menu functionality
 * Handles mobile hamburger menu toggle
 */
export function initNavMenu() {
  try {
    const hero = document.querySelector('.p-section-hero');
    const nav = document.querySelector('.p-block-nav-mobile');
    const hamburger = document.querySelector('[data-nav-toggle]');
    const navLinks = nav?.querySelectorAll('.p-block-nav-mobile__link');

    if (!hero || !nav || !hamburger) {
      return;
    }

  let scrollPosition = 0;

  function openNav() {
    // 現在のスクロール位置を保存
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    hero.classList.add('is-nav-open');
    nav.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'メニューを閉じる');

    // bodyとhtmlのスクロールを無効化し、スクロール位置を固定
    // position: fixedとtopで視覚的に同じ位置を維持
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.style.left = '0';
    document.body.style.right = '0';
  }

  function closeNav() {
    hero.classList.remove('is-nav-open');
    nav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'メニューを開く');

    // スクロールを有効化（アニメーションなしで元の位置に戻す）
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.left = '';
    document.body.style.right = '';

    // アニメーションなしで元のスクロール位置に戻す
    window.scrollTo({
      top: scrollPosition,
      behavior: 'auto',
    });
  }

  function toggleNav() {
    if (nav.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  // Hamburger button click
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleNav();
  });

  // Close nav when clicking on nav links
  navLinks?.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  // Close nav when clicking on overlay (outside nav list)
  nav.addEventListener('click', (e) => {
    if (e.target === nav) {
      closeNav();
    }
  });

    // Close nav on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
      }
    });
  } catch (error) {
    // Error handling: navigation menu initialization failed
    // Fail silently in production to avoid console noise
  }
}

/**
 * Shipping Expandable Section functionality
 * Handles expanding/collapsing the shipping schedule section
 */

export function initShippingModal() {
  try {
    const section = document.getElementById('shipping');
    if (!section) {
      return;
    }

  const toggleButton = section.querySelector('.p-section-shipping__toggle');
  const closeButton = section.querySelector('.p-section-shipping__close');
  const content = section.querySelector('.p-section-shipping__content');
  const triggers = document.querySelectorAll('[data-modal-trigger="shipping"]');

  function expandSection() {
    section.classList.add('is-expanded');
    toggleButton?.setAttribute('aria-expanded', 'true');

    // Calculate and set dynamic max-height based on content
    if (content) {
      const contentHeight = content.scrollHeight;
      content.style.maxHeight = `${contentHeight}px`;
    }

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

    // Reset max-height to 0
    if (content) {
      content.style.maxHeight = '0';
    }
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

    // Close section on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && section.classList.contains('is-expanded')) {
        collapseSection();
        // Scroll back to preview
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  } catch (error) {
    // Error handling: shipping modal initialization failed
    // Fail silently in production to avoid console noise
  }
}
