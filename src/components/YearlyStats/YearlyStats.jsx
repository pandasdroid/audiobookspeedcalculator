import { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateYearlyProjections } from '../../utils/calculations';
import { loadPreferredSpeed } from '../../utils/storage';
import SectionWrapper from '../common/SectionWrapper';
import AnimatedCounter from '../common/AnimatedCounter';
import './YearlyStats.css';

export default function YearlyStats() {
  const [booksPerMonth, setBooksPerMonth] = useState(2);
  const [avgHours, setAvgHours] = useState(8);
  const [avgMinutes, setAvgMinutes] = useState(0);
  const [speed, setSpeed] = useState(loadPreferredSpeed());

  const stats = calculateYearlyProjections(booksPerMonth, avgHours, avgMinutes, speed);

  return (
    <SectionWrapper id="yearly-stats" dark>
      <h2 className="section-title">Your Yearly Impact</h2>
      <p className="section-description">
        See the mind-blowing cumulative effect of speed listening
      </p>

      <div className="stats-container">
        <div className="stats-inputs">
          <div className="stats-input-group">
            <label>Books per month</label>
            <input
              type="number"
              value={booksPerMonth}
              onChange={(e) => setBooksPerMonth(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="20"
              className="stats-input"
            />
          </div>

          <div className="stats-input-group">
            <label>Average book length</label>
            <div className="duration-combo">
              <input
                type="number"
                value={avgHours}
                onChange={(e) => setAvgHours(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
                max="50"
                className="stats-input small"
              />
              <span>h</span>
              <input
                type="number"
                value={avgMinutes}
                onChange={(e) => setAvgMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                min="0"
                max="59"
                className="stats-input small"
              />
              <span>m</span>
            </div>
          </div>

          <div className="stats-input-group">
            <label>Your speed</label>
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(Math.max(0.5, Math.min(3, parseFloat(e.target.value) || 1)))}
              step="0.1"
              min="0.5"
              max="3"
              className="stats-input"
            />
            <span className="input-suffix">x</span>
          </div>
        </div>

        <div className="stats-results">
          <motion.div
            className="stat-card primary"
            key={stats.hoursSaved}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="stat-icon">⏰</div>
            <div className="stat-number">
              <AnimatedCounter value={stats.hoursSaved} suffix=" hours" />
            </div>
            <div className="stat-label">Saved this year</div>
          </motion.div>

          <motion.div
            className="stat-card"
            key={stats.daysSaved}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="stat-icon">📅</div>
            <div className="stat-number">
              <AnimatedCounter value={stats.daysSaved} suffix=" days" />
            </div>
            <div className="stat-label">Of free time gained</div>
          </motion.div>

          <motion.div
            className="stat-card"
            key={stats.extraBooks}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="stat-icon">📚</div>
            <div className="stat-number">
              <AnimatedCounter value={stats.extraBooks} suffix=" books" />
            </div>
            <div className="stat-label">More you could finish</div>
          </motion.div>
        </div>

        <motion.div
          className="comparison-bars"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bar-group">
            <div className="bar-label">
              <span>At 1x speed</span>
              <span className="bar-value">{stats.hoursNormal} hours</span>
            </div>
            <div className="bar-container">
              <motion.div
                className="bar bar-normal"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
          </div>

          <div className="bar-group">
            <div className="bar-label">
              <span>At {speed}x speed</span>
              <span className="bar-value">{stats.hoursAtSpeed} hours</span>
            </div>
            <div className="bar-container">
              <motion.div
                className="bar bar-speed"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.hoursAtSpeed / stats.hoursNormal) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="wow-message"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="wow-icon">🤯</div>
          <div className="wow-text">
            That's <strong>{Math.round((stats.hoursSaved / 24) * 10) / 10} full days</strong> of your life saved every year!
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
