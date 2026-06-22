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

  /* ---- 사이드 도트네비 ↔ 섹션 연동 ----
     .section-stats 처럼 "section" 클래스가 없는 섹션도 잡히도록
     클래스 대신 <section id="..."> 태그 자체를 기준으로 선택 */
  const sections = document.querySelectorAll('section[id]');
  const sideNavItems = document.querySelectorAll('.side-nav__item');

  if (sections.length && sideNavItems.length) {
    /* 섹션 높이가 서로 달라(예: Brand Story는 짧음) 여러 섹션이
       동시에 threshold를 넘기는 경우가 있어, 항상 "가장 많이 보이는"
       섹션 하나만 active로 선택한다. */
    const visibleRatios = new Map();

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let activeId = null;
        let maxRatio = 0;
        visibleRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeId = id;
          }
        });

        if (activeId) {
          sideNavItems.forEach((item) => {
            item.classList.toggle('active', item.dataset.section === activeId);
          });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
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
