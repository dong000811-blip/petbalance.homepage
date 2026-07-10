/* ============================================
   PETBALANCE — Hero Scroll Scrub Animation
   GSAP ScrollTrigger: 스크롤 진행률에 연동해 영상 확대 + 오버레이 진해짐 (타이틀 텍스트는 고정)
   ============================================ */
(function () {
  function initHeroScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (!document.getElementById('hero')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      /* 모바일: pin 없이 가벼운 scrub으로 오버레이만 진하게 (터치 스크롤 버벅임 방지) */
      gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '+=60%',
          scrub: 0.5,
        },
      })
        .to('.hero__overlay', { opacity: 0.85, ease: 'none' }, 0);
      return;
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })
      .to('.hero__video, .hero__bg', { scale: 1.15, ease: 'none' }, 0)
      .to('.hero__overlay', { opacity: 0.85, ease: 'none' }, 0);
  }

  if (document.readyState === 'complete') {
    initHeroScroll();
  } else {
    window.addEventListener('load', initHeroScroll);
  }
})();
