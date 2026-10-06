# 김민기 — 나를 소개하는 한 페이지

나를 처음 만나는 누구에게나 — 함께 일할 사람이든, 채용 담당자든, 친구든 — 김민기가 어떤 사람인지 한 화면에서 보여주기 위해 만든 공개 소개 페이지입니다.

## 파일 구성

- `index.html` — 페이지 구조와 문구 (이 안에서 내용을 바꿉니다)
- `styles.css` — 디자인과 반응형
- `script.js` — 아코디언·인사 바꾸기·움직임 줄이기
- `assets/favicon.svg` — 파비콘
- `tools/serve.mjs` — 로컬 확인용 서버
- `tools/check-contrast.mjs` — 명암 대비 검사 스크립트
- `checks/` — 두 기준 해상도 등 검사 스크린샷

## 로컬에서 보기

```
node tools/serve.mjs
```

→ http://localhost:8080 접속 (Node.js만 있으면 됩니다)

명암 대비 재검사:

```
node tools/check-contrast.mjs
```

## 배포하기

### 방법 A — GitHub Pages (소스 저장소와 함께 해결, 권장)

1. https://github.com 에서 무료 계정 만들기
2. 새 Public 저장소 만들기 (이름 예: `about-me`)
3. 이 폴더의 파일을 저장소에 업로드 (또는 git push)
4. 저장소 Settings → Pages → Branch: `main`, `/ (root)` 선택 → Save
5. 몇 분 뒤 `https://본인아이디.github.io/about-me/` 가 결과물 URL
6. 소스 저장소 URL은 `https://github.com/아이디/about-me/commit/커밋해시` 형태로 커밋 화면에서 복사
7. **`index.html` 안의 `https://github.com/kimmingi-dev/about-me` 두 곳을 실제 저장소 주소로 교체** (TODO 주석 위치)

### 방법 B — Firebase Hosting (이미 쓰던 도구)

```
npm i -g firebase-tools
firebase login
firebase init hosting   → public 폴더를 "." 로, SPA 아님(No)
firebase deploy
```

→ `https://프로젝트명.web.app` 가 결과물 URL
(단, 소스 저장소 URL은 GitHub 등에 별도로 만들어야 합니다)

## 배포 전 마지막 점검

- [ ] `index.html`의 GitHub 저장소 링크 2곳을 실제 주소로 교체했는가
- [ ] 강점 카드의 상황·행동·결과 문장이 실제 내 경험과 맞는가
- [ ] 새 시크릿 창에서 로그인 없이 열리는가
