import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { quizData } from "../data/quizData";
import "../css/FakeNewsHunter.css"; 

export default function FakeNewsHunter() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ----------------------------------------------------------------------
  // CƠ CHẾ GIỮ NGUYÊN HOẶC XÁO TRỘN NGẪU NHIÊN DANH SÁCH CÂU HỎI
  // ----------------------------------------------------------------------
  const shuffledQuestions = useMemo(() => {
    // Nếu trang Result gửi mảng cũ quay lại, dùng luôn để giữ đúng tiến trình chơi
    if (location.state?.shuffledQuestions && location.state.shuffledQuestions.length > 0) {
      return location.state.shuffledQuestions;
    }
    
    // Nếu bắt đầu một chiến dịch mới hoàn toàn, tiến hành xáo trộn Fisher-Yates
    const array = [...quizData];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, [location.state?.shuffledQuestions]);

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
  const [activeHintPhrases, setActiveHintPhrases] = useState([]);

  const timerRef = useRef(null);
  const articleRef = useRef(null);
  
  // Lấy câu hỏi hiện tại từ danh sách đang được phân phối ổn định
  const currentQuestion = shuffledQuestions[currentIndex];

  const cleanStr = (str) => {
    return (str || "")
      .toLowerCase()
      .replace(/[.,!?;:()\[\]"'’`“”]/g, "")
      .trim();
  };

  const buildHintOptions = (question) => {
    if (!question) return [];
    
    const realKeywords = question.requiredKeywords || [];
    const fakeKeywords = question.fakeKeywords || []; 

    const allOptions = [...realKeywords, ...fakeKeywords];

    // Trộn các từ gợi ý dựa trên id câu hỏi để cố định layout nút bấm không bị nhảy khi re-render
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

  useEffect(() => {
    if (gameState === "playing" && currentQuestion && currentIndex < shuffledQuestions.length) {
      setHighlights([]);
      setActiveHintPhrases([]);
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
    } else if (currentIndex >= shuffledQuestions.length) {
      setGameState("summary");
    }
    return () => clearInterval(timerRef.current);
  }, [currentIndex, gameState, currentQuestion, shuffledQuestions.length]);

  const getSelectedKeywordStats = () => {
    const realKeywords = currentQuestion.requiredKeywords || [];
    const cleanRealKeywords = realKeywords.map(rk => cleanStr(rk));
    
    const matchedKeywords = [];
    const wrongKeywords = [];

    activeHintPhrases.forEach(phrase => {
      const cleanedPhrase = cleanStr(phrase);
      
      const isCorrect = cleanRealKeywords.some(rk => 
        rk.includes(cleanedPhrase) || cleanedPhrase.includes(rk)
      );

      if (isCorrect) {
        matchedKeywords.push(phrase);
      } else {
        wrongKeywords.push(phrase);
      }
    });

    return { matchedKeywords, wrongKeywords };
  };

  const submitResult = (userChoice) => {
    clearInterval(timerRef.current);
    const isCorrect = userChoice === currentQuestion.isTrue;
    
    const { matchedKeywords, wrongKeywords } = getSelectedKeywordStats();
    const minKeywordsToPass = Math.max(1, Math.ceil(currentQuestion.requiredKeywords.length * 2 / 3));
    
    const passed = isCorrect && (matchedKeywords.length >= minKeywordsToPass);
    const allKeywordsFound = matchedKeywords.length === currentQuestion.requiredKeywords.length;
    
    const nextScore = passed ? score + (allKeywordsFound ? 100 : 50) : score;

    // Chỉ kết thúc trò chơi hoàn toàn nếu đó là câu cuối cùng VÀ người chơi vượt qua được thử thách (passed)
    if (currentIndex >= shuffledQuestions.length - 1 && passed) {
      setScore(nextScore);
      setGameState("summary");
    } else {
      const query = `?index=${currentIndex}&score=${nextScore}`;
      navigate(
        `/result/${userChoice ? "true" : "false"}/${passed ? "pass" : "fail"}${query}`,
        {
          state: {
            currentIndex,
            score: nextScore,
            shuffledQuestions, // <--- Gửi kèm mảng đã xáo trộn sang trang kết quả
            matchedKeywords,
            wrongKeywords,
            requiredCount: currentQuestion.requiredKeywords.length,
            minKeywordsToPass,
            passed
          }
        }
      );
    }
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

  const handleToggleHintHighlight = (option) => {
    if (!currentQuestion || !option) return;
    const contentLower = currentQuestion.content.toLowerCase();
    const optionLower = option.trim().toLowerCase();
    
    const startIndex = contentLower.indexOf(optionLower);
    
    if (startIndex === -1) {
      const isAlreadyActive = activeHintPhrases.some(p => cleanStr(p) === cleanStr(option));
      if (isAlreadyActive) {
        setActiveHintPhrases((prev) => prev.filter(p => cleanStr(p) !== cleanStr(option)));
      } else {
        setActiveHintPhrases((prev) => [...prev, option]);
      }
      return;
    }
    
    const endIndex = startIndex + option.trim().length;
    const targetRange = { start: startIndex, end: endIndex };

    const isAlreadyHighlighted = highlights.some(
      (h) => !(targetRange.end <= h.start || targetRange.start >= h.end)
    );

    if (isAlreadyHighlighted) {
      setHighlights((prev) => subtractRange(prev, targetRange));
      setActiveHintPhrases((prev) => prev.filter(p => cleanStr(p) !== cleanStr(option)));
    } else {
      setHighlights((prev) => mergeRanges([...prev, targetRange]));
      setActiveHintPhrases((prev) => [...prev, option]);
    }
  };

  const isHintOptionActive = (option) => {
    return activeHintPhrases.some(p => cleanStr(p) === cleanStr(option));
  };

  const evidenceSelected = highlights.length > 0 || activeHintPhrases.length > 0;

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
      setActiveHintPhrases((prev) => prev.filter(p => cleanStr(p) !== cleanStr(rawText)));
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
        <span key={`h-${idx}`} className="fnh-highlight-text">
          {text.slice(r.start, r.end)}
        </span>
      );
      last = r.end;
    });
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };

  return (
    <div className="fnh-container">
      {gameState !== "summary" && currentQuestion ? (
        <div className="fnh-card">
          <div className="fnh-topbar">
            <span>Bản tin kiểm chứng: {currentIndex + 1} / {shuffledQuestions.length}</span>
          </div>

          <div className="fnh-header-row">
            <div>
              <h1 className="fnh-title">Fake News Hunter 🔍</h1>
              <p className="fnh-subtitle">Bấm chọn các từ khóa cấu thành chứng cứ giả mạo hoặc xác thực.</p>
            </div>
            <div className={`fnh-timer ${timeLeft <= 10 ? "low-time" : ""}`}>
              {timeLeft === 0 ? "00:00" : `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`}
            </div>
          </div>

          {gameState === "confirm" ? (
            <div style={{ padding: '24px 0' }}>
              <div className="fnh-result-alert warning">
                <div style={{ fontWeight: 800, fontSize: '18px', color: '#fff', marginBottom: '10px' }}>
                  ⏰ Hết giờ rồi! Hãy xác nhận tin này là Tin Thật hay Tin Giả.
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '16px' }}>
                  Bạn vẫn có thể chọn đáp án cuối cùng để ghi nhận kết luận.
                </p>
              </div>
              <div className="fnh-confirm-box">
                <strong>Nội dung bản tin:</strong>
                <p style={{ margin: '12px 0 0 0', lineHeight: 1.8, fontSize: '15px' }}>{currentQuestion?.content}</p>
              </div>
              <div className="fnh-grid-btn">
                <button onClick={() => submitResult(true)} className="fnh-btn-action fnh-btn-true">
                  Xác nhận: Tin Thật
                </button>
                <button onClick={() => submitResult(false)} className="fnh-btn-action fnh-btn-false">
                  Xác nhận: Tin Giả
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="fnh-interactive-bar">
                <span>Cơ chế: Bôi đen trên bài viết hoặc click trực tiếp các từ khóa gợi ý để bật/tắt bôi vàng.</span>
              </div>

              {currentQuestion?.hint && (
                <div style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {!showHint ? (
                    <button onClick={() => setShowHint(true)} className="fnh-hint-trigger-btn">
                      Không biết? Nhấn để xem gợi ý
                    </button>
                  ) : (
                    <div className="fnh-hint-wrapper">
                      <div className="fnh-hint-title">Gợi ý danh sách từ tiềm năng (Click để Bật/Tắt bôi vàng):</div>
                      <p className="fnh-hint-desc">{currentQuestion.hint}</p>
                      <div className="fnh-hint-tags-flex">
                        {hintOptions.map((word, idx) => {
                          const active = isHintOptionActive(word);
                          return (
                            <button
                              key={`hint-${idx}`}
                              type="button"
                              onClick={() => handleToggleHintHighlight(word)}
                              className={`fnh-tag-btn ${active ? "active" : ""}`}
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

              <div className="fnh-words-container" onMouseUp={handleArticleMouseUp} onTouchEnd={handleArticleMouseUp} ref={articleRef}>
                <article>
                  {renderWithHighlights(currentQuestion?.content || '', highlights)}
                </article>
              </div>

              <div className="fnh-grid-btn">
                <button 
                  onClick={() => submitResult(true)} 
                  disabled={!evidenceSelected || gameState !== "playing"} 
                  className="fnh-btn-action fnh-btn-true"
                > 
                  Xác thực: Tin Thật
                </button>
                <button 
                  onClick={() => submitResult(false)} 
                  disabled={!evidenceSelected || gameState !== "playing"} 
                  className="fnh-btn-action fnh-btn-false"
                > 
                  Bác bỏ: Tin Giả
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="fnh-card fnh-card-summary">
          <h2 style={{ fontSize: '24px', fontWeight: 900 }}>🏆 HOÀN THÀNH CHIẾN DỊCH</h2>
          <div className="fnh-score-box">
            <div className="fnh-score-label">Tổng điểm Hunter</div>
            <div className="fnh-score-number">{score} <span>/ {shuffledQuestions.length * 10}</span></div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}>
            {score >= (shuffledQuestions.length * 10) * 0.8 ? "Tuyệt vời! Bạn là bộ lọc tối tân không thể bị thao túng! 🌟" : "Hoàn thành! Hãy tiếp tục tỉnh táo trước các luồng tin mạng. 🤔"}
          </p>
          <button
            onClick={() => { window.location.reload(); }}
            className="fnh-btn-restart"
          >
            Tái khởi động Radar 🔄
          </button>
        </div>
      )}
    </div>
  );
}