/* ============================================
   PETBALANCE — Navigation Behavior
   스크롤 상태 / 햄버거-메가메뉴 토글 / 언어 버튼
   ============================================ */
(function () {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const megaMenu = document.getElementById('megaMenu');
  const langToggle = document.getElementById('langToggle');

  if (!nav || !hamburger || !megaMenu) return;

  /* ---- 스크롤 시 상단바 배경/그림자 ---- */
  const SCROLL_THRESHOLD = 20;

  function handleScroll() {
    nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- 햄버거 ↔ 메가메뉴 ---- */
  function closeMega() {
    hamburger.classList.remove('active');
    megaMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  function toggleMega() {
    const isActive = hamburger.classList.toggle('active');
    megaMenu.classList.toggle('active', isActive);
    hamburger.setAttribute('aria-expanded', String(isActive));
    document.body.classList.toggle('no-scroll', isActive);
  }

  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.addEventListener('click', toggleMega);

  megaMenu.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav__mega-link')) {
      closeMega();
    }
  });

  document.addEventListener('click', (event) => {
    const isOutside =
      !megaMenu.contains(event.target) && !hamburger.contains(event.target);

    if (megaMenu.classList.contains('active') && isOutside) {
      closeMega();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMega();
  });

  /* ---- 언어 전환 버튼 (UI 토글, 실제 i18n 라우팅은 추후 연결) ---- */
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const isKor = langToggle.textContent.trim().startsWith('KOR');
      const label = langToggle.lastChild;

      if (label) {
        label.textContent = isKor ? ' ENG' : ' KOR';
      }

      document.documentElement.lang = isKor ? 'en' : 'ko';
    });
  }
})();
