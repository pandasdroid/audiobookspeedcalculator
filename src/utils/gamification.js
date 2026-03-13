/**
 * Gamification utilities - achievements, badges, rewards
 */

// Achievement definitions
export const ACHIEVEMENTS = [
  {
    id: 'first_calculation',
    name: 'Getting Started',
    description: 'Calculate your first audiobook speed',
    icon: '🎯',
    points: 10
  },
  {
    id: 'speed_explorer',
    name: 'Speed Explorer',
    description: 'Try 5 different playback speeds',
    icon: '🔍',
    points: 25
  },
  {
    id: 'quiz_master',
    name: 'Know Thyself',
    description: 'Complete the personality quiz',
    icon: '🧠',
    points: 50
  },
  {
    id: 'queue_builder',
    name: 'Queue Builder',
    description: 'Add 5 books to your reading queue',
    icon: '📚',
    points: 30
  },
  {
    id: 'time_saver',
    name: 'Time Saver',
    description: 'Save 10+ hours in a single calculation',
    icon: '⏰',
    points: 75
  },
  {
    id: 'speedster',
    name: 'Speedster',
    description: 'Use 2.5x speed or higher',
    icon: '🚀',
    points: 100
  },
  {
    id: 'year_planner',
    name: 'Forward Thinker',
    description: 'Check your yearly stats',
    icon: '📅',
    points: 40
  },
  {
    id: 'guide_reader',
    name: 'Knowledge Seeker',
    description: 'Read all speed guide sections',
    icon: '📖',
    points: 60
  }
];

// Level system based on total points
export const LEVELS = [
  { level: 1, name: 'Beginner', minPoints: 0, color: '#6c757d', icon: '🌱' },
  { level: 2, name: 'Listener', minPoints: 50, color: '#28a745', icon: '🎧' },
  { level: 3, name: 'Explorer', minPoints: 150, color: '#17a2b8', icon: '🔍' },
  { level: 4, name: 'Optimizer', minPoints: 300, color: '#ffc107', icon: '⚡' },
  { level: 5, name: 'Speed Master', minPoints: 500, color: '#dc3545', icon: '🚀' },
  { level: 6, name: 'Time Lord', minPoints: 750, color: '#9b59b6', icon: '⏳' }
];

/**
 * Get user level based on total points
 */
export function getUserLevel(totalPoints) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalPoints >= LEVELS[i].minPoints) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

/**
 * Get progress to next level
 */
export function getLevelProgress(totalPoints) {
  const currentLevel = getUserLevel(totalPoints);
  const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);

  if (!nextLevel) {
    return { percent: 100, pointsToNext: 0, nextLevel: null };
  }

  const pointsInLevel = totalPoints - currentLevel.minPoints;
  const pointsNeeded = nextLevel.minPoints - currentLevel.minPoints;
  const percent = Math.round((pointsInLevel / pointsNeeded) * 100);

  return {
    percent,
    pointsToNext: nextLevel.minPoints - totalPoints,
    nextLevel
  };
}

/**
 * Load achievements from localStorage
 */
export function loadAchievements() {
  try {
    const data = localStorage.getItem('audiobook_achievements');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

/**
 * Save achievements to localStorage
 */
export function saveAchievements(achievements) {
  try {
    localStorage.setItem('audiobook_achievements', JSON.stringify(achievements));
  } catch (error) {
    console.error('Failed to save achievements:', error);
  }
}

/**
 * Unlock an achievement
 */
export function unlockAchievement(achievementId, onUnlock) {
  const unlockedAchievements = loadAchievements();

  if (unlockedAchievements.includes(achievementId)) {
    return false; // Already unlocked
  }

  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!achievement) return false;

  unlockedAchievements.push(achievementId);
  saveAchievements(unlockedAchievements);

  if (onUnlock) {
    onUnlock(achievement);
  }

  return true;
}

/**
 * Get total points
 */
export function getTotalPoints() {
  const unlockedAchievements = loadAchievements();
  return unlockedAchievements.reduce((total, id) => {
    const achievement = ACHIEVEMENTS.find(a => a.id === id);
    return total + (achievement ? achievement.points : 0);
  }, 0);
}

/**
 * Get stats for display
 */
export function getStats() {
  const unlockedAchievements = loadAchievements();
  const totalPoints = getTotalPoints();
  const level = getUserLevel(totalPoints);
  const progress = getLevelProgress(totalPoints);

  return {
    achievementsUnlocked: unlockedAchievements.length,
    totalAchievements: ACHIEVEMENTS.length,
    totalPoints,
    level,
    progress
  };
}

/**
 * Daily streak tracking
 */
export function updateStreak() {
  try {
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem('audiobook_streak') || '{}');

    if (data.lastVisit === today) {
      return data.streak || 1;
    }

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const streak = data.lastVisit === yesterday ? (data.streak || 0) + 1 : 1;

    localStorage.setItem('audiobook_streak', JSON.stringify({
      lastVisit: today,
      streak
    }));

    return streak;
  } catch (error) {
    return 1;
  }
}

/**
 * Get current streak
 */
export function getStreak() {
  try {
    const data = JSON.parse(localStorage.getItem('audiobook_streak') || '{}');
    const today = new Date().toDateString();
    return data.lastVisit === today ? (data.streak || 0) : 0;
  } catch (error) {
    return 0;
  }
}
