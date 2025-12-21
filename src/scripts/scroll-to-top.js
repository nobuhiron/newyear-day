/**
 * Scroll to top button functionality
 * Shows/hides button based on scroll position and handles smooth scroll
 */
export function initScrollToTop() {
  try {
    const button = document.getElementById('scroll-to-top');
    if (!button) {
      return;
    }

    // 表示するスクロール位置の閾値（px）
    const SCROLL_THRESHOLD = 400;

    function handleScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollY > SCROLL_THRESHOLD) {
        button.classList.add('is-visible');
      } else {
        button.classList.remove('is-visible');
      }
    }

    function scrollToTop(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    // スクロールイベントリスナー
    window.addEventListener('scroll', handleScroll, { passive: true });

    // クリックイベントリスナー
    button.addEventListener('click', scrollToTop);

    // 初回チェック
    handleScroll();
  } catch (error) {
    // Error handling: scroll to top initialization failed
    // Fail silently in production to avoid console noise
  }
}

