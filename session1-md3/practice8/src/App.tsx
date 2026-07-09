import React, { useState, useEffect } from 'react';
import ScoreBoard from './components/ScoreBoard';

const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [parentTicks, setParentTicks] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Parent Timer ticks every 1 second
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setParentTicks((prev) => prev + 1);
        console.log(`[Parent App] Rendering Tick #${parentTicks + 1} - score passed down: ${score}`);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, parentTicks, score]);

  const handleIncrementScore = () => {
    setScore((prev) => prev + 10);
  };

  const handleReset = () => {
    setScore(0);
    setParentTicks(0);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '24px',
      gap: '30px',
      boxSizing: 'border-box'
    }}>
      {/* Simulation Controller Panel */}
      <div style={{
        background: 'rgba(21, 27, 43, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '28px 32px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-title)',
          fontSize: '1.25rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          BỘ GIẢ LẬP CẬP NHẬT (PARENT)
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Số lần Parent Render (mỗi 1s):</span>
            <strong style={{ color: 'var(--color-primary)' }}>{parentTicks}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Trạng thái Timer:</span>
            <strong style={{ color: isTimerRunning ? 'var(--color-success)' : '#f87171' }}>
              {isTimerRunning ? 'Đang chạy' : 'Tạm dừng'}
            </strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <button
            onClick={handleIncrementScore}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, hsl(263, 70%, 50%) 100%)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-title)',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            Tăng Điểm (+10)
          </button>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {isTimerRunning ? 'Tạm Dừng Timer' : 'Chạy Tiếp Timer'}
            </button>
            
            <button
              onClick={handleReset}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                background: 'rgba(239, 68, 68, 0.05)',
                color: '#f87171',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginTop: '16px',
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          💡 Hãy mở F12 Console để xem cách <code>shouldComponentUpdate</code> chặn việc re-render của Component con khi điểm số không thay đổi!
        </p>
      </div>

      {/* Child Score Board Component */}
      <ScoreBoard score={score} />
    </div>
  );
};

export default App;
