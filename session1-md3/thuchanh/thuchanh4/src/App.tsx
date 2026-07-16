import React, { useState } from 'react';
import RealTimeClock from './components/RealTimeClock';

const App: React.FC = () => {
  const [showClock, setShowClock] = useState(true);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      padding: '24px',
      gap: '24px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#f8fafc',
        marginBottom: '10px'
      }}>
        Bài Thực Hành 4: Quản Lý Life-Cycle
      </h2>

      <button 
        onClick={() => setShowClock(!showClock)}
        style={{
          padding: '10px 20px',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: showClock ? '#ef4444' : '#10b981',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        {showClock ? 'Ẩn đồng hồ (Unmount)' : 'Hiện đồng hồ (Mount)'}
      </button>

      {showClock && <RealTimeClock />}
    </div>
  );
};

export default App;
