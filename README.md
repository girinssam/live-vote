# 꿈부자기린쌤 실시간 소통창

| 파일 | 역할 |
|---|---|
| `index.html` | 학생용 참여 화면 (QR로 접속) |
| `screen.html` | 선생님용 화면 (질문 띄우기, 실시간 그래프·워드클라우드, QR) |
| `config.js` | Firebase 설정값, 학생 페이지 주소 — **이 파일만 고치면 됨** |
| `vote-core.js` | 데이터 연결 공통 코드 (수정 불필요) |
| `firestore.rules` | Firestore 보안 규칙 (Firebase 콘솔에 붙여 넣기) |

## 연습 모드 (설정 전 화면 확인)
`config.js`의 apiKey가 비어 있으면 연습 모드. 같은 브라우저에서
`screen.html` 탭 하나 + `index.html` 탭 여러 개를 열면 탭끼리 연결되어 응답이 그래프에 반영됨.

## 실제 사용 설정
1. Firebase 콘솔에서 프로젝트 만들기 → Firestore Database 만들기 (서울 asia-northeast3 권장)
2. Firestore > 규칙 탭에 `firestore.rules` 내용 붙여 넣고 게시
3. 프로젝트 설정 > 내 앱 > 웹 앱 추가 → firebaseConfig 값을 `config.js`에 붙여 넣기
4. 다섯 파일을 GitHub 저장소(예: live-vote)에 올리고 GitHub Pages 켜기
5. `config.js`의 STUDENT_URL에 `https://girinssam.github.io/live-vote/` 입력 후 다시 올리기
6. 강의 때 선생님 화면은 **반드시 GitHub Pages 주소로 열고 로그인**: `https://girinssam.github.io/live-vote/screen.html`
   (`config.js`의 ADMIN_EMAIL 구글 계정으로 로그인해야 질문·화면 상태를 바꿀 수 있음. 내 컴퓨터 파일로 열면 로그인이 안 됨)

## 선생님 로그인
- 선생님 화면(`screen.html`)은 `config.js`의 `ADMIN_EMAIL` 구글 계정으로 로그인해야 열림. 학생 화면은 로그인 없음
- Firestore 보안 규칙도 이 계정만 질문(questions)·화면 상태(state)를 쓸 수 있게 막아 둠. 계정을 바꾸면 `firestore.rules`도 함께 바꾸고 다시 배포
- 연습 모드(apiKey 비어 있음)에서는 로그인 없이 열림

## 단축키 (선생님 화면)
← → 질문 이동 · Space 응답 시작/마감 · R 결과 숨기기/보이기 · Q QR 크게 · B 조작 막대 숨기기
