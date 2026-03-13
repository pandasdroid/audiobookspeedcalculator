/**
 * All speed and time calculation utilities
 */

/**
 * Convert hours and minutes to total minutes
 */
export function toMinutes(hours, minutes) {
  return (hours * 60) + minutes;
}

/**
 * Convert total minutes to hours and minutes object
 */
export function toHoursMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  return { hours, minutes };
}

/**
 * Calculate adjusted duration at a given speed
 */
export function calculateAdjustedDuration(hours, minutes, speed) {
  const totalMinutes = toMinutes(hours, minutes);
  const adjustedMinutes = totalMinutes / speed;
  return toHoursMinutes(adjustedMinutes);
}

/**
 * Calculate time saved at a given speed compared to 1x
 */
export function calculateTimeSaved(hours, minutes, speed) {
  const originalMinutes = toMinutes(hours, minutes);
  const adjustedMinutes = originalMinutes / speed;
  const savedMinutes = originalMinutes - adjustedMinutes;
  return toHoursMinutes(savedMinutes);
}

/**
 * Calculate percentage faster than 1x
 */
export function calculatePercentageFaster(speed) {
  return Math.round((speed - 1) * 100);
}

/**
 * Calculate how many days to finish at given speed and daily listening time
 */
export function calculateDaysToFinish(hours, minutes, speed, dailyListeningMinutes) {
  const adjustedMinutes = toMinutes(hours, minutes) / speed;
  return Math.ceil(adjustedMinutes / dailyListeningMinutes);
}

/**
 * Calculate finish date from today
 */
export function calculateFinishDate(daysToFinish) {
  const today = new Date();
  const finishDate = new Date(today);
  finishDate.setDate(today.getDate() + daysToFinish);
  return finishDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Format duration as "Xh Ym" string
 */
export function formatDuration(hours, minutes) {
  if (hours === 0) {
    return `${minutes}m`;
  }
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
}

/**
 * Calculate total queue time
 */
export function calculateQueueTotal(books, speed = 1) {
  const totalMinutes = books.reduce((acc, book) => {
    return acc + toMinutes(book.hours, book.minutes);
  }, 0);
  const adjustedMinutes = totalMinutes / speed;
  return toHoursMinutes(adjustedMinutes);
}

/**
 * Calculate yearly projections
 */
export function calculateYearlyProjections(booksPerMonth, avgHours, avgMinutes, speed) {
  const booksPerYear = booksPerMonth * 12;
  const minutesPerBook = toMinutes(avgHours, avgMinutes);
  const totalMinutesAtNormalSpeed = booksPerYear * minutesPerBook;
  const totalMinutesAtSpeed = totalMinutesAtNormalSpeed / speed;
  const savedMinutes = totalMinutesAtNormalSpeed - totalMinutesAtSpeed;

  return {
    hoursNormal: Math.round(totalMinutesAtNormalSpeed / 60),
    hoursAtSpeed: Math.round(totalMinutesAtSpeed / 60),
    hoursSaved: Math.round(savedMinutes / 60),
    daysSaved: Math.round(savedMinutes / 60 / 24),
    extraBooks: Math.round(savedMinutes / minutesPerBook)
  };
}

/**
 * Get speed color category
 */
export function getSpeedColor(speed) {
  if (speed <= 1.25) return 'green'; // Comfortable
  if (speed <= 1.75) return 'yellow'; // Fast
  return 'red'; // Extreme
}

/**
 * Standard speed options for comparison table
 */
export const SPEED_OPTIONS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3];
