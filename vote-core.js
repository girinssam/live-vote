// 실시간 투표 — 데이터 연결 공통 코드 (수정할 필요 없어요)
(function () {
  const cfg = window.FIREBASE_CONFIG || {};
  const live = !!(cfg.apiKey && cfg.projectId && window.firebase);
  const Store = { live };

  const rid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

  // 연습 모드에서는 탭마다 다른 사람으로 취급(sessionStorage) → 탭 여러 개로 여러 명 흉내 가능
  let local;
  try { local = live ? window.localStorage : window.sessionStorage; local.setItem('_t', '1'); local.removeItem('_t'); }
  catch (e) { const m = {}; local = { getItem: k => m[k] ?? null, setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; } }; }
  Store.local = local;

  let vid = local.getItem('girinvote_voter');
  if (!vid) { vid = rid(); local.setItem('girinvote_voter', vid); }
  Store.voterId = vid;
  Store.newId = (prefix) => (prefix || '') + rid();
  Store.qkey = (st) => (st && st.qid ? st.qid + '_r' + (st.round || 0) : null);
  Store.normWord = (w) => String(w || '').replace(/\s+/g, ' ').trim().slice(0, 12);

  const byOrder = (a, b) => (a.order || 0) - (b.order || 0);

  if (live) {
    firebase.initializeApp(cfg);
    const db = firebase.firestore();
    Store.onState = (cb, err) => db.doc('state/current').onSnapshot(s => cb(s.exists ? s.data() : null), err);
    Store.setState = (patch) => db.doc('state/current').set(patch, { merge: true });
    Store.onQuestions = (cb, err) => db.collection('questions').onSnapshot(s => cb(s.docs.map(d => d.data()).sort(byOrder)), err);
    Store.saveQuestion = (q) => db.doc('questions/' + q.id).set(q);
    Store.deleteQuestion = (id) => db.doc('questions/' + id).delete();
    Store.onResponses = (qkey, cb, err) => db.collection('responses').where('qkey', '==', qkey).onSnapshot(s => cb(s.docs.map(d => Object.assign({}, d.data(), { _id: d.id }))), err);
    Store.setResponse = (id, data) => db.doc('responses/' + id).set(data);
  } else {
    const K = 'girinvote_demo';
    const empty = () => ({ state: null, questions: {}, responses: {} });
    const load = () => { try { return JSON.parse(localStorage.getItem(K)) || empty(); } catch (e) { return empty(); } };
    const subs = new Set();
    const fire = () => { const d = load(); subs.forEach(f => f(d)); };
    const mutate = (fn) => { const d = load(); fn(d); localStorage.setItem(K, JSON.stringify(d)); setTimeout(fire, 0); return Promise.resolve(); };
    window.addEventListener('storage', e => { if (e.key === K) fire(); });
    const sub = (fn) => { subs.add(fn); setTimeout(() => fn(load()), 0); return () => subs.delete(fn); };

    Store.onState = (cb) => sub(d => cb(d.state));
    Store.setState = (patch) => mutate(d => { d.state = Object.assign({}, d.state || {}, patch); });
    Store.onQuestions = (cb) => sub(d => cb(Object.values(d.questions).sort(byOrder)));
    Store.saveQuestion = (q) => mutate(d => { d.questions[q.id] = q; });
    Store.deleteQuestion = (id) => mutate(d => { delete d.questions[id]; });
    Store.onResponses = (qkey, cb) => sub(d => cb(Object.entries(d.responses).filter(([, r]) => r.qkey === qkey).map(([id, r]) => Object.assign({}, r, { _id: id }))));
    Store.setResponse = (id, data) => mutate(d => { d.responses[id] = data; });
    Store.clearDemo = () => { localStorage.removeItem(K); fire(); };
  }

  window.VoteStore = Store;
})();
