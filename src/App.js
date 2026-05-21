import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FakeNewsHunter from './component/FakeNewsHunter';
import ResultPage from './component/ResultPage';
// Import hình ảnh nhân vật vào dự án
import characterImg from '../src/asset/logo.jpg'; 

function Home() {
  return (
    <div className="home-screen">
      <div className="background-glow glow-1"></div>
      <div className="background-glow glow-2"></div>
      <div className="background-glow glow-3"></div>
      <div className="hero-card">
        {/* Khu vực Header chứa LOGO hình ảnh đặt kế bên chữ MindRank */}
        <div className="hero-header-logo">
          <div className="hero-tag">MindRank</div>
          <img src={characterImg} alt="MindRank Character" className="hero-char-icon" />
        </div>

        <h1>Chạm vào sự thật. Chặn đứng tin giả.</h1>
        <p>
          Bước vào chiến trường kiểm chứng tin tức với trải nghiệm hấp dẫn và trực quan.
          Nhận dạng bản tin thật / giả, khám phá manh mối và tăng điểm với mỗi quyết định chính xác.
        </p>
        <div className="hero-actions">
          <Link to="/game" className="hero-button">
            <span className="button-icon">🚀</span>Bắt đầu trò chơi
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon">📰</div>
            <span>20+</span>
            <small>Bản tin</small>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛡️</div>
            <span>Real vs Fake</span>
            <small>Thực tế & giả mạo</small>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <span>1 phút</span>
            <small>Mỗi lượt chơi</small>
          </div>
        </div>
      </div>
      <div className="feature-grid">
        <div className="feature-box">
          <div className="feature-icon">⚡</div>
          <h2>Thách thức nhanh</h2>
          <p>Học cách nhận diện tin giả qua dấu hiệu nguồn tin mập mờ, số liệu phi thực tế và ngôn ngữ thao túng.</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">🎮</div>
          <h2>Giao diện game</h2>
          <p>Thiết kế hiện đại, màu sắc tươi sáng và trải nghiệm kéo thả giúp người chơi dễ tiếp cận.</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">🔥</div>
          <h2>Chiến dịch tăng điểm</h2>
          <p>Tích lũy điểm bằng cách chọn đúng và chiến thắng thử thách mỗi vòng.</p>
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<FakeNewsHunter />} />
        <Route path="/result/:outcome/:status" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;