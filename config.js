// ─────────────────────────────────────────────────────────────
//  실시간 투표 설정 파일 — 이 파일만 고치면 돼요.
// ─────────────────────────────────────────────────────────────

// 1) Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹 앱)의 firebaseConfig 값을 붙여 넣으세요.
//    apiKey가 비어 있으면 '연습 모드'로 열려요.
//    (연습 모드는 같은 컴퓨터, 같은 브라우저의 탭끼리만 연결돼요. 화면 확인용)
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAE7EsF1PIHfmVR7Tlzq6o7nFQibvAo_XI",
  authDomain: "girinssam-live-vote.firebaseapp.com",
  projectId: "girinssam-live-vote",
  storageBucket: "girinssam-live-vote.firebasestorage.app",
  messagingSenderId: "752118356986",
  appId: "1:752118356986:web:2011a57863ceac7a2a2243"
};

// 2) 학생 투표 페이지 주소 — GitHub Pages에 올린 뒤 채우세요. 이 주소로 QR이 만들어져요.
//    예: "https://girinssam.github.io/live-vote/"
window.STUDENT_URL = "https://girinssam.github.io/live-vote/";

// 3) 강사 계정 — 강사 화면(screen.html)은 이 구글 계정으로 로그인해야 쓸 수 있어요.
//    Firestore 보안 규칙(firestore.rules)에도 같은 주소가 들어 있어요. 바꿀 때는 두 곳을 함께 바꾸세요.
window.ADMIN_EMAIL = "girinssam@gmail.com";
