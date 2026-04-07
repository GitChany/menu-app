import { useState, useEffect } from "react";

const CATEGORIES = {
  korean: { label: "한식", emoji: "🍚", color: "#E8453C" },
  chinese: { label: "중식", emoji: "🥟", color: "#D4A017" },
  japanese: { label: "일식", emoji: "🍣", color: "#2E86AB" },
  western: { label: "양식", emoji: "🍝", color: "#6B4226" },
  snack: { label: "분식", emoji: "🧇", color: "#FF6B35" },
  fast: { label: "패스트푸드", emoji: "🍔", color: "#28A745" },
  asian: { label: "동남아", emoji: "🍜", color: "#9B59B6" },
  cafe: { label: "카페/브런치", emoji: "☕", color: "#C2855A" },
};

const MOODS = [
  { id: "comfort", label: "따뜻하고 든든한", emoji: "🫂" },
  { id: "light", label: "가볍고 건강한", emoji: "🥗" },
  { id: "spicy", label: "매콤하고 자극적인", emoji: "🌶️" },
  { id: "special", label: "특별하고 색다른", emoji: "✨" },
  { id: "quick", label: "빠르고 간편한", emoji: "⚡" },
  { id: "sweet", label: "달콤한 디저트", emoji: "🍰" },
];

const SITUATIONS = [
  { id: "alone", label: "혼밥", emoji: "🧑" },
  { id: "date", label: "데이트", emoji: "💕" },
  { id: "friends", label: "친구 모임", emoji: "🎉" },
  { id: "family", label: "가족 식사", emoji: "👨‍👩‍👧‍👦" },
  { id: "business", label: "회식/비즈니스", emoji: "💼" },
  { id: "delivery", label: "배달", emoji: "🛵" },
];

