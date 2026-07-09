import React from 'react';
import LoginForm from './components/LoginForm';

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
      <LoginForm />
    </div>
  );
};

export default App;
