import React, { useState, useEffect, useRef } from 'react';
import './PomodoroTimer.css';

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds (1500 seconds)

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // SVG Circle calculations for progress ring
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / FOCUS_TIME) * circumference;

  // React component lifecycle hooks (via useEffect) to manage the countdown timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Trap error: Force stop when countdown reaches 0 to avoid negative values
            if (interval) clearInterval(interval);
            setIsActive(false);
            
            // Play alert sound if possible
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
            
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Clean up timer on component unmount or when dependencies update (isActive changes)
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(FOCUS_TIME);
  };

  // Helper function to format time (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-card">
      {/* Invisible HTML5 Audio for Alert */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/911/911-200.wav"
        preload="auto"
      />

      <div className="pomodoro-header">
        <h2 className="pomodoro-title">POMODORO TIMER</h2>
        <p className="pomodoro-subtitle">Giữ tập trung tối đa cho công việc</p>
      </div>

      <div className="timer-display-container">
        {/* SVG Progress Ring */}
        <svg className="progress-ring" width="220" height="220">
          <circle
            className="progress-ring-bg"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="110"
            cy="110"
          />
          <circle
            className={`progress-ring-indicator ${timeLeft === 0 ? 'pulse-error' : ''}`}
            stroke="var(--color-primary)"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="110"
            cy="110"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Central Time Text */}
        <div className="time-text-wrapper">
          {timeLeft === 0 ? (
            <span className="time-alert animate-bounce">Hết giờ!</span>
          ) : (
            <span className="time-numbers">{formatTime(timeLeft)}</span>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="timer-controls">
        {isActive ? (
          <button onClick={handlePause} className="btn-control btn-pause" aria-label="Tạm dừng">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            Tạm dừng
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="btn-control btn-play"
            disabled={timeLeft === 0}
            aria-label="Bắt đầu"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Bắt đầu
          </button>
        )}

        <button onClick={handleReset} className="btn-control btn-reset" aria-label="Đặt lại">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          Đặt lại
        </button>
      </div>

      <div className="pomodoro-footer">
        {timeLeft === 0 ? (
          <p className="footer-status error">⏰ Đã hoàn thành phiên tập trung!</p>
        ) : isActive ? (
          <p className="footer-status active">⚡️ Đang đếm ngược... Chúc bạn làm việc hiệu quả!</p>
        ) : (
          <p className="footer-status idle">⏸ Đang tạm dừng. Sẵn sàng khi bạn bắt đầu.</p>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
