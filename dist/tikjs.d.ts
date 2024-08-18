type TikJSInput = string | number;
declare class TikJSTime {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    static dates: {
        /**
         * Get the duration between two or more dates. The order
         * of the dates can be ascending or descending.
         * @param dates - The dates to compare.
         * @returns The duration between the dates.
         * @example
         * ```javascript
         * const date1 = new Date("2021-01-01");
         * const date2 = new Date("2021-01-02");
         * const date3 = new Date("2021-01-03");
         *
         * const durationAsc = tikjs().dates.getDurationBetween(date1, date2, date3);
         * console.log(durationAsc.days); // 2
         *
         * const durationDesc = tikjs().dates.getDurationBetween(date3, date2, date1);
         * console.log(durationDesc.days); // 2
         * ```
         */
        getDurationBetween(...dates: Date[]): TikJSTime;
    };
    constructor(time: TikJSInput);
    format(format: string): string;
}

/**
 * @param time - The time to be converted. It must be a number or string representing seconds.
 * @returns A new TikJSTime instance. It represents the time in years, months, days,
 * hours, minutes, seconds and milliseconds. Also it has a method to format the time.
 * To format the time, you can use the following blocks:
 * - `y` or `yy`: years
 * - `M` or `MM`: months
 * - `d` or `dd`: days
 * - `h` or `hh`: hours
 * - `m` or `mm`: minutes
 * - `s` or `ss`: seconds
 * - `S` or `SS`: milliseconds
 * - `[...]`: any text inside the brackets will be displayed as is
 * @throws If the time pattern does not contain any of the following
 * blocks: "h", "hh", "m", "mm", "s" or "ss".
 * @example
 * ```javascript
 * import tikjs from "tikjs";
 *
 * const time = tikjs(60);
 *
 * console.log(time.format("Ti[m]e: m:ss")); // Time: 1:00
 * ```
 */
declare function tikjs(): typeof TikJSTime;
declare function tikjs(time: TikJSInput): TikJSTime;

export { tikjs as default };
