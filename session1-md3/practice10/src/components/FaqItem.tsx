import React from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button 
        type="button" 
        className="faq-question-btn" 
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-question-text">{question}</span>
        <span className={`faq-icon ${isOpen ? 'rotate' : ''}`}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      
      {isOpen && (
        <div className="faq-answer">
          <p className="faq-answer-text">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
