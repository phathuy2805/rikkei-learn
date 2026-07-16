import React from 'react';
import FaqList from './components/FaqList';

const App: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '24px',
      boxSizing: 'border-box'
    }}>
      <FaqList />
    </div>
  );
};

export default App;