const MENU_DB = {
  korean: {
    comfort: ["된장찌개 + 공깃밥", "김치찜", "갈비찜", "순두부찌개", "부대찌개", "설렁탕", "감자탕", "삼계탕", "육개장", "콩나물국밥"],
    light: ["비빔밥", "냉면", "잡채", "두부 샐러드", "청국장", "보리밥 정식", "묵사발", "도토리묵"],
    spicy: ["떡볶이", "낙곱새", "불닭", "매운 갈비찜", "닭볶음탕", "쭈꾸미 볶음", "김치찌개", "차돌 된장찌개"],
    special: ["한우 구이", "전복죽", "궁중떡볶이", "해물탕", "장어구이", "양념갈비", "꽃게찜"],
    quick: ["김밥", "제육볶음 도시락", "유부초밥", "계란말이 덮밥", "참치김치찌개"],
    sweet: ["호떡", "약과", "인절미", "꿀떡", "수정과", "식혜"],
  },
  chinese: {
    comfort: ["짜장면", "짬뽕", "마파두부", "양장피", "볶음밥"],
    light: ["유산슬", "새우볶음밥", "잡채밥", "중화냉면"],
    spicy: ["마라탕", "마라샹궈", "고추잡채", "라조기", "사천탕면"],
    special: ["꿔바로우", "양꼬치", "베이징덕", "XO볶음밥", "해물누룽지탕"],
    quick: ["군만두", "볶음밥", "짜장면", "짬뽕밥"],
    sweet: ["탕후루", "에그타르트", "망고푸딩"],
  },
  japanese: {
    comfort: ["라멘", "카츠동", "우동", "규동", "오야코동", "카레라이스"],
    light: ["초밥", "연어 사시미", "소바", "에다마메", "샤브샤브"],
    spicy: ["매운 라멘", "와사비 롤", "매운 카레", "스파이시 참치 롤"],
    special: ["오마카세", "이자카야 코스", "장어덮밥", "스키야키", "철판구이"],
    quick: ["규동", "카레라이스", "오니기리", "유부초밥"],
    sweet: ["모찌", "다이후쿠", "타이야키", "말차 아이스크림", "카스테라"],
  },
  western: {
    comfort: ["스테이크", "파스타", "리조또", "그라탕", "함박스테이크", "미트볼 파스타"],
    light: ["시저 샐러드", "카프레제", "가스파초", "연어 스테이크", "그릭 샐러드"],
    spicy: ["아라비아타", "페퍼로니 피자", "핫윙", "칠리 콘 카르네"],
    special: ["티본 스테이크", "랍스터", "트러플 파스타", "오소부코", "프렌치 코스"],
    quick: ["까르보나라", "마르게리타 피자", "BLT 샌드위치", "피쉬 앤 칩스"],
    sweet: ["티라미수", "크렘 브륄레", "팬케이크", "초콜릿 케이크", "애플파이"],
  },
  snack: {
    comfort: ["라볶이", "순대국", "어묵탕", "칼국수", "수제비"],
    light: ["쫄면", "비빔냉면", "야채 김밥", "두부 김치"],
    spicy: ["신전 떡볶이", "매운 라볶이", "불닭 만두", "매운 어묵탕"],
    special: ["로제 떡볶이", "치즈 김밥", "모듬 전", "해물파전"],
    quick: ["컵라면 + 삼각김밥", "즉석 떡볶이", "토스트", "핫도그"],
    sweet: ["붕어빵", "계란빵", "와플", "츄러스"],
  },
  fast: {
    comfort: ["치킨", "햄버거", "감자튀김", "치킨 너겟"],
    light: ["서브웨이 샌드위치", "포케 볼", "랩", "그릴드 치킨 버거"],
    spicy: ["불닭 버거", "양념치킨", "핫 윙", "스파이시 너겟"],
    special: ["수제 버거", "풀드포크 버거", "트러플 감자튀김"],
    quick: ["빅맥 세트", "치킨 텐더", "타코", "핫도그"],
    sweet: ["맥플러리", "선데이", "츄러스", "시나몬 스틱"],
  },
  asian: {
    comfort: ["쌀국수(포)", "카오 팟", "팟타이", "나시고렝", "그린커리"],
    light: ["월남쌈", "반미", "솜탐", "스프링롤", "분짜"],
    spicy: ["똠양꿍", "레드커리", "싸테이", "라크사", "매운 분짜"],
    special: ["코스 태국 요리", "반쎄오", "카오소이", "렌당"],
    quick: ["쌀국수", "반미 샌드위치", "볶음밥", "팟타이"],
    sweet: ["망고 찹쌀밥", "코코넛 아이스크림", "로티"],
  },
  cafe: {
    comfort: ["브런치 플레이트", "에그 베네딕트", "프렌치토스트", "수프 + 빵"],
    light: ["아사이볼", "그래놀라 요거트", "샐러드 플레이트", "스무디볼"],
    spicy: ["칠리 에그 토스트", "매콤 치아바타"],
    special: ["애프터눈 티 세트", "트러플 크로크무슈", "리코타 팬케이크"],
    quick: ["크로와상 + 커피", "베이글 샌드위치", "토스트 세트"],
    sweet: ["크로플", "당근 케이크", "스콘 세트", "마카롱", "크레페"],
  },
};

function getRecommendations(mood, situation, count = 3) {
  const allMenus = [];
  const catKeys = Object.keys(MENU_DB);

  catKeys.forEach((cat) => {
    const items = MENU_DB[cat]?.[mood] || [];
    items.forEach((item) => {
      let score = Math.random() * 10;
      if (situation === "alone" && ["fast", "snack", "korean"].includes(cat)) score += 3;
      if (situation === "date" && ["japanese", "western", "cafe"].includes(cat)) score += 4;
      if (situation === "friends" && ["korean", "chinese", "fast"].includes(cat)) score += 3;
      if (situation === "family" && ["korean", "chinese", "japanese"].includes(cat)) score += 3;
      if (situation === "business" && ["korean", "japanese", "western"].includes(cat)) score += 4;
      if (situation === "delivery" && ["fast", "chinese", "korean"].includes(cat)) score += 3;
      allMenus.push({ name: item, category: cat, score });
    });
  });

  allMenus.sort((a, b) => b.score - a.score);
  const seen = new Set();
  const result = [];
  for (const m of allMenus) {
    if (!seen.has(m.name)) {
      seen.add(m.name);
      result.push(m);
    }
    if (result.length >= count) break;
  }
  return result;
}

