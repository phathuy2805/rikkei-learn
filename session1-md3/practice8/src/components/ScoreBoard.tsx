import { Component } from 'react';
import './ScoreBoard.css';

interface ScoreBoardProps {
  score: number;
}

class ScoreBoard extends Component<ScoreBoardProps> {
  shouldComponentUpdate(nextProps: ScoreBoardProps) {
    // Compare next score with current score
    const shouldUpdate = nextProps.score !== this.props.score;
    
    console.log(
      `[ScoreBoard] shouldComponentUpdate: ${shouldUpdate ? 'TRUE (Re-rendering...)' : 'FALSE (Skip render)'}`,
      `{ Current Score: ${this.props.score}, Next Score: ${nextProps.score} }`
    );
    
    return shouldUpdate;
  }

  render() {
    console.log('[ScoreBoard] Render method executed!');
    return (
      <div className="scoreboard-card">
        <h3 className="scoreboard-title">BẢNG ĐIỂM CHI TIẾT</h3>
        <div className="score-badge">
          <span className="score-number">{this.props.score}</span>
          <span className="score-label">Points</span>
        </div>
        <p className="scoreboard-status">
          <span className="pulse-dot"></span>
          Đang giám sát điểm số thời gian thực...
        </p>
      </div>
    );
  }
}

export default ScoreBoard;
