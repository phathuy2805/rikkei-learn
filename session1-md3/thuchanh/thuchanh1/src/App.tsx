import React from 'react';
import UserProfile from './components/UserProfile';

const App: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '24px',
      gap: '20px',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontFamily: 'var(--font-title)',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '10px'
      }}>
        Thông Tin Nhân Viên
      </h2>
      
      <UserProfile 
        name="Nguyễn Văn A" 
        role="Lập trình viên React Senior" 
        email="nguyenvana@rikkeisoft.com" 
      />
    </div>
  );
};

export default App;
