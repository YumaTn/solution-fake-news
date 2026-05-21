import React from "react";
import { Link, useNavigate, useLocation, useSearchParams, useParams } from "react-router-dom";
import "../css/ResultPage.css"; 

export default function ResultPage() {
  const { outcome } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Nhận mảng đã xáo trộn từ màn hình Game gửi qua
  const shuffledQuestions = location.state?.shuffledQuestions || [];

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
  
  // Kiểm tra độ dài dựa trên mảng ĐÃ XÁO TRỘN
  const hasMore = nextIndex < shuffledQuestions.length;
  const userChoice = outcome === "true";
  
  // Xác định câu hỏi hiện tại từ mảng đã xáo trộn
  const currentQuestion = shuffledQuestions[currentIndex];
  const actualCorrect = currentQuestion?.isTrue === userChoice;

  const matchedKeywords = location.state?.matchedKeywords || [];
  const wrongKeywords = location.state?.wrongKeywords || [];
  const requiredCount = (location.state?.requiredCount ?? currentQuestion?.requiredKeywords.length) || 0;

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
    <div className="result-container">
      <div 
        className="result-card" 
        style={{ 
          "--accent-color": accentColor, 
          "--shadow-color": `${accentColor}33` 
        }}
      >
        <div className="result-header">
          <div className="result-icon-box">
            {icon}
          </div>
          <div>
            <p className="result-tagline">KẾT QUẢ KIỂM CHỨNG</p>
            <h1 className="result-title">{title}</h1>
          </div>
        </div>

        <div className="result-info-box">
          <p className="result-message">{message}</p>

          {/* Hiển thị tóm tắt Note nếu đoán sai hoặc thiếu chứng cứ để học hỏi */}
          {!passed && currentQuestion?.note && (
            <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '14px', borderLeft: `4px solid ${accentColor}` }}>
              <strong>Mẹo phân tích:</strong> {currentQuestion.note}
            </div>
          )}

          {/* Nguồn kiểm chứng bài báo thực tế */}
          {currentQuestion?.isTrue && currentQuestion?.url && (
            <div className="result-url-box">
              <span className="url-icon">🔗</span>
              <span className="url-text">
                Nguồn kiểm chứng thực tế:{" "}
                <a 
                  href={currentQuestion.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="url-link"
                >
                  Xem bài báo nghiên cứu gốc
                </a>
              </span>
            </div>
          )}

          <div className="result-stats-wrapper">
            <div className="result-general-stat">
              Tiến độ chứng cứ: <strong>{matchedKeywords.length}</strong> / {requiredCount} từ khóa đúng (Yêu cầu để Pass: {minKeywordsToPass})
            </div>

            {matchedKeywords.length > 0 && (
              <div className="keyword-section">
                <span className="keyword-title-correct">
                  ✓ Chứng cứ chính xác đã thu thập:
                </span>
                <div className="keyword-flex">
                  {matchedKeywords.map((word, idx) => (
                    <span key={`match-${idx}`} className="tag-matched">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="keyword-section">
              <span className={wrongKeywords.length > 0 ? "keyword-title-wrong" : "keyword-title-none"}>
                ✕ Từ khóa nhiễu / Chọn sai:
              </span>
              {wrongKeywords.length > 0 ? (
                <div className="keyword-flex">
                  {wrongKeywords.map((word, idx) => (
                    <span key={`wrong-${idx}`} className="tag-wrong">
                      {word.replace(/[.,!?;:]/g, "")}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="txt-italic-none">
                  Tuyệt vời, không chọn nhầm dữ liệu nhiễu nào.
                </span>
              )}
            </div>

          </div>
        </div>

        <div className="result-actions-grid">
          <button
            onClick={() => {
              if (!passed) {
                // Làm lại chính câu đó: giữ nguyên currentIndex và truyền ngược lại mảng shuffledQuestions
                navigate("/game", { 
                  state: { currentIndex, score, shuffledQuestions } 
                });
              } else if (hasMore) {
                // Sang câu tiếp theo: chuyển thành nextIndex và truyền ngược lại mảng shuffledQuestions
                navigate("/game", { 
                  state: { currentIndex: nextIndex, score, shuffledQuestions } 
                });
              } else {
                navigate("/");
              }
            }}
            className="btn-primary-action"
          >
            {!passed ? "Làm lại" : hasMore ? "Câu tiếp theo" : "Hoàn thành chiến dịch"}
          </button>
          
          <Link to="/" className="btn-secondary-link">
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}