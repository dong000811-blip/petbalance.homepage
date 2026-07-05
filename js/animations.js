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

// ── ESG: 파트너 마퀴 렌더링 (원본 리스트를 JS 배열로 관리, CMS 연동 대비) ──
(function () {
  const track = document.getElementById('esgMarqueeTrack');
  if (!track) return;

  const PARTNERS = [
    '🏠 행복한발바닥 보호소',
    '🐕 서울유기동물센터',
    '🐾 부산동물사랑',
    '🌿 경기도유기동물협회',
    '💚 인천보호소연합',
    '🏥 대전펫케어',
    '🤝 광주생명나눔',
    '🌊 제주도동물센터',
    '⛰ 강원보호협회',
    '🌾 전북유기동물',
    '💫 충남펫보호',
    '🎗 울산반려동물센터',
  ];

  // 실제 로고 이미지 확보 시 renderItem 내부 <span> 을 <img> 로 교체하면
  // css/sections.css의 .esg-partner-item__icon 그레이스케일→컬러 호버가 그대로 적용됨
  const renderItem = (text, isClone) => {
    const [icon, ...nameParts] = text.split(' ');
    const item = document.createElement('div');
    item.className = 'esg-partner-item';
    if (isClone) item.setAttribute('aria-hidden', 'true');
    item.innerHTML = `<span class="esg-partner-item__icon">${icon}</span> ${nameParts.join(' ')}`;
    return item;
  };

  // 무한 루프 시각 효과를 위해 원본 세트를 그대로 한 번 더 복제한다.
  // 복제본은 스크린리더에 중복 낭독되지 않도록 aria-hidden 처리.
  PARTNERS.forEach((text) => track.appendChild(renderItem(text, false)));
  PARTNERS.forEach((text) => track.appendChild(renderItem(text, true)));
})();

// ── ESG: 임팩트 카운터 (CONFIG 객체 기반, 추후 CMS 연동 대비) ──
(function () {
  const ESG_STATS_CONFIG = [
    { key: 'feed', count: 4000, unit: 'kg+', label: '누적 사료 후원' },
    { key: 'shelter', count: 21, unit: '개소', label: '제휴 보호소' },
    { key: 'people', count: 10000, unit: '명+', label: '함께한 이웃' },
  ];

  const items = document.querySelectorAll('.esg-impact__item[data-stat]');
  if (items.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const easeOutExpo = (progress) =>
    progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

  const animate = (el, target) => {
    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString();
      return;
    }
    const duration = 2000;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(easeOutExpo(progress) * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  };

  const counters = [];

  items.forEach((item) => {
    const stat = ESG_STATS_CONFIG.find((s) => s.key === item.dataset.stat);
    if (!stat) return;

    const num = document.createElement('div');
    num.className = 'esg-impact__num';
    num.textContent = '0';

    const unit = document.createElement('div');
    unit.className = 'esg-impact__unit';
    unit.textContent = stat.unit;

    const label = document.createElement('div');
    label.className = 'esg-impact__label';
    label.textContent = stat.label;

    item.append(num, unit, label);
    counters.push({ el: num, target: stat.count });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const match = counters.find((c) => c.el === entry.target);
      if (entry.isIntersecting && match) {
        animate(match.el, match.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach((c) => observer.observe(c.el));
})();

// ── ESG: 갤러리 오버레이 탭 토글 (모바일 — 호버 대신 탭으로 노출) ──
(function () {
  const items = document.querySelectorAll('.esg-gallery__item');
  if (items.length === 0) return;

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const wasActive = item.classList.contains('is-active');
      items.forEach((i) => i.classList.remove('is-active'));
      if (!wasActive) item.classList.add('is-active');
    });
  });

  document.addEventListener('click', (event) => {
    const isInsideGallery = Array.from(items).some((item) => item.contains(event.target));
    if (!isInsideGallery) {
      items.forEach((i) => i.classList.remove('is-active'));
    }
  });
})();
