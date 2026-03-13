import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  calculateDaysToFinish,
  calculateFinishDate
} from '../../utils/calculations';
import { loadPreferredSpeed } from '../../utils/storage';
import SectionWrapper from '../common/SectionWrapper';
import AnimatedCounter from '../common/AnimatedCounter';
import './GoalPlanner.css';

export default function GoalPlanner() {
  const [hours, setHours] = useState(8);
  const [minutes, setMinutes] = useState(0);
  const [speed, setSpeed] = useState(loadPreferredSpeed());
  const [dailyMinutes, setDailyMinutes] = useState(30);

  const daysToFinish = calculateDaysToFinish(hours, minutes, speed, dailyMinutes);
  const finishDate = calculateFinishDate(daysToFinish);

  // Calculate bonus with extra time
  const bonusMinutes = 15;
  const daysWithBonus = calculateDaysToFinish(hours, minutes, speed, dailyMinutes + bonusMinutes);
  const daysSaved = daysToFinish - daysWithBonus;

  return (
    <SectionWrapper id="goal-planner">
      <h2 className="section-title">When Will You Finish?</h2>
      <p className="section-description">
        Plan your listening schedule and see your finish date
      </p>

      <div className="planner-container">
        <div className="planner-inputs">
          <div className="input-section">
            <label className="planner-label">Audiobook Duration</label>
            <div className="planner-input-group">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
                max="50"
                className="planner-input"
              />
              <span className="planner-unit">hours</span>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                min="0"
                max="59"
                className="planner-input"
              />
              <span className="planner-unit">min</span>
            </div>
          </div>

          <div className="input-section">
            <label className="planner-label">Playback Speed</label>
            <div className="planner-input-group">
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Math.max(0.5, Math.min(3, parseFloat(e.target.value) || 1)))}
                step="0.1"
                min="0.5"
                max="3"
                className="planner-input speed-input"
              />
              <span className="planner-unit">x</span>
            </div>
          </div>

          <div className="input-section">
            <label className="planner-label">Daily Listening Time</label>
            <div className="planner-input-group">
              <input
                type="number"
                value={dailyMinutes}
                onChange={(e) => setDailyMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="1440"
                className="planner-input"
              />
              <span className="planner-unit">min/day</span>
            </div>
          </div>
        </div>

        <motion.div
          className="planner-results"
          key={`${daysToFinish}-${finishDate}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="result-primary">
            <div className="result-label">You'll finish in</div>
            <div className="result-days">
              <AnimatedCounter value={daysToFinish} suffix="" /> days
            </div>
            <div className="result-date">by {finishDate}</div>
          </div>

          <div className="calendar-visual">
            <div className="calendar-icon">📅</div>
            <div className="calendar-info">
              <div className="calendar-label">Mark your calendar</div>
              <div className="calendar-date">{finishDate}</div>
            </div>
          </div>
        </motion.div>

        {daysSaved > 0 && (
          <motion.div
            className="bonus-tip"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bonus-icon">💡</div>
            <div className="bonus-text">
              <strong>Pro tip:</strong> Listen just <strong>{bonusMinutes} more minutes per day</strong>
              {' '}and you'll finish <strong>{daysSaved} day{daysSaved > 1 ? 's' : ''} sooner</strong>!
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
