// 사용 중인 전경/배경색 조합의 WCAG 대비율 검사 — 실행: node tools/check-contrast.mjs
const pairs = [
  ['본문 잉크/배경', '#26202E', '#FFF8F1', 4.5],
  ['본문 잉크/카드', '#26202E', '#FFFFFF', 4.5],
  ['보조 잉크2/배경', '#514A63', '#FFF8F1', 4.5],
  ['보조 잉크2/카드', '#514A63', '#FFFFFF', 4.5],
  ['보조 잉크2/라벤더칩', '#514A63', '#E9E3FF', 4.5],
  ['보라 딥/배경', '#5538DB', '#FFF8F1', 4.5],
  ['보라 딥/라벤더', '#5538DB', '#E9E3FF', 4.5],
  ['보라 딥/카드', '#5538DB', '#FFFFFF', 4.5],
  ['흰 글자/보라 버튼', '#FFFFFF', '#6A4CFF', 4.5],
  ['흰 글자/보라딥(hover)', '#FFFFFF', '#5538DB', 4.5],
  ['크림 글자/잉크칩', '#FFF8F1', '#26202E', 4.5],
  ['크림 글자/잉크칩hover', '#FFF8F1', '#3A3347', 4.5],
  ['코랄 딥/코랄칩', '#B23A24', '#FFE9E0', 4.5],
  ['코랄 딥/배경', '#B23A24', '#FFF8F1', 4.5],
  ['민트 딥/민트칩', '#0B6B4F', '#BFEDE0', 4.5],
  ['민트 딥/카드', '#0B6B4F', '#FFFFFF', 4.5],
  ['잉크/버터 말풍선', '#26202E', '#FFD166', 4.5],
  ['비공개 제목/다크카드 (큰글자)', '#FFB4A0', '#26202E', 3],
  ['비공개 본문/다크카드', '#E8E2F0', '#26202E', 4.5],
  ['푸터 링크/배경', '#5538DB', '#FFF8F1', 4.5],
];

function lum(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const f = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
}
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

let fail = 0;
for (const [name, fg, bg, need] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= need;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2)}:1 (기준 ${need}:1)  ${name}  ${fg} on ${bg}`);
}
console.log(`\n${fail === 0 ? '모두 통과' : `실패 ${fail}건`}`);
process.exit(fail ? 1 : 0);
