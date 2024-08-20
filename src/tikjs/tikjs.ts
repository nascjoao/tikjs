import { type TikJSInput, TikJSTime } from "../TikJSTime";

/**
 * **Tik.js** is a library to work with time in JavaScript. It allows you to easily
 * parse time to get durations and format them.
 *
 * @param time - The time to work with. It can be a number or string.
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
 * const time = tikjs('1h'); // 1 hour
 * console.log(time.hours); // 1
 * console.log(time.minutes); // 60
 * console.log(time.seconds); // 3600
 * console.log(time.format("h:mm:ss")); // 1:00:00
 * ```
 *
 * Also, you can get the duration between two dates:
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 *
 * @example
 * ```javascript
 * const date1 = new Date('2021-01-01');
 * const date2 = new Date('2021-01-02');
 * const time = tikjs(date1, date2);
 * console.log(time.days); // 1
 * console.log(time.format("d [day]")) // 1 day
 * ```
 *
 * @returns A TikJSTime object.
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
