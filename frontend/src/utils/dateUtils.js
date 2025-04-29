/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Format a date as a string in the format "YYYY-MM-DD"
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Format a date as a string in the format "MM/DD/YYYY"
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date string
 */
export const formatDateUS = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${month}/${day}/${year}`;
};

/**
 * Get a date that is a specified number of days in the past
 * @param {number} days - Number of days in the past
 * @returns {Date} - The date in the past
 */
export const getDateInPast = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

/**
 * Calculate the difference in days between two dates
 * @param {Date} date1 - The first date
 * @param {Date} date2 - The second date
 * @returns {number} - The difference in days
 */
export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
