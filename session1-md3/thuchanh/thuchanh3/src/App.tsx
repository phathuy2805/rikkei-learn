import React from 'react';
import BookStore from './components/BookStore';

const App: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f1f5f9',
      padding: '24px',
      gap: '20px',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontFamily: 'sans-serif',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#0f172a',
        marginBottom: '10px'
      }}>
        Bài Thực Hành 3: Quản Lý Sản Phẩm
      </h2>
      
      <BookStore />
    </div>
  );
};

export default App;
