/* ============================================
   PETBALANCE — Sliders
   Swiper.js: ESG 보호소 카드 슬라이드
   ============================================ */
(function () {
  if (typeof Swiper === 'undefined') return;

  const esgSwiperEl = document.querySelector('.esg-swiper');
  if (!esgSwiperEl) return;

  new Swiper(esgSwiperEl, {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: '.esg-swiper .swiper-pagination',
      clickable: true,
    },
  });
})();
