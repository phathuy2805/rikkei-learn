import React from 'react';
import PomodoroTimer from './components/PomodoroTimer';

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
      <PomodoroTimer />
    </div>
  );
};

export default App;
