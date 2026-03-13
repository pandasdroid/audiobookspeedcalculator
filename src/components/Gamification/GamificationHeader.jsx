import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStats, updateStreak, ACHIEVEMENTS, loadAchievements } from '../../utils/gamification';
import './GamificationHeader.css';

export default function GamificationHeader() {
  const [stats, setStats] = useState(getStats());
  const [showAchievements, setShowAchievements] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const currentStreak = updateStreak();
    setStreak(currentStreak);

    // Refresh stats periodically
    const interval = setInterval(() => {
      setStats(getStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const unlockedIds = loadAchievements();

  return (
    <>
      <div className="gamification-header">
        <motion.div
          className="level-badge"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="level-icon">{stats.level.icon}</span>
          <div className="level-info">
            <div className="level-name">{stats.level.name}</div>
            <div className="level-number">Level {stats.level.level}</div>
          </div>
        </motion.div>

        <div className="progress-container">
          <div className="progress-label">
            {stats.totalPoints} XP
            {stats.progress.nextLevel && (
              <span className="points-to-next">
                {' '}· {stats.progress.pointsToNext} to {stats.progress.nextLevel.name}
              </span>
            )}
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              style={{ backgroundColor: stats.level.color }}
              initial={{ width: 0 }}
              animate={{ width: `${stats.progress.percent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {streak > 0 && (
          <motion.div
            className="streak-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <span className="streak-fire">🔥</span>
            <span className="streak-count">{streak}</span>
            <span className="streak-label">day{streak > 1 ? 's' : ''}</span>
          </motion.div>
        )}

        <motion.button
          className="achievements-btn"
          onClick={() => setShowAchievements(!showAchievements)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="trophy-icon">🏆</span>
          <span className="achievement-count">
            {stats.achievementsUnlocked}/{stats.totalAchievements}
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showAchievements && (
          <motion.div
            className="achievements-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAchievements(false)}
          >
            <motion.div
              className="achievements-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="modal-title">🏆 Achievements</h2>
              <div className="achievements-grid">
                {ACHIEVEMENTS.map((achievement) => {
                  const unlocked = unlockedIds.includes(achievement.id);
                  return (
                    <motion.div
                      key={achievement.id}
                      className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
                      whileHover={{ scale: unlocked ? 1.05 : 1 }}
                    >
                      <div className="achievement-icon">{achievement.icon}</div>
                      <div className="achievement-details">
                        <div className="achievement-name">{achievement.name}</div>
                        <div className="achievement-description">
                          {achievement.description}
                        </div>
                        <div className="achievement-points">+{achievement.points} XP</div>
                      </div>
                      {unlocked && <div className="unlock-badge">✓</div>}
                    </motion.div>
                  );
                })}
              </div>
              <button className="close-btn" onClick={() => setShowAchievements(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
