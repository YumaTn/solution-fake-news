import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { quizData } from "../data/quizData";

export default function FakeNewsHunter() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [currentIndex, setCurrentIndex] = useState(() => {
    const indexParam = searchParams.get("index");
    const parsedIndex = indexParam !== null ? Number(indexParam) : NaN;
    return Number.isFinite(parsedIndex) && parsedIndex >= 0 ? parsedIndex : location.state?.currentIndex ?? 0;
  });
  const [score, setScore] = useState(() => {
    const scoreParam = searchParams.get("score");
    const parsedScore = scoreParam !== null ? Number(scoreParam) : NaN;
    return Number.isFinite(parsedScore) && parsedScore >= 0 ? parsedScore : location.state?.score ?? 0;
  });
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState("playing"); // playing, answered, summary

  const [highlights, setHighlights] = useState([]); // array of {start, end}
  const [foundCount, setFoundCount] = useState(0);
  const [feedback, setFeedback] = useState({ text: "Hãy chạm hoặc click vào các từ khóa quan trọng để bôi đậm.", type: "info" });
  const [resultMessage, setResultMessage] = useState(null);

  const timerRef = useRef(null);
  const navigate = useNavigate();
  const currentQuestion = quizData[currentIndex];
  const articleRef = useRef(null);

  // Hệ thống Style định hình Layout cao cấp (Không cần Tailwind)
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', // Đổi sang nền tối (Dark mode) sang trọng hướng game
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      color: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box'
    },
    card: {
      width: '100%',
      maxWidth: '700px',
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
      padding: '32px',
      boxSizing: 'border-box'
    },
    topBar: {
      display: 'flex',
      justifyContent: 'between',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '1px',
      color: '#94a3b8',
      textTransform: 'uppercase',
      marginBottom: '20px'
    },
    scoreBadge: {
      background: 'rgba(56, 189, 248, 0.1)',
      color: '#38bdf8',
      padding: '4px 12px',
      borderRadius: '9999px',
      border: '1px solid rgba(56, 189, 248, 0.2)'
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: '1px solid #334155',
      paddingBottom: '20px',
      marginBottom: '24px'
    },
    title: { fontSize: '24px', fontWeight: 800, margin: 0, color: '#fff' },
    subtitle: { color: '#94a3b8', marginTop: '6px', fontSize: '14px' },
    timer: (isLow) => ({
      fontFamily: 'monospace',
      fontSize: '18px',
      fontWeight: 700,
      padding: '8px 16px',
      borderRadius: '12px',
      border: isLow ? '1px solid #ef4444' : '1px solid #334155',
      background: isLow ? 'rgba(239,68,68,0.1)' : '#111827',
      color: isLow ? '#ef4444' : '#f43f5e'
    }),
    interactiveBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    wordsContainer: {
      lineHeight: 1.8,
      background: '#0f172a',
      border: '1px solid #334155',
      borderRadius: '16px',
      padding: '20px',
      minHeight: '120px',
      marginBottom: '20px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px 10px'
    },
    chipBase: {
      borderRadius: '6px',
      padding: '2px 6px',
      cursor: 'pointer',
      fontSize: '15px',
      userSelect: 'none',
      transition: 'all 0.15s'
    },
    feedbackBox: (type) => {
      let bg = 'rgba(51,65,85,0.5)';
      let border = '#475569';
      let color = '#94a3b8';
      if (type === 'success') { bg = 'rgba(16,185,129,0.1)'; border = '#10b981'; color = '#34d399'; }
      if (type === 'warning') { bg = 'rgba(245,158,11,0.1)'; border = '#f59e0b'; color = '#fbbf24'; }
      if (type === 'ready') { bg = 'rgba(59,130,246,0.15)'; border = '#3b82f6'; color = '#60a5fa'; }
      return {
        borderLeft: `4px solid ${border}`,
        background: bg,
        color: color,
        padding: '16px',
        borderRadius: '0 12px 12px 0',
        marginBottom: '20px',
        fontSize: '14px'
      };
    },
    gridBtn: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    },
    actionBtn: (isTrueBtn, disabled) => ({
      background: isTrueBtn ? '#059669' : '#e11d48',
      color: '#fff',
      border: 'none',
      padding: '14px',
      borderRadius: '12px',
      fontWeight: 700,
      fontSize: '15px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.3 : 1,
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
    }),
    resultAlert: (type) => ({
      marginTop: '24px',
      padding: '20px',
      borderRadius: '16px',
      border: type === 'correct' ? '1px solid #059669' : '1px solid #e11d48',
      background: type === 'correct' ? 'rgba(5,150,105,0.08)' : 'rgba(225,29,72,0.08)'
    })
  };

  const wordsArray = currentQuestion ? currentQuestion.content.match(/\S+/g) || [] : [];

  useEffect(() => {
    if (gameState === "playing" && currentQuestion) {
      setHighlights([]);
      setFoundCount(0);
      setTimeLeft(60);
      setResultMessage(null);
      setFeedback({ text: "Hãy chạm hoặc giữ để chọn vùng và nổi bật chứng cứ.", type: "info" });

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [currentIndex, gameState]);

  const handleTimeOut = () => {
    setGameState("confirm");
    setResultMessage(null);
  };

  const submitResult = (userChoice) => {
    clearInterval(timerRef.current);
    const isCorrect = userChoice === currentQuestion.isTrue;
    const allKeywordsFound = foundCount === currentQuestion.requiredKeywords.length;
    const nextScore = isCorrect ? score + (allKeywordsFound ? 100 : 50) : score;
    const query = `?index=${currentIndex}&score=${nextScore}`;

    navigate(
      `/result/${userChoice ? "true" : "false"}/${isCorrect ? "correct" : "wrong"}${query}`,
      { state: { currentIndex, score: nextScore } }
    );
  };

  const handleTimeoutConfirm = (userChoice) => {
    submitResult(userChoice);
  };

  // Helpers to map DOM Range -> character offsets within article
  const getCharOffset = (container, node, offsetInNode) => {
    let charCount = 0;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    let current;
    while ((current = walker.nextNode())) {
      if (current === node) return charCount + offsetInNode;
      charCount += current.textContent.length;
    }
    return null;
  };

  const getOffsetsFromRange = (range, container) => {
    const { startContainer, startOffset, endContainer, endOffset } = range;
    const start = getCharOffset(container, startContainer, startOffset);
    const end = getCharOffset(container, endContainer, endOffset);
    if (start == null || end == null) return null;
    return { start: Math.min(start, end), end: Math.max(start, end) };
  };

  const mergeRanges = (ranges) => {
    if (!ranges || ranges.length === 0) return [];
    const sorted = ranges.slice().sort((a, b) => a.start - b.start);
    const merged = [ { ...sorted[0] } ];
    for (let i = 1; i < sorted.length; i++) {
      const cur = sorted[i];
      const last = merged[merged.length - 1];
      if (cur.start <= last.end) {
        last.end = Math.max(last.end, cur.end);
      } else {
        merged.push({ ...cur });
      }
    }
    return merged;
  };

  const subtractRange = (ranges, rem) => {
    if (!ranges || ranges.length === 0) return [];
    const sorted = ranges.slice().sort((a,b)=>a.start-b.start);
    const out = [];
    for (const r of sorted) {
      // no overlap
      if (rem.end <= r.start || rem.start >= r.end) {
        out.push({ ...r });
        continue;
      }
      // rem covers r entirely -> remove
      if (rem.start <= r.start && rem.end >= r.end) {
        continue;
      }
      // rem is inside r -> split
      if (rem.start > r.start && rem.end < r.end) {
        out.push({ start: r.start, end: rem.start });
        out.push({ start: rem.end, end: r.end });
        continue;
      }
      // overlap on left side
      if (rem.start <= r.start && rem.end < r.end) {
        out.push({ start: rem.end, end: r.end });
        continue;
      }
      // overlap on right side
      if (rem.start > r.start && rem.end >= r.end) {
        out.push({ start: r.start, end: rem.start });
        continue;
      }
    }
    return mergeRanges(out);
  };

  // New: check progress from plain text (used by character-based highlights)
  const checkProgressFromText = (selectedText) => {
    const cleanSelectedText = (selectedText || "").toLowerCase().replace(/[,.]/g, "");

    // prevent selecting too much
    const maxAllowed = Math.floor(wordsArray.length * 0.5);
    const selectedWordCount = (selectedText || "").split(/\s+/).filter(Boolean).length;
    if (selectedWordCount > maxAllowed) {
      setFeedback({ text: "⚠️ CẢNH BÁO: Bạn đang bôi đậm quá nhiều từ! Hãy nhấn Hoàn tác bớt.", type: "warning" });
      return;
    }

    let matchCount = 0;
    currentQuestion.requiredKeywords.forEach((keyword) => {
      const cleanKeyword = keyword.toLowerCase().replace(/[,.]/g, "");
      if (cleanSelectedText.includes(cleanKeyword)) matchCount++;
    });

    setFoundCount(matchCount);

    if (matchCount > foundCount) {
      setFeedback({ text: "✅ Chính xác! Bạn vừa tìm ra một manh mối quan trọng.", type: "success" });
    } else if (matchCount === currentQuestion.requiredKeywords.length) {
      setFeedback({ text: "🎉 XUẤT SẮC! Đã tìm đủ chứng cứ pháp lý. Hãy đưa ra kết luận!", type: "ready" });
    } else {
      setFeedback({ text: "Tìm thêm các từ khóa liên quan đến thời gian, nguồn tin hoặc số liệu...", type: "info" });
    }
  };

  // When highlights change (character offsets), recompute matched keywords
  useEffect(() => {
    if (!currentQuestion) return;
    if (!highlights || highlights.length === 0) {
      // reset progress if no highlights
      setFoundCount(0);
      setFeedback({ text: "Hãy chạm hoặc click vào các từ khóa quan trọng để bôi đậm.", type: "info" });
      return;
    }

    // build selected text from highlights
    const text = highlights
      .slice()
      .sort((a,b)=>a.start-b.start)
      .map(h => currentQuestion.content.slice(h.start, h.end))
      .join(' ');

    checkProgressFromText(text);
  }, [highlights, currentQuestion]);
  

  const isCorrectKeyword = (word) => {
    return currentQuestion.requiredKeywords.some((keyword) =>
      word.toLowerCase().includes(keyword.toLowerCase().split(" ")[0])
    );
  };

  const evidenceSelected = highlights.length > 0;

  const handleSubmitAnswer = (userChoice) => {
    submitResult(userChoice);
  };

  const handleArticleMouseUp = (e) => {
    if (gameState !== 'playing') return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    if (!articleRef.current || !articleRef.current.contains(range.commonAncestorContainer)) return;
    const offsets = getOffsetsFromRange(range, articleRef.current);
    if (!offsets || offsets.start === offsets.end) return;

    // If selection overlaps existing highlights, subtract (toggle off) that area;
    // otherwise add the selection as a new highlight.
    const overlaps = highlights.some((h) => !(offsets.end <= h.start || offsets.start >= h.end));
    if (overlaps) {
      setHighlights((prev) => subtractRange(prev, offsets));
    } else {
      setHighlights((prev) => mergeRanges([...prev, offsets]));
    }

    sel.removeAllRanges();
  };

  const renderWithHighlights = (text, ranges) => {
    if (!ranges || ranges.length === 0) return text;
    const parts = [];
    let last = 0;
    const sorted = ranges.slice().sort((a, b) => a.start - b.start);
    sorted.forEach((r, idx) => {
      if (r.start > last) parts.push(text.slice(last, r.start));
      parts.push(
        <span key={`h-${idx}`} style={{ background: '#d97706', color: '#fff', fontWeight: 700, borderRadius: '6px', padding: '0 2px' }}>
          {text.slice(r.start, r.end)}
        </span>
      );
      last = r.end;
    });
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };

  return (
    <div style={styles.container}>
      {gameState !== "summary" ? (
        <div style={styles.card}>
          
          {/* Top Bar */}
          <div style={styles.topBar}>
            <span>Bản tin kiểm chứng: {currentIndex + 1} / {quizData.length}</span>
            <span style={styles.scoreBadge}>Năng lượng: {score} PTS</span>
          </div>

          {/* Tiêu đề & Hẹn giờ */}
          <div style={styles.headerRow}>
            <div>
              <h1 style={styles.title}>Fake News Hunter 🔍</h1>
              <p style={styles.subtitle}>Bấm chọn các từ khóa cấu thành chứng cứ giả mạo hoặc xác thực.</p>
            </div>
            <div style={styles.timer(timeLeft <= 10)}>
              {timeLeft === 0 ? "00:00" : `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`}
            </div>
          </div>

          {gameState === "confirm" ? (
            <div style={{ padding: '24px 0' }}>
              <div style={styles.resultAlert('warning')}>
                <div style={{ fontWeight: 800, fontSize: '18px', color: '#fff', marginBottom: '10px' }}>
                  ⏰ Hết giờ rồi! Hãy xác nhận tin này là Tin Thật hay Tin Giả.
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '16px' }}>
                  Bạn vẫn có thể chọn đáp án cuối cùng để ghi nhận kết luận.
                </p>
              </div>
              <div style={{ marginBottom: '22px', background: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '18px', color: '#cbd5e1' }}>
                <strong>Nội dung bản tin:</strong>
                <p style={{ margin: '12px 0 0 0', lineHeight: 1.8, fontSize: '15px' }}>{currentQuestion?.content}</p>
              </div>
              <div style={styles.gridBtn}>
                <button onClick={() => handleTimeoutConfirm(true)} style={styles.actionBtn(true, false)}>
                  Xác nhận: Tin Thật
                </button>
                <button onClick={() => handleTimeoutConfirm(false)} style={styles.actionBtn(false, false)}>
                  Xác nhận: Tin Giả
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/** Thanh tương tác */}
              <div style={styles.interactiveBar}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Cơ chế: Giữ để chọn vùng trên điện thoại, thả chuột để tô vàng.</span>
              </div>

              {/* KHU VỰC HIỂN THỊ BÀI BÁO (Bản đầy đủ, nguyên văn) */}
              <div style={{ ...styles.wordsContainer, display: 'block', touchAction: 'manipulation' }} onMouseUp={handleArticleMouseUp} onTouchEnd={handleArticleMouseUp} ref={articleRef}>
                <article style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.9, whiteSpace: 'pre-wrap', fontSize: '15px', userSelect: 'text', WebkitUserSelect: 'text' }}>
                  {renderWithHighlights(currentQuestion?.content || '', highlights)}
                </article>
              </div>

              {/* Nút Kết Luận */}
              <div style={styles.gridBtn}>
                <button onClick={() => handleSubmitAnswer(true)} disabled={!evidenceSelected || gameState !== "playing"} style={styles.actionBtn(true, !evidenceSelected || gameState !== "playing")}> 
                  Xác thực: Tin Thật
                </button>
                <button onClick={() => handleSubmitAnswer(false)} disabled={!evidenceSelected || gameState !== "playing"} style={styles.actionBtn(false, !evidenceSelected || gameState !== "playing")}> 
                  Bác bỏ: Tin Giả
                </button>
              </div>

              {gameState === "answered" && resultMessage && (
                <button
                  onClick={() => {
                    if (currentIndex + 1 < quizData.length) {
                      setCurrentIndex(currentIndex + 1);
                      setGameState("playing");
                    } else {
                      setGameState("summary");
                    }
                  }}
                  style={{ width: '100%', marginTop: '16px', background: '#fff', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {currentIndex + 1 < quizData.length ? "Quét bản tin tiếp theo ➡️" : "Truy xuất kết quả chiến dịch"}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        /* MÀN HÌNH TỔNG KẾT */
        <div style={{ ...styles.card, maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900 }}>🏆 HOÀN THÀNH CHIẾN DỊCH</h2>
          <div style={{ background: '#0f172a', padding: '20px', borderRadius: '16px', margin: '24px 0' }}>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Tổng điểm Hunter</div>
            <div style={{ fontSize: '48px', fontWeight: 900, color: '#38bdf8', marginTop: '4px' }}>{score} <span style={{ fontSize: '18px', color: '#475569' }}>/ {quizData.length * 10}</span></div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}>
            {score === quizData.length * 10 ? "Tuyệt vời! Bạn là bộ lọc tối tân không thể bị thao túng! 🌟" : "Hoàn thành! Hãy tiếp tục tỉnh táo trước các luồng tin mạng. 🤔"}
          </p>
          <button
            onClick={() => { setCurrentIndex(0); setScore(0); setGameState("playing"); }}
            style={{ width: '100%', background: '#38bdf8', color: '#0f172a', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
          >
            Tái khởi động Radar 🔄
          </button>
        </div>
      )}
    </div>
  );
}