const TIPS = {
  comfort: "오늘은 마음이 따뜻해지는 메뉴가 좋겠어요 🤗",
  light: "건강하게 한 끼, 좋은 선택이에요 💪",
  spicy: "매운 맛으로 스트레스 해소! 🔥",
  special: "특별한 날엔 특별한 메뉴를 🎊",
  quick: "시간이 없을 땐 빠르게! ⏱️",
  sweet: "달콤함이 필요한 순간이네요 🍬",
};

export default function MenuRecommender() {
  // 모든 useState는 반드시 맨 위에!
  const [isKakaoIOS, setIsKakaoIOS] = useState(false);
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(null);
  const [situation, setSituation] = useState(null);
  const [results, setResults] = useState([]);
  const [revealed, setRevealed] = useState([false, false, false]);
  const [spinning, setSpinning] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // 카카오톡 인앱 브라우저 감지
  useEffect(() => {
    const ua = navigator.userAgent || '';
    if (/KAKAOTALK/i.test(ua)) {
      if (/iPhone|iPad|iPod/i.test(ua)) {
        // iOS 카톡: 안내 화면 표시
        setIsKakaoIOS(true);
      } else {
        // 안드로이드 카톡: 외부 브라우저로 이동
        window.location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(window.location.href);
      }
    }
  }, []);

  const reset = () => {
    setStep(0);
    setMood(null);
    setSituation(null);
    setResults([]);
    setRevealed([false, false, false]);
    setSpinning(false);
    setChosen(null);
  };

  const handleMood = (m) => {
    setMood(m);
    setStep(1);
  };

  const handleSituation = (s) => {
    setSituation(s);
    setSpinning(true);
    setStep(2);
    setTimeout(() => {
      const recs = getRecommendations(s === null ? "comfort" : mood, s, 3);
      setResults(recs);
      setSpinning(false);
    }, 1800);
  };

  const revealCard = (i) => {
    const next = [...revealed];
    next[i] = true;
    setRevealed(next);
  };

  const chooseMenu = (item) => {
    setChosen(item);
    setHistory((h) => [
      { ...item, date: new Date().toLocaleDateString("ko-KR"), mood, situation },
      ...h.slice(0, 9),
    ]);
  };

  const moodObj = MOODS.find((m) => m.id === mood);
  const sitObj = SITUATIONS.find((s) => s.id === situation);

  // iOS 카카오톡 인앱 브라우저일 때 안내 화면
  if (isKakaoIOS) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(165deg, #0F0F1A 0%, #1A1A2E 40%, #16213E 100%)",
        fontFamily: "-apple-system, sans-serif", color: "#E8E8ED",
        padding: 20, textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>오늘 뭐 먹지?</h2>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 28, lineHeight: 1.6 }}>
          카카오톡 브라우저에서는 일부 기능이 제한돼요.<br/>
          아래 방법으로 Safari에서 열어주세요!
        </p>
        <div style={{
          background: "rgba(255,255,255,0.06)", borderRadius: 16,
          padding: "24px 20px", maxWidth: 320, width: "100%",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: "#FF6B35" }}>
            Safari로 여는 방법
          </p>
          <p style={{ fontSize: 14, color: "#bbb", lineHeight: 1.8, margin: 0 }}>
            1. 오른쪽 하단 <span style={{ fontSize: 18 }}>⋯</span> 버튼 터치<br/>
            2. "Safari로 열기" 선택
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0F0F1A 0%, #1A1A2E 40%, #16213E 100%)",
      fontFamily: "'Pretendard', 'Noto Sans KR', -apple-system, sans-serif",
      color: "#E8E8ED",
      overflow: "hidden",
      position: "relative",
    }}>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/static/pretendard.min.css" rel="stylesheet" />

      {/* Ambient bg orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)",
          top: "-10%", right: "-5%", animation: "float1 12s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,134,171,0.08) 0%, transparent 70%)",
          bottom: "10%", left: "-8%", animation: "float2 15s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spinIn { 0%{transform:rotate(0deg) scale(0.7);opacity:0} 100%{transform:rotate(720deg) scale(1);opacity:1} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes cardFlip { 0%{transform:rotateY(0) scale(0.95)} 50%{transform:rotateY(90deg) scale(1)} 100%{transform:rotateY(0) scale(1)} }
        @keyframes bounceIn { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes confettiFall {
          0%{transform:translateY(-10px) rotate(0deg);opacity:1}
          100%{transform:translateY(120vh) rotate(720deg);opacity:0}
        }
        .mood-btn { transition: all 0.25s cubic-bezier(.4,0,.2,1); cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        .mood-btn:active { transform: translateY(0) scale(0.98); }
        .card-reveal { cursor: pointer; transition: all 0.35s cubic-bezier(.4,0,.2,1); -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        .choose-btn { transition: all 0.2s ease; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        .choose-btn:active { transform: scale(0.96); }
        @media (hover: hover) {
          .mood-btn:hover { transform: translateY(-4px) scale(1.04); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
          .card-reveal:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
          .choose-btn:hover { transform: scale(1.06); filter: brightness(1.15); }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto", padding: "20px 20px 40px" }}>

        {/* Header */}
        <div style={{
          textAlign: "center", padding: "28px 0 20px",
          animation: "fadeUp 0.6s ease-out",
        }}>
          <div style={{ fontSize: 42, marginBottom: 6 }}>🍽️</div>
          <h1 style={{
            fontSize: 26, fontWeight: 800, margin: 0,
            background: "linear-gradient(135deg, #FF6B35, #FFB347, #FF6B35)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundSize: "200% auto", animation: "shimmer 3s linear infinite",
            letterSpacing: -0.5,
          }}>오늘 뭐 먹지?</h1>
          <p style={{ fontSize: 13, color: "#888", marginTop: 6, fontWeight: 400 }}>
            AI가 딱 맞는 메뉴를 추천해드려요
          </p>
        </div>

        {/* History toggle */}
        {history.length > 0 && step === 0 && (
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <button onClick={() => setShowHistory(!showHistory)} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#aaa", padding: "6px 16px", borderRadius: 20, fontSize: 12,
              cursor: "pointer", transition: "all 0.2s",
            }}>
              {showHistory ? "닫기" : `최근 기록 (${history.length})`}
            </button>
          </div>
        )}

        {showHistory && step === 0 && (
          <div style={{
            marginBottom: 20, animation: "fadeUp 0.3s ease-out",
            background: "rgba(255,255,255,0.03)", borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)", padding: 16,
          }}>
            {history.map((h, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 0", borderBottom: i < history.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <span style={{ fontSize: 20 }}>{CATEGORIES[h.category]?.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{h.name}</div>
                  <div style={{ fontSize: 11, color: "#666" }}>{h.date}</div>
                </div>
                <span style={{
                  fontSize: 10, color: CATEGORIES[h.category]?.color,
                  background: `${CATEGORIES[h.category]?.color}18`,
                  padding: "3px 8px", borderRadius: 8,
                }}>{CATEGORIES[h.category]?.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 0: Mood */}
        {step === 0 && (
          <div style={{ animation: "fadeUp 0.5s ease-out" }}>
            <h2 style={{
              fontSize: 17, fontWeight: 700, marginBottom: 16, textAlign: "center",
              color: "#ccc",
            }}>지금 어떤 기분이에요?</h2>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}>
              {MOODS.map((m, i) => (
                <button key={m.id} className="mood-btn" onClick={() => handleMood(m.id)} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "18px 14px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  animation: `fadeUp 0.4s ease-out ${i * 0.07}s both`,
                }}>
                  <span style={{ fontSize: 30 }}>{m.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Situation */}
        {step === 1 && (
          <div style={{ animation: "fadeUp 0.5s ease-out" }}>
            <div style={{
              textAlign: "center", marginBottom: 20,
              background: "rgba(255,107,53,0.08)", borderRadius: 12, padding: "10px 16px",
              border: "1px solid rgba(255,107,53,0.15)",
            }}>
              <span style={{ fontSize: 13, color: "#FF6B35" }}>
                {moodObj?.emoji} {moodObj?.label} 기분이군요!
              </span>
            </div>
            <h2 style={{
              fontSize: 17, fontWeight: 700, marginBottom: 16, textAlign: "center",
              color: "#ccc",
            }}>누구와 함께 먹나요?</h2>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}>
              {SITUATIONS.map((s, i) => (
                <button key={s.id} className="mood-btn" onClick={() => handleSituation(s.id)} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "18px 14px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  animation: `fadeUp 0.4s ease-out ${i * 0.07}s both`,
                }}>
                  <span style={{ fontSize: 30 }}>{s.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{s.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} style={{
              display: "block", margin: "20px auto 0", background: "none", border: "none",
              color: "#666", fontSize: 13, cursor: "pointer",
            }}>← 다시 고르기</button>
          </div>
        )}

        {/* Step 2: Results */}
        {step === 2 && (
          <div style={{ animation: "fadeUp 0.5s ease-out" }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <span style={{
                fontSize: 12, color: "#888",
                background: "rgba(255,255,255,0.04)", padding: "5px 14px",
                borderRadius: 20, display: "inline-block",
              }}>
                {moodObj?.emoji} {moodObj?.label} · {sitObj?.emoji} {sitObj?.label}
              </span>
            </div>

            {spinning ? (
              <div style={{
                textAlign: "center", padding: "60px 0",
                animation: "fadeUp 0.3s ease-out",
              }}>
                <div style={{
                  width: 80, height: 80, margin: "0 auto 20px",
                  fontSize: 50, animation: "spinIn 1.5s ease-out",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>🎰</div>
                <p style={{ fontSize: 15, color: "#aaa", fontWeight: 500 }}>
                  AI가 메뉴를 고르는 중...
                </p>
                <div style={{
                  width: 160, height: 3, background: "rgba(255,255,255,0.06)",
                  borderRadius: 2, margin: "16px auto", overflow: "hidden",
                }}>
                  <div style={{
                    width: "60%", height: "100%",
                    background: "linear-gradient(90deg, #FF6B35, #FFB347)",
                    borderRadius: 2,
                    animation: "shimmer 1s linear infinite",
                    backgroundSize: "200% auto",
                  }} />
                </div>
              </div>
            ) : chosen ? (
              <div style={{
                textAlign: "center", padding: "30px 0",
                animation: "bounceIn 0.5s ease-out",
              }}>
                <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} style={{
                      position: "absolute",
                      left: `${Math.random() * 100}%`,
                      top: -10,
                      width: 8, height: 8,
                      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                      background: ["#FF6B35", "#FFB347", "#2E86AB", "#E8453C", "#28A745", "#9B59B6"][i % 6],
                      animation: `confettiFall ${2 + Math.random() * 2}s ease-in ${Math.random() * 0.8}s both`,
                    }} />
                  ))}
                </div>

                <div style={{
                  width: 100, height: 100, borderRadius: "50%", margin: "0 auto 16px",
                  background: `linear-gradient(135deg, ${CATEGORIES[chosen.category]?.color}40, ${CATEGORIES[chosen.category]?.color}15)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 48, border: `2px solid ${CATEGORIES[chosen.category]?.color}60`,
                }}>
                  {CATEGORIES[chosen.category]?.emoji}
                </div>
                <h2 style={{
                  fontSize: 24, fontWeight: 800, margin: "0 0 8px",
                  color: "#fff",
                }}>오늘의 메뉴</h2>
                <p style={{
                  fontSize: 28, fontWeight: 800, margin: "0 0 8px",
                  color: CATEGORIES[chosen.category]?.color,
                }}>{chosen.name}</p>
                <span style={{
                  fontSize: 12, color: "#888",
                  background: "rgba(255,255,255,0.05)", padding: "4px 14px",
                  borderRadius: 12,
                }}>{CATEGORIES[chosen.category]?.label}</span>
                <p style={{ fontSize: 14, color: "#999", marginTop: 20 }}>
                  {TIPS[mood]}
                </p>
                <button onClick={reset} className="choose-btn" style={{
                  marginTop: 28, padding: "14px 40px", borderRadius: 14,
                  background: "linear-gradient(135deg, #FF6B35, #FF8F5E)",
                  border: "none", color: "#fff", fontSize: 15, fontWeight: 700,
                  boxShadow: "0 8px 24px rgba(255,107,53,0.3)",
                }}>다시 추천받기</button>
              </div>
            ) : (
              <div>
                <h2 style={{
                  fontSize: 17, fontWeight: 700, textAlign: "center",
                  color: "#ccc", marginBottom: 16,
                }}>카드를 터치해서 메뉴를 확인하세요!</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {results.map((r, i) => (
                    <div key={i} className="card-reveal"
                      onClick={() => !revealed[i] ? revealCard(i) : chooseMenu(r)}
                      style={{
                        borderRadius: 18,
                        overflow: "hidden",
                        animation: `fadeUp 0.4s ease-out ${i * 0.15}s both`,
                      }}>
                      {!revealed[i] ? (
                        <div style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "28px 20px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          gap: 12, borderRadius: 18,
                        }}>
                          <span style={{
                            fontSize: 36,
                            animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
                          }}>🎴</span>
                          <span style={{ fontSize: 15, color: "#888", fontWeight: 500 }}>
                            터치하여 {i + 1}번 메뉴 확인
                          </span>
                        </div>
                      ) : (
                        <div style={{
                          background: `linear-gradient(135deg, ${CATEGORIES[r.category]?.color}18, ${CATEGORIES[r.category]?.color}08)`,
                          border: `1px solid ${CATEGORIES[r.category]?.color}30`,
                          padding: "22px 20px",
                          display: "flex", alignItems: "center", gap: 16,
                          borderRadius: 18,
                          animation: "cardFlip 0.5s ease-out",
                        }}>
                          <div style={{
                            width: 56, height: 56, borderRadius: 14,
                            background: `${CATEGORIES[r.category]?.color}20`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 28, flexShrink: 0,
                          }}>
                            {CATEGORIES[r.category]?.emoji}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: 18, fontWeight: 700, color: "#fff",
                              marginBottom: 4,
                            }}>{r.name}</div>
                            <div style={{
                              fontSize: 11, color: CATEGORIES[r.category]?.color,
                              fontWeight: 600,
                            }}>{CATEGORIES[r.category]?.label}</div>
                          </div>
                          <div style={{
                            background: CATEGORIES[r.category]?.color,
                            color: "#fff", fontSize: 11, fontWeight: 700,
                            padding: "6px 12px", borderRadius: 10,
                            whiteSpace: "nowrap",
                          }}>이거!</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={reset} style={{
                  display: "block", margin: "24px auto 0", background: "none",
                  border: "1px solid rgba(255,255,255,0.1)", color: "#888",
                  padding: "10px 24px", borderRadius: 12, fontSize: 13,
                  cursor: "pointer", transition: "all 0.2s",
                }}>← 처음부터 다시</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}