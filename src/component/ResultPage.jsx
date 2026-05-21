import React from "react";
import { Link, useNavigate, useLocation, useSearchParams, useParams } from "react-router-dom";
import { quizData } from "../data/quizData";

export default function ResultPage() {
  const { outcome } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const indexParam = searchParams.get("index");
  const scoreParam = searchParams.get("score");
  const parsedIndex = indexParam !== null ? Number(indexParam) : NaN;
  const parsedScore = scoreParam !== null ? Number(scoreParam) : NaN;

  const currentIndex = Number.isFinite(parsedIndex)
    ? parsedIndex
    : location.state?.currentIndex ?? 0;
  const score = Number.isFinite(parsedScore)
    ? parsedScore
    : location.state?.score ?? 0;
  const nextIndex = currentIndex + 1;
  const hasMore = nextIndex < quizData.length;
  const userChoice = outcome === "true";
  const actualCorrect = quizData[currentIndex]?.isTrue === userChoice;

  const matchedKeywords = location.state?.matchedKeywords || [];
  const wrongKeywords = location.state?.wrongKeywords || [];
  const requiredCount = (location.state?.requiredCount ?? quizData[currentIndex]?.requiredKeywords.length) || 0;

  const minKeywordsToPass = location.state?.minKeywordsToPass ?? Math.max(1, Math.ceil(requiredCount * 2 / 3));

  const passed = actualCorrect && (matchedKeywords.length >= minKeywordsToPass);

  const title = actualCorrect
    ? passed
      ? userChoice
        ? "Chính xác! Bạn đã xác định đúng: Tin Thật"
        : "Tuyệt vời! Bạn đã xác định đúng: Tin Giả"
      : "Chưa đủ chứng cứ, hãy thử lại"
    : userChoice
      ? "Sai rồi! Đây là tin giả"
      : "Sai rồi! Đây là tin thật";

  const message = actualCorrect
    ? passed
      ? "Bạn đã trả lời đúng và có đủ chứng cứ. Tiếp tục câu tiếp theo."
      : `Bạn trả lời đúng loại tin nhưng chưa chọn đủ tối thiểu 2/3 từ khóa quan trọng (${minKeywordsToPass}/${requiredCount} từ). Hãy làm lại với nhiều bằng chứng hơn.`
    : userChoice
      ? "Quá tiếc! Tin này là tin giả, bạn đã chọn Tin Thật. Hãy xem lại các dấu hiệu sai lệch và thử lại."
      : "Quá tiếc! Tin này là tin thật, bạn đã chọn Tin Giả. Hãy xem lại nguồn tin và thử lại.";

  let accentColor = "#ef4444"; 
  let icon = "🛑";

  if (actualCorrect) {
    if (passed) {
      accentColor = "#22c55e"; 
      icon = "✅";
    } else {
      accentColor = "#f59e0b"; 
      icon = "🔎";
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(16,185,129,0.14), transparent 20%), #0f172a",
      color: "#f8fafc",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "760px",
        background: "rgba(15,23,42,0.96)",
        border: "1px solid rgba(148,163,184,0.18)",
        borderRadius: "28px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        padding: "36px 34px",
        overflow: "hidden"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "20px" }}>
          <div style={{
            minWidth: "80px",
            minHeight: "80px",
            borderRadius: "24px",
            display: "grid",
            placeItems: "center",
            background: accentColor,
            color: "#0f172a",
            fontSize: "2.7rem",
            boxShadow: `0 18px 40px ${accentColor}33`
          }}>
            {icon}
          </div>
          <div>
            <p style={{ textTransform: "uppercase", letterSpacing: "1.8px", color: "#60a5fa", fontSize: "0.8rem", margin: 0, fontWeight: 700 }}>KẾT QUẢ KIỂM CHỨNG</p>
            <h1 style={{ fontSize: "2.35rem", margin: "10px 0 0", lineHeight: 1.05, color: "#fff", fontWeight: 800 }}>{title}</h1>
          </div>
        </div>

        <div style={{
          background: "rgba(148,163,184,0.08)",
          border: "1px solid rgba(148,163,184,0.12)",
          borderRadius: "22px",
          padding: "24px 24px 24px",
          marginBottom: "26px"
        }}>
          <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.75, color: "#cbd5e1" }}>{message}</p>

          {/* ---------------------------------------------------------------------- */}
          {/* KHU VỰC THAY ĐỔI: HIỂN THỊ TỪ KHÓA TINH XẢO DẠNG GAMING BADGES */}
          {/* ---------------------------------------------------------------------- */}
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {/* Thống kê chung */}
            <div style={{ color: "#fff", fontSize: "0.95rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px" }}>
              Tiến độ chứng cứ: <strong style={{ color: "#38bdf8", fontSize: "1.1rem" }}>{matchedKeywords.length}</strong> / {requiredCount} từ khóa đúng (Yêu cầu để Pass: {minKeywordsToPass})
            </div>

            {/* Danh sách từ khóa ĐÚNG đã chọn */}
            {matchedKeywords.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ color: "#4ade80", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  ✓ Chứng cứ chính xác đã thu thập:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {matchedKeywords.map((word, idx) => (
                    <span key={`match-${idx}`} style={{
                      background: "rgba(34, 197, 94, 0.12)",
                      color: "#4ade80",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      padding: "5px 12px",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      boxShadow: "0 2px 8px rgba(34, 197, 94, 0.05)"
                    }}>
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Danh sách từ khóa SAI đã chọn */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ color: wrongKeywords.length > 0 ? "#f87171" : "#94a3b8", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                ✕ Từ khóa nhiễu / Chọn sai:
              </span>
              {wrongKeywords.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {wrongKeywords.map((word, idx) => (
                    <span key={`wrong-${idx}`} style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      color: "#f87171",
                      border: "1px solid rgba(239, 68, 68, 0.25)",
                      padding: "5px 12px",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.05)"
                    }}>
                      {word.replace(/[.,!?;:]/g, "")} {/* Làm sạch các dấu câu thừa bám đuôi từ */}
                    </span>
                  ))}
                </div>
              ) : (
                <span style={{ color: "#64748b", fontSize: "0.9rem", fontStyle: "italic" }}>
                  Tuyệt vời, không chọn nhầm dữ liệu nhiễu nào.
                </span>
              )}
            </div>

          </div>
          {/* ---------------------------------------------------------------------- */}

        </div>

        <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr 1fr" }}>
          <button
            onClick={() => {
              if (!passed) {
                navigate("/game", { state: { currentIndex, score } });
              } else if (hasMore) {
                navigate("/game", { state: { currentIndex: nextIndex, score } });
              } else {
                navigate("/");
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 18px",
              borderRadius: "14px",
              fontWeight: 700,
              color: "#0f172a",
              background: "#38bdf8",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 12px 28px rgba(56,189,248,0.24)",
              transition: "transform 0.1s ease"
            }}
          >
            {!passed ? "Làm lại" : hasMore ? "Câu tiếp theo" : "Hoàn thành chiến dịch"}
          </button>
          
          <Link to="/" style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 18px",
            borderRadius: "14px",
            fontWeight: 700,
            color: "#fff",
            background: "rgba(148,163,184,0.16)",
            textDecoration: "none",
            border: "1px solid rgba(148,163,184,0.24)"
          }}>
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}