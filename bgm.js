// ===== BGM: 밍이뮤직하우스 채널 곡 랜덤·연속 재생 =====
// 채널 영상 ID 목록 — 새 곡을 올리면 여기에 ID를 추가하면 됩니다
const BGM_VIDEOS = [
  'XzVaZt1SUtQ', '2Cg3SAJSYek', 'zZNJzBf1IZo', 'nzJPLW7Q1WU',
  '2_xHrlp0C3g', 'l74aSQvRDis', 'swnUS7gCHZY', 'D3CAvyKLjhI',
  '1xZ8Lgn7Xbg', 'vDw5V3pSgs8', 'cxSYdVnnRpA', 'mZ2xUMd8OhM',
  'XT85cXAz4js', 'wmlCkUErEEo', 'cHaV5ROq8PI', 'ty2CNMmtW9g',
  'fKvlP8kYNDg', 'nx2d2N6FoPc', 'whyO4QtQdcY', 'p9BQZr0ZEso',
  'bbLrq3yP8JQ', 'QQkDRtB9dJo', '97SfV6JaJnQ', 'CqTPSBJGNnY',
  'CmFrIlC-AuQ', 'kKOTGhASCN0', '0aCoGMmS4eE', 'uy0jYzmOM2A',
  '8M4wcht2fbM', 'R0cyFWY8XI4',
];

const bgmChip = document.getElementById('bgmChip');
const bgmCard = document.getElementById('bgmCard');
const bgmFrame = document.getElementById('bgmFrame');
const bgmNext = document.getElementById('bgmNext');
const bgmClose = document.getElementById('bgmClose');
let bgmLast = -1;

function bgmShuffled() {
  return BGM_VIDEOS.slice().sort(() => Math.random() - 0.5);
}

function bgmPick(queue) {
  // 첫 곡은 이전과 다른 걸로
  let id;
  do { id = queue.shift(); } while (id === BGM_VIDEOS[bgmLast] && queue.length);
  return id;
}

function bgmPlay() {
  const queue = bgmShuffled();
  const first = bgmPick(queue);
  bgmLast = BGM_VIDEOS.indexOf(first);
  // playlist: 첫 곡 + 섞인 나머지 — 곡이 끝나면 다음 곡으로 이어지고 다 돌면 반복
  const list = [first, ...queue].join(',');
  bgmFrame.innerHTML =
    `<iframe src="https://www.youtube-nocookie.com/embed/${first}?autoplay=1&rel=0&loop=1&playlist=${list}"` +
    ` title="유튜브 음악 플레이어" allow="autoplay; encrypted-media; picture-in-picture" tabindex="-1"></iframe>`;
  bgmCard.hidden = false;
  bgmChip.setAttribute('aria-expanded', 'true');
  bgmChip.classList.add('playing');
  bgmChip.innerHTML = '<span class="bgm-note" aria-hidden="true">♪</span> 재생 중';
}

function bgmStop() {
  bgmFrame.innerHTML = '';
  bgmCard.hidden = true;
  bgmChip.setAttribute('aria-expanded', 'false');
  bgmChip.classList.remove('playing');
  bgmChip.innerHTML = '<span class="bgm-note" aria-hidden="true">♪</span> 노래 틀기';
}

bgmChip.addEventListener('click', () => {
  if (bgmFrame.innerHTML === '') bgmPlay();
  else {
    bgmCard.hidden = !bgmCard.hidden;
    bgmChip.setAttribute('aria-expanded', String(!bgmCard.hidden));
  }
});
bgmNext.addEventListener('click', bgmPlay);
bgmClose.addEventListener('click', bgmStop);

// 페이지 첫 클릭·터치에 노래 시작 (브라우저 자동재생 정책상 첫 입력이 필요)
document.addEventListener('pointerdown', function once(e) {
  if (e.target.closest('#bgm')) return;      // 칩·카드 자체는 각 버튼이 처리
  document.removeEventListener('pointerdown', once);
  if (bgmFrame.innerHTML === '') bgmPlay();
});
