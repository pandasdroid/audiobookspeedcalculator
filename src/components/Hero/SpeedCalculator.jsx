import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  calculateAdjustedDuration,
  calculateTimeSaved,
  formatDuration,
  getSpeedColor
} from '../../utils/calculations';
import { savePreferredSpeed, loadPreferredSpeed } from '../../utils/storage';
import './SpeedCalculator.css';

export default function SpeedCalculator() {
  const [hours, setHours] = useState(5);
  const [minutes, setMinutes] = useState(30);
  const [speed, setSpeed] = useState(loadPreferredSpeed());

  const adjustedDuration = calculateAdjustedDuration(hours, minutes, speed);
  const timeSaved = calculateTimeSaved(hours, minutes, speed);
  const speedColor = getSpeedColor(speed);

  useEffect(() => {
    savePreferredSpeed(speed);
  }, [speed]);

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  const handleHoursChange = (e) => {
    const value = Math.max(0, Math.min(50, parseInt(e.target.value) || 0));
    setHours(value);
  };

  const handleMinutesChange = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    setMinutes(value);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Audiobook Speed Calculator</h1>
          <p className="hero-subtitle">
            Discover how much time you can save by adjusting your playback speed
          </p>
        </motion.div>

        <motion.div
          className="calculator-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="duration-input-section">
            <label className="input-label">Audiobook Duration</label>
            <div className="duration-inputs">
              <div className="input-group">
                <input
                  type="number"
                  value={hours}
                  onChange={handleHoursChange}
                  min="0"
                  max="50"
                  className="duration-input"
                />
                <span className="input-unit">hours</span>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  value={minutes}
                  onChange={handleMinutesChange}
                  min="0"
                  max="59"
                  className="duration-input"
                />
                <span className="input-unit">minutes</span>
              </div>
            </div>
          </div>

          <div className="speed-slider-section">
            <label className="input-label">
              Playback Speed: <span className={`speed-value speed-${speedColor}`}>{speed.toFixed(2)}x</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={speed}
              onChange={handleSpeedChange}
              className={`speed-slider speed-${speedColor}`}
            />
            <div className="speed-markers">
              <span>0.5x</span>
              <span>1x</span>
              <span>1.5x</span>
              <span>2x</span>
              <span>2.5x</span>
              <span>3x</span>
            </div>
          </div>

          <div className="results-section">
            <motion.div
              className="result-card primary-result"
              key={`${adjustedDuration.hours}-${adjustedDuration.minutes}-${speed}`}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="result-label">Listening Time</div>
              <div className="result-value">
                {formatDuration(adjustedDuration.hours, adjustedDuration.minutes)}
              </div>
            </motion.div>

            {speed > 1 && (
              <motion.div
                className="result-card time-saved"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="saved-badge">⚡ You Save</div>
                <div className="result-value saved-value">
                  {formatDuration(timeSaved.hours, timeSaved.minutes)}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="quick-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="stat-item">
            <span className="stat-number">{speed.toFixed(1)}x</span>
            <span className="stat-label">Your Speed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{Math.round((speed - 1) * 100)}%</span>
            <span className="stat-label">Faster</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{formatDuration(hours, minutes)}</span>
            <span className="stat-label">Original</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
