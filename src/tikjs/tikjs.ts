import { type TikJSInput } from "..";

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
const AVERAGE_YEAR = 365 + 1 / 4 - 1 / 100 + 1 / 400;
const AVERAGE_MONTH = AVERAGE_YEAR / 12;
const HOURS_IN_A_DAY = 24;
const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 60 * 60;
const SECONDS_IN_A_DAY = HOURS_IN_A_DAY * SECONDS_IN_AN_HOUR;
const SECONDS_IN_A_MONTH = AVERAGE_MONTH * SECONDS_IN_A_DAY;
const SECONDS_IN_A_YEAR = AVERAGE_YEAR * SECONDS_IN_A_DAY;

class TikJSTime {
    public years = 0;
    public months = 0;
    public days = 0;
    public hours = 0;
    public minutes = 0;
    public seconds = 0;
    public milliseconds = 0;

    constructor(time: TikJSInput) {
        const seconds = Number(time);
        this.years = seconds / SECONDS_IN_A_YEAR;
        this.months = seconds / SECONDS_IN_A_MONTH;
        this.days = seconds / SECONDS_IN_A_DAY;
        this.hours = seconds / SECONDS_IN_AN_HOUR;
        this.minutes = seconds / SECONDS_IN_A_MINUTE;
        this.seconds = seconds;
        this.milliseconds = seconds * MILLISECONDS_IN_A_SECOND;
    }
}

export default function tikjs(time: TikJSInput) {
    return new TikJSTime(time);
}
