/**
 * localStorage utilities for persisting user data
 */

const STORAGE_KEYS = {
  READING_QUEUE: 'audiobook_reading_queue',
  QUIZ_RESULT: 'audiobook_quiz_result',
  PREFERRED_SPEED: 'audiobook_preferred_speed'
};

/**
 * Save reading queue to localStorage
 */
export function saveReadingQueue(books) {
  try {
    localStorage.setItem(STORAGE_KEYS.READING_QUEUE, JSON.stringify(books));
  } catch (error) {
    console.error('Failed to save reading queue:', error);
  }
}

/**
 * Load reading queue from localStorage
 */
export function loadReadingQueue() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.READING_QUEUE);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load reading queue:', error);
    return [];
  }
}

/**
 * Save quiz result to localStorage
 */
export function saveQuizResult(result) {
  try {
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULT, JSON.stringify(result));
  } catch (error) {
    console.error('Failed to save quiz result:', error);
  }
}

/**
 * Load quiz result from localStorage
 */
export function loadQuizResult() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULT);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load quiz result:', error);
    return null;
  }
}

/**
 * Save preferred speed to localStorage
 */
export function savePreferredSpeed(speed) {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERRED_SPEED, speed.toString());
  } catch (error) {
    console.error('Failed to save preferred speed:', error);
  }
}

/**
 * Load preferred speed from localStorage
 */
export function loadPreferredSpeed() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERRED_SPEED);
    return data ? parseFloat(data) : 1.5; // Default to 1.5x
  } catch (error) {
    console.error('Failed to load preferred speed:', error);
    return 1.5;
  }
}

/**
 * Clear all stored data
 */
export function clearAllData() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear data:', error);
  }
}
