import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { quizData } from "../data/quizData";

export default function FakeNewsHunter() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
  const [gameState, setGameState] = useState("playing");
  const [highlights, setHighlights] = useState([]);
  const [showHint, setShowHint] = useState(false);

  // Thêm State để lưu trữ CHÍNH XÁC những cụm từ gợi ý mà user đã click chọn
  const [activeHintPhrases, setActiveHintPhrases] = useState([]);

  const timerRef = useRef(null);
  const articleRef = useRef(null);
  const currentQuestion = quizData[currentIndex];

  // ----------------------------------------------------------------------
  // THUẬT TOÁN NLP TÁCH CỤM TỪ TIẾNG VIỆT HOÀN HẢO
  // ----------------------------------------------------------------------
  const buildHintOptions = (question) => {
    if (!question) return [];
    
    const realKeywords = question.requiredKeywords || [];
    const content = question.content || "";

    const stopWords = [
      "một", "những", "các", "là", "và", "hoặc", "nhưng", "của", "cho", "để", "với", 
      "từ", "tại", "trên", "trong", "ngoài", "dưới", "trước", "sau", "khi", "đang", 
      "đã", "sẽ", "thì", "mà", "còn", "bị", "được", "do", "bởi", "vì", "nên", 
      "cho thấy", "thấy", "có", "này", "kia", "đó", "đây", "năm", "tháng", "ngày", 
      "đăng", "theo", "nói", "rằng", "về", "lại", "ra", "vào", "đến", "chỉ", "rất", 
      "cũng", "hơn", "nhất", "như", "việc", "sự", "bằng", "qua", "lên", "xuống"
    ].sort((a, b) => b.length - a.length);

    let processedContent = ` ${content.toLowerCase()} `;
    processedContent = processedContent.replace(/[.,;?!()[\]{}"']/g, ' | ');

    stopWords.forEach(word => {
      const regex = new RegExp(`\\s+${word}\\s+`, 'g');
      processedContent = processedContent.replace(regex, ' | ');
      processedContent = processedContent.replace(regex, ' | ');
    });

    const chunks = processedContent.split('|')
      .map(c => c.trim())
      .filter(c => c.length >= 2 && c.split(/\s+/).length <= 5);

    let fakePhrases = [];
    const addedPhrases = new Set();
    const contentLower = content.toLowerCase();

    for (let chunk of chunks) {
      const startIndex = contentLower.indexOf(chunk);
      if (startIndex !== -1) {
        const originalChunk = content.substring(startIndex, startIndex + chunk.length);
        
        const isOverlap = realKeywords.some(rk => 
          rk.toLowerCase().includes(chunk) || chunk.includes(rk.toLowerCase())
        );

        if (!isOverlap && !addedPhrases.has(chunk)) {
          fakePhrases.push(originalChunk);
          addedPhrases.add(chunk);
        }
      }
    }

    fakePhrases.sort(() => Math.random() - 0.5);
    fakePhrases = fakePhrases.slice(0, 5);

    if (fakePhrases.length < 4) {
      const backupPool = ["Nguồn tin", "Cộng đồng mạng", "Bài viết", "Hình ảnh", "Tài khoản", "Báo cáo", "Nghiên cứu"];
      for (let word of backupPool) {
        const isOverlap = realKeywords.some(rk => 
          rk.toLowerCase().includes(word.toLowerCase()) || word.toLowerCase().includes(rk.toLowerCase())
        );
        if (!isOverlap && !addedPhrases.has(word.toLowerCase())) {
          fakePhrases.push(word);
          addedPhrases.add(word.toLowerCase());
        }
        if (fakePhrases.length >= 5) break;
      }
    }

    const allOptions = [...realKeywords, ...fakePhrases];

    const seed = question.id || 0;
    const seeded = allOptions.slice();
    for (let i = seeded.length - 1; i > 0; i -= 1) {
      const r = Math.abs(Math.floor(((seed + i) * 9301 + 49297) % 233280)) / 233280;
      const j = Math.floor(r * (i + 1));
      [seeded[i], seeded[j]] = [seeded[j], seeded[i]];
    }
    
    return seeded;
  };

  const hintOptions = useMemo(() => {
    return buildHintOptions(currentQuestion);
  }, [currentQuestion]);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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
      display: 'block'
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

  useEffect(() => {
    if (gameState === "playing" && currentQuestion) {
      setHighlights([]);
      setActiveHintPhrases([]); // Reset các cụm từ gợi ý đã chọn
      setShowHint(false);
      setTimeLeft(60);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState("confirm");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [currentIndex, gameState]);

  // SỬA ĐỔI TOÀN DIỆN HÀM PHÂN TÍCH TỪ KHÓA: Giữ nguyên cụm từ người chơi đã click
  const getSelectedKeywordStats = () => {
    const cleanStr = (str) => (str || "").toLowerCase().replace(/[.,!?;:()\[\]"'’]/g, "").trim();
    
    const realKeywords = currentQuestion.requiredKeywords || [];
    
    // Phân loại trực tiếp từ mảng `activeHintPhrases` do người chơi click chọn
    const matchedKeywords = activeHintPhrases.filter(phrase => 
      realKeywords.some(keyword => cleanStr(phrase) === cleanStr(keyword))
    );

    const wrongKeywords = activeHintPhrases.filter(phrase => 
      !realKeywords.some(keyword => cleanStr(phrase) === cleanStr(keyword))
    );

    return { matchedKeywords, wrongKeywords };
  };

  const submitResult = (userChoice) => {
    clearInterval(timerRef.current);
    const isCorrect = userChoice === currentQuestion.isTrue;
    
    // Gọi hàm phân loại cụm từ nguyên bản mới cập nhật
    const { matchedKeywords, wrongKeywords } = getSelectedKeywordStats();
    
    const minKeywordsToPass = Math.max(1, Math.ceil(currentQuestion.requiredKeywords.length * 2 / 3));
    const passed = isCorrect;
    const allKeywordsFound = matchedKeywords.length === currentQuestion.requiredKeywords.length;
    
    const nextScore = passed ? score + (allKeywordsFound ? 100 : 50) : score;
    const query = `?index=${currentIndex}&score=${nextScore}`;

    navigate(
      `/result/${userChoice ? "true" : "false"}/${passed ? "pass" : "fail"}${query}`,
      {
        state: {
          currentIndex,
          score: nextScore,
          matchedKeywords, // Mảng các cụm từ đúng nguyên vẹn ("đăng, tại.")
          wrongKeywords,   // Mảng các cụm từ sai nguyên vẹn
          requiredCount: currentQuestion.requiredKeywords.length,
          minKeywordsToPass,
          passed
        }
      }
    );
  };

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
      if (rem.end <= r.start || rem.start >= r.end) {
        out.push({ ...r });
        continue;
      }
      if (rem.start <= r.start && rem.end >= r.end) {
        continue;
      }
      if (rem.start > r.start && rem.end < r.end) {
        out.push({ start: r.start, end: rem.start });
        out.push({ start: rem.end, end: r.end });
        continue;
      }
      if (rem.start <= r.start && rem.end < r.end) {
        out.push({ start: rem.end, end: r.end });
        continue;
      }
      if (rem.start > r.start && rem.end >= r.end) {
        out.push({ start: r.start, end: rem.start });
        continue;
      }
    }
    return mergeRanges(out);
  };

  // Cập nhật cả highlights VÀ mảng các cụm từ text được kích hoạt
  const handleToggleHintHighlight = (option) => {
    if (!currentQuestion || !option) return;
    const contentLower = currentQuestion.content.toLowerCase();
    const optionLower = option.trim().toLowerCase();
    
    const startIndex = contentLower.indexOf(optionLower);
    if (startIndex === -1) return;
    
    const endIndex = startIndex + option.trim().length;
    const targetRange = { start: startIndex, end: endIndex };

    const isAlreadyHighlighted = highlights.some(
      (h) => !(targetRange.end <= h.start || targetRange.start >= h.end)
    );

    if (isAlreadyHighlighted) {
      setHighlights((prev) => subtractRange(prev, targetRange));
      setActiveHintPhrases((prev) => prev.filter(p => p !== option));
    } else {
      setHighlights((prev) => mergeRanges([...prev, targetRange]));
      setActiveHintPhrases((prev) => [...prev, option]);
    }
  };

  const isHintOptionActive = (option) => {
    return activeHintPhrases.includes(option);
  };

  const evidenceSelected = highlights.length > 0;

  const handleArticleMouseUp = () => {
    if (gameState !== 'playing') return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    if (!articleRef.current || !articleRef.current.contains(range.commonAncestorContainer)) return;
    const offsets = getOffsetsFromRange(range, articleRef.current);
    if (!offsets || offsets.start === offsets.end) return;

    const rawText = currentQuestion.content.slice(offsets.start, offsets.end);

    const overlaps = highlights.some((h) => !(offsets.end <= h.start || offsets.start >= h.end));
    if (overlaps) {
      setHighlights((prev) => subtractRange(prev, offsets));
      setActiveHintPhrases((prev) => prev.filter(p => p !== rawText));
    } else {
      setHighlights((prev) => mergeRanges([...prev, offsets]));
      setActiveHintPhrases((prev) => [...prev, rawText]);
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
        <span
          key={`h-${idx}`}
          style={{
            display: 'inline',
            background: '#fde047',
            color: '#111827',
            fontWeight: 700,
            borderRadius: '2px',
            padding: '0 0.15em',
            boxShadow: 'inset 0 -6px 0 rgba(250,204,21,0.92)',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone'
          }}
        >
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
          <div style={styles.topBar}>
            <span>Bản tin kiểm chứng: {currentIndex + 1} / {quizData.length}</span>
            <span style={styles.scoreBadge}>Năng lượng: {score} PTS</span>
          </div>

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
                <button onClick={() => submitResult(true)} style={styles.actionBtn(true, false)}>
                  Xác nhận: Tin Thật
                </button>
                <button onClick={() => submitResult(false)} style={styles.actionBtn(false, false)}>
                  Xác nhận: Tin Giả
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={styles.interactiveBar}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Cơ chế: Bôi đen trên bài viết hoặc click trực tiếp các từ khóa gợi ý để bật/tắt bôi vàng.</span>
              </div>

              {currentQuestion?.hint && (
                <div style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      style={{ width: 'fit-content', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 16px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Không biết? Nhấn để xem gợi ý
                    </button>
                  ) : (
                    <div style={{ background: '#111827', border: '1px solid #334155', borderRadius: '16px', padding: '16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>Gợi ý danh sách từ tiềm năng (Click để Bật/Tắt bôi vàng):</div>
                      <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.7, margin: 0, marginBottom: '12px' }}>{currentQuestion.hint}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {hintOptions.map((word, idx) => {
                          const active = isHintOptionActive(word);
                          return (
                            <button
                              key={`hint-${idx}`}
                              type="button"
                              onClick={() => handleToggleHintHighlight(word)}
                              style={{
                                background: active ? '#fde047' : '#334155',
                                color: active ? '#111827' : '#e2e8f0',
                                padding: '6px 14px',
                                borderRadius: '99px',
                                fontSize: '13px',
                                border: active ? '1px solid #eab308' : '1px solid #475569',
                                fontWeight: active ? 700 : 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {word} {active ? '✕' : ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div style={{ ...styles.wordsContainer, display: 'block', touchAction: 'manipulation' }} onMouseUp={handleArticleMouseUp} onTouchEnd={handleArticleMouseUp} ref={articleRef}>
                <article style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.9, whiteSpace: 'pre-wrap', fontSize: '15px', userSelect: 'text', WebkitUserSelect: 'text' }}>
                  {renderWithHighlights(currentQuestion?.content || '', highlights)}
                </article>
              </div>

              <div style={styles.gridBtn}>
                <button 
                  onClick={() => submitResult(true)} 
                  disabled={!evidenceSelected || gameState !== "playing"} 
                  style={styles.actionBtn(true, !evidenceSelected || gameState !== "playing")}
                > 
                  Xác thực: Tin Thật
                </button>
                <button 
                  onClick={() => submitResult(false)} 
                  disabled={!evidenceSelected || gameState !== "playing"} 
                  style={styles.actionBtn(false, !evidenceSelected || gameState !== "playing")}
                > 
                  Bác bỏ: Tin Giả
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
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