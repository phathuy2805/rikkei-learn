import React from 'react';
import CartCounter from './components/CartCounter';

const App: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '24px',
      gap: '20px',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontFamily: 'sans-serif',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: '10px'
      }}>
        Bài Thực Hành 2: Module Giỏ Hàng
      </h2>
      
      <CartCounter />
    </div>
  );
};

export default App;
