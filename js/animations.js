/* ============================================
   PETBALANCE — Scroll Animations
   IntersectionObserver: fade-up/fade-in 노출 + 사이드 도트네비 연동
   ============================================ */
(function () {
  /* ---- fade-up / fade-in 스크롤 노출 ---- */
  const revealEls = document.querySelectorAll('.fade-up, .fade-in');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---- 사이드 도트네비 ↔ 4섹션 연동 ---- */
  const sections = document.querySelectorAll('.section[id]');
  const sideNavItems = document.querySelectorAll('.side-nav__item');

  if (sections.length && sideNavItems.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sideNavItems.forEach((item) => {
              item.classList.toggle(
                'active',
                item.dataset.section === entry.target.id
              );
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    sideNavItems.forEach((item) => {
      item.addEventListener('click', () => {
        const target = document.getElementById(item.dataset.section);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
})();
