import { type TikJSInput, TikJSTime } from "../TikJSTime";

/**
 * **Tik.js** is a library to work with time in JavaScript. It allows you to easily
 * parse time to get durations, format them, and add or subtract time from dates.
 *
 * @param time - The time to work with. It can be a number, a string or undefined.
 * If it's a number, it will be considered as a duration in seconds.
 * If it's a string, you can specify the unit of time by adding a suffix.
 * For example, "1d" for 1 day.
 *
 * Unit of time suffixes:
 * - `s` for seconds
 * - `m` for minutes
 * - `h` for hours
 * - `d` for days
 * - `M` for months
 * - `y` for years
 *
 * If the time is undefined, it will return the TikJSTime class, which will give
 * you access to the dates methods.
 *
 * @returns The TikJSTime instance if the time is defined, or the TikJSTime class if it's not.
 * @example
 * ```javascript
 * const time = tikjs(3600); // 1 hour
 * console.log(time.hours); // 1
 * console.log(time.minutes); // 60
 * console.log(time.seconds); // 3600
 * console.log(time.format("h:mm:ss")); // 1:00:00
 * ```
 * @example
 * ```javascript
 * const currentDate = new Date();
 * const newDate = tikjs().dates.add(currentDate, "1d");
 * console.log(newDate); // Adds 1 day to the current date.
 * ```
 */
function tikjs(): typeof TikJSTime;
function tikjs(time: TikJSInput): TikJSTime;
function tikjs(date1: Date, date2: Date): TikJSTime;
function tikjs(
    time?: TikJSInput | Date,
    date2?: Date,
): TikJSTime | typeof TikJSTime {
    if (time === undefined) {
        return TikJSTime;
    } else if (time instanceof Date && date2 instanceof Date) {
        return new TikJSTime(time, date2);
    }
    return new TikJSTime(time);
}

export default tikjs;
