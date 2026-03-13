import { motion } from 'framer-motion';
import {
  calculateAdjustedDuration,
  calculateTimeSaved,
  calculatePercentageFaster,
  formatDuration,
  getSpeedColor,
  SPEED_OPTIONS
} from '../../utils/calculations';
import SectionWrapper from '../common/SectionWrapper';
import './ComparisonTable.css';

export default function ComparisonTable({ hours = 5, minutes = 30 }) {
  return (
    <SectionWrapper id="comparison" dark>
      <h2 className="section-title">Speed Comparison</h2>
      <p className="section-description">
        See how different speeds affect your listening time
      </p>

      <div className="comparison-table">
        <div className="table-header">
          <div className="header-cell">Speed</div>
          <div className="header-cell">Duration</div>
          <div className="header-cell">Time Saved</div>
          <div className="header-cell">% Faster</div>
        </div>

        {SPEED_OPTIONS.map((speed, index) => {
          const adjusted = calculateAdjustedDuration(hours, minutes, speed);
          const saved = calculateTimeSaved(hours, minutes, speed);
          const percentage = calculatePercentageFaster(speed);
          const colorClass = getSpeedColor(speed);
          const isRecommended = speed === 1.5;

          return (
            <motion.div
              key={speed}
              className={`table-row ${colorClass} ${isRecommended ? 'recommended' : ''}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="cell speed-cell">
                <span className="speed-badge">{speed}x</span>
                {isRecommended && <span className="recommended-badge">⭐ Sweet Spot</span>}
              </div>
              <div className="cell duration-cell">
                {formatDuration(adjusted.hours, adjusted.minutes)}
              </div>
              <div className="cell saved-cell">
                {speed > 1 ? formatDuration(saved.hours, saved.minutes) : '—'}
              </div>
              <div className="cell percentage-cell">
                {speed > 1 ? `+${percentage}%` : 'Normal'}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="comparison-insights"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="insight-card">
          <div className="insight-icon">🎯</div>
          <div className="insight-text">
            <strong>1.5x is the sweet spot</strong> for most listeners —
            fast enough to save time, comfortable enough to retain comprehension
          </div>
        </div>
        <div className="insight-card">
          <div className="insight-icon">🚀</div>
          <div className="insight-text">
            <strong>2x speed</strong> cuts listening time in half —
            ideal for familiar topics or non-fiction
          </div>
        </div>
        <div className="insight-card">
          <div className="insight-icon">⚠️</div>
          <div className="insight-text">
            <strong>Above 2.5x</strong> is for power listeners only —
            requires practice and works best with simple content
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
