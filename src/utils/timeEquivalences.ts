/**
 * The average year length in days.
 *
 * This is the average length of a year in days, taking into account leap years.
 *
 * A common year has 365 days, but a leap year has 366 days. We add an extra day every 4 years
 * to account for the extra 0.25 days per year. However, century years are not leap years unless
 * they are divisible by 400. For example, 2000 is a leap year, but 2100 is not.
 *
 * To do this calculation, we add 1/4 of a day every year, but subtract 1/100 of a day every year.
 * Also add 1/400 of a day every year.
 */
export const AVERAGE_YEAR = 365 + 1 / 4 - 1 / 100 + 1 / 400;
export const AVERAGE_MONTH = AVERAGE_YEAR / 12;
export const HOURS_IN_A_DAY = 24;
export const MILLISECONDS_IN_A_SECOND = 1000;
export const SECONDS_IN_A_MINUTE = 60;
export const SECONDS_IN_AN_HOUR = 60 * 60;
export const SECONDS_IN_A_DAY = HOURS_IN_A_DAY * SECONDS_IN_AN_HOUR;
export const SECONDS_IN_A_MONTH = AVERAGE_MONTH * SECONDS_IN_A_DAY;
export const SECONDS_IN_A_YEAR = AVERAGE_YEAR * SECONDS_IN_A_DAY;
