import { motion, AnimatePresence } from 'framer-motion';
import './AchievementToast.css';

export default function AchievementToast({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="achievement-toast"
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <div className="toast-header">
          <span className="unlock-icon">🎉</span>
          <span className="unlock-text">Achievement Unlocked!</span>
        </div>
        <div className="toast-body">
          <div className="toast-icon">{achievement.icon}</div>
          <div className="toast-details">
            <div className="toast-name">{achievement.name}</div>
            <div className="toast-description">{achievement.description}</div>
            <div className="toast-points">+{achievement.points} XP</div>
          </div>
        </div>
        <div className="toast-progress" />
      </motion.div>
    </AnimatePresence>
  );
}
