import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveQuizResult, loadQuizResult } from '../../utils/storage';
import SectionWrapper from '../common/SectionWrapper';
import './SpeedQuiz.css';

const QUESTIONS = [
  {
    id: 'genre',
    question: 'What genre do you mostly listen to?',
    options: [
      { value: 'fiction', label: 'Fiction / Novels', score: 1 },
      { value: 'nonfiction', label: 'Non-fiction', score: 1.5 },
      { value: 'selfhelp', label: 'Self-help / Business', score: 1.75 },
      { value: 'technical', label: 'Technical / Educational', score: 1.25 }
    ]
  },
  {
    id: 'experience',
    question: 'How experienced are you with audiobooks?',
    options: [
      { value: 'beginner', label: 'Just started', score: 1 },
      { value: 'regular', label: 'Listen regularly', score: 1.5 },
      { value: 'power', label: 'Power listener (10+ books/year)', score: 2 }
    ]
  },
  {
    id: 'context',
    question: "What's your main listening context?",
    options: [
      { value: 'commute', label: 'Commuting / Driving', score: 1.5 },
      { value: 'gym', label: 'Working out', score: 1.75 },
      { value: 'relaxing', label: 'Relaxing / Before bed', score: 1 },
      { value: 'multitask', label: 'While doing chores', score: 1.75 }
    ]
  },
  {
    id: 'relisten',
    question: 'Do you re-listen to passages often?',
    options: [
      { value: 'yes', label: 'Yes, frequently', score: 1 },
      { value: 'sometimes', label: 'Occasionally', score: 1.5 },
      { value: 'never', label: 'Rarely / Never', score: 2 }
    ]
  }
];

const PERSONALITIES = [
  {
    id: 'cruiser',
    name: 'The Cruiser',
    speedRange: [1, 1.25],
    description: 'You savor every word and appreciate the full performance. Quality over quantity.',
    emoji: '🐢',
    color: '#28a745'
  },
  {
    id: 'optimizer',
    name: 'The Optimizer',
    speedRange: [1.3, 1.7],
    description: 'Perfect balance of speed and comprehension. You get the best of both worlds.',
    emoji: '⚡',
    color: '#ffc107'
  },
  {
    id: 'speedrunner',
    name: 'The Speedrunner',
    speedRange: [1.75, 3],
    description: 'Maximum books, minimum time. You devour content at lightning speed.',
    emoji: '🚀',
    color: '#dc3545'
  }
];

export default function SpeedQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(loadQuizResult());
  const [showResult, setShowResult] = useState(!!loadQuizResult());

  const handleAnswer = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const totalScore = Object.entries(finalAnswers).reduce((sum, [_, option]) => sum + option.score, 0);
    const avgScore = totalScore / QUESTIONS.length;

    const personality = PERSONALITIES.find(p => avgScore >= p.speedRange[0] && avgScore <= p.speedRange[1]);
    const recommendedSpeed = Math.round(avgScore * 20) / 20; // Round to nearest 0.05

    const quizResult = {
      personality,
      recommendedSpeed,
      answers: finalAnswers,
      timestamp: new Date().toISOString()
    };

    setResult(quizResult);
    setShowResult(true);
    saveQuizResult(quizResult);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowResult(false);
  };

  if (showResult && result) {
    return (
      <SectionWrapper id="quiz" dark>
        <motion.div
          className="quiz-result"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="result-emoji">{result.personality.emoji}</div>
          <h2 className="result-title">You're {result.personality.name}!</h2>
          <p className="result-description">{result.personality.description}</p>

          <div className="recommended-speed-card" style={{ borderColor: result.personality.color }}>
            <div className="recommended-label">Your Recommended Speed</div>
            <div className="recommended-value" style={{ color: result.personality.color }}>
              {result.recommendedSpeed.toFixed(2)}x
            </div>
          </div>

          <button onClick={resetQuiz} className="retake-btn">
            Retake Quiz
          </button>
        </motion.div>
      </SectionWrapper>
    );
  }

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];

  return (
    <SectionWrapper id="quiz" dark>
      <h2 className="section-title">Find Your Speed Personality</h2>
      <p className="section-description">
        Answer a few quick questions to get personalized recommendations
      </p>

      <div className="quiz-container">
        <div className="quiz-progress">
          <motion.div
            className="quiz-progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="quiz-question-number">
          Question {currentQuestion + 1} of {QUESTIONS.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            className="quiz-question"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="question-text">{question.question}</h3>

            <div className="quiz-options">
              {question.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  className="quiz-option"
                  onClick={() => handleAnswer(question.id, option)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
