import React from "react";
import { Link, useNavigate, useLocation, useSearchParams, useParams } from "react-router-dom";
import { quizData } from "../data/quizData";

export default function ResultPage() {
  const { outcome, status } = useParams();
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
  const isTrue = outcome === "true";
  const isFalse = outcome === "false";
  const isCorrect = status === "correct";
  const isWrong = !isCorrect;

  const title = isCorrect
    ? isTrue
      ? "Chính xác! Bạn đã xác định đúng: Tin Thật"
      : "Tuyệt vời! Bạn đã xác định đúng: Tin Giả"
    : isTrue
      ? "Sai rồi! Đây là tin giả"
      : "Sai rồi! Đây là tin thật";

  const message = isCorrect
    ? isTrue
      ? "Bài báo này có đủ dấu hiệu xác thực: nguồn tin minh bạch, thời gian rõ ràng và số liệu được trích dẫn cụ thể."
      : "Bạn đã nắm bắt được dấu hiệu tin giả: lời lẽ thao túng, nguồn ẩn danh và thông tin thiếu rõ ràng."
    : isTrue
      ? "Quá tiếc! Tin này là tin giả, bạn đã chọn Tin Thật. Hãy xem lại các dấu hiệu sai lệch và thử lại." 
      : "Quá tiếc! Tin này là tin thật, bạn đã chọn Tin Giả. Hãy xem lại nguồn tin và thử lại.";

  const accentColor = isTrue ? "#22c55e" : "#ef4444";
  const icon = isTrue ? "✅" : isFalse ? "🛑" : "🔎";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(16,185,129,0.14), transparent 20%), #0f172a",
      color: "#f8fafc"
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
            <h1 style={{ fontSize: "2.35rem", margin: "10px 0 0", lineHeight: 1.05, color: "#fff" }}>{title}</h1>
          </div>
        </div>

        <div style={{
          background: "rgba(148,163,184,0.08)",
          border: "1px solid rgba(148,163,184,0.12)",
          borderRadius: "22px",
          padding: "24px 24px 20px",
          marginBottom: "26px"
        }}>
          <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.75, color: "#cbd5e1" }}>{message}</p>
        </div>

        <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr 1fr" }}>
          <button
            onClick={() => {
              if (isWrong) {
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
              boxShadow: "0 12px 28px rgba(56,189,248,0.24)"
            }}
          >
            {isWrong ? "Làm lại" : hasMore ? "Câu tiếp theo" : "Hoàn thành chiến dịch"}
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
