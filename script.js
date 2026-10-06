// ===== 김민기 소개 페이지 상호작용 =====

// ----- 움직임 줄이기 스위치 -----
const motionToggle = document.getElementById('motionToggle');
const root = document.documentElement;

const storedMotion = localStorage.getItem('reduce-motion');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reduceMotion = storedMotion !== null ? storedMotion === 'true' : prefersReduced;

function applyMotion(reduce) {
  root.classList.toggle('reduce-motion', reduce);
  motionToggle.setAttribute('aria-checked', String(reduce));
  localStorage.setItem('reduce-motion', String(reduce));
}
applyMotion(reduceMotion);

motionToggle.addEventListener('click', () => {
  applyMotion(!root.classList.contains('reduce-motion'));
});

// ----- 강점 아코디언 -----
document.querySelectorAll('.acc-btn').forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.classList.toggle('open', !expanded);
  });
});

// ----- 강점 알약을 누르면 해당 카드도 함께 열기 -----
document.querySelectorAll('.strength-pills a').forEach((pill) => {
  pill.addEventListener('click', () => {
    const card = document.querySelector(pill.getAttribute('href'));
    const btn = card?.querySelector('.acc-btn');
    if (btn && btn.getAttribute('aria-expanded') === 'false') btn.click();
  });
});

// ----- 인사 바꾸기 (버디) -----
const greetings = [
  '안녕하세요!',
  '만나서 반가워요',
  '오늘도 잘 부탁해요',
  '같이 만들어 볼까요?',
  '차 한 잔 하실래요?',
];
const buddy = document.getElementById('buddy');
const buddyText = document.getElementById('buddyText');
let greetIndex = 0;

buddy.addEventListener('click', () => {
  greetIndex = (greetIndex + 1) % greetings.length;
  buddyText.textContent = greetings[greetIndex];
  buddyText.classList.remove('pop');
  void buddyText.offsetWidth; // 애니메이션 다시 재생
  buddyText.classList.add('pop');
});

// ----- 스크롤 등장 -----
const revealTargets = document.querySelectorAll(
  '.section-head, .acc, .like-cloud li, .scope-card, .link-card, .hero-panel'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

if (root.classList.contains('reduce-motion') || !('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  revealTargets.forEach((el) => io.observe(el));
}

// ----- 푸터 연도 -----
document.getElementById('year').textContent = new Date().getFullYear();
