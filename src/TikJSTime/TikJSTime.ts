import {
    MILLISECONDS_IN_A_SECOND,
    SECONDS_IN_A_DAY,
    SECONDS_IN_A_MINUTE,
    SECONDS_IN_A_MONTH,
    SECONDS_IN_A_YEAR,
    SECONDS_IN_AN_HOUR,
} from "../utils/timeEquivalences";
import parseTimeToSeconds from "../utils/parseTimeToSeconds";

export type TikJSInput = string | number | Date;

export class TikJSTime {
    public years = 0;
    public months = 0;
    public days = 0;
    public hours = 0;
    public minutes = 0;
    public seconds = 0;
    public milliseconds = 0;
    public static dates = {
        /**
         * @deprecated Pass the dates as arguments to `tikjs()` instead.
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
        getDurationBetween(...dates: Date[]) {
            let duration = 0;

            for (let index = 1; index < dates.length; index += 1) {
                const difference = Math.abs(
                    dates[index].getTime() - dates[index - 1].getTime(),
                );
                duration = duration + difference;
            }

            return new TikJSTime(duration / MILLISECONDS_IN_A_SECOND);
        },
    };

    constructor(time: TikJSInput);
    constructor(date1: Date, date2: Date);
    constructor(timeOrDate: TikJSInput, date2?: Date) {
        if (timeOrDate == 0) return;

        let seconds = 0;

        if (timeOrDate instanceof Date && date2 instanceof Date) {
            const millisecondsBetweenDates = Math.abs(
                timeOrDate.getTime() - date2.getTime(),
            );
            seconds = millisecondsBetweenDates / MILLISECONDS_IN_A_SECOND;
        } else if (!(timeOrDate instanceof Date)) {
            seconds = parseTimeToSeconds(timeOrDate);
        }

        this.years = seconds / SECONDS_IN_A_YEAR;
        this.months = seconds / SECONDS_IN_A_MONTH;
        this.days = seconds / SECONDS_IN_A_DAY;
        this.hours = seconds / SECONDS_IN_AN_HOUR;
        this.minutes = seconds / SECONDS_IN_A_MINUTE;
        this.seconds = seconds;
        this.milliseconds = seconds * MILLISECONDS_IN_A_SECOND;
    }

    /**
     * Format the time in a human-readable way.
     * You can use the following blocks:
     * - `y` or `yy`: years
     * - `M` or `MM`: months
     * - `d` or `dd`: days
     * - `h` or `hh`: hours
     * - `m` or `mm`: minutes
     * - `s` or `ss`: seconds
     * - `S` or `SS`: milliseconds
     * - `[...]`: any text inside the brackets will be displayed as is
     * @param format - The format to display the time.
     * @returns The formatted time.
     * @example
     * ```javascript
     * const time = tikjs(60);
     * console.log(time.format("Ti[m]e: m:ss")); // Time: 1:00
     * ```
     */
    format(format: string) {
        const blocksPattern = /(yy?|MM?|dd?|hh?|mm?|ss?|SS?|\[[^\]]+\])/g;
        const thereAreNoBlocks = format.match(blocksPattern) === null;

        if (thereAreNoBlocks) return format;

        const wholeYears = Math.floor(this.years);
        const wholeMonths = Math.floor(this.months) % 12;
        const wholeDays = (Math.floor(this.days) % 365) % 31;
        const wholeHours = Math.floor(this.seconds / SECONDS_IN_AN_HOUR) % 24;
        const wholeMinutes =
            Math.floor(this.seconds / SECONDS_IN_A_MINUTE) % 60;
        const wholeSeconds = Math.floor(this.seconds % 60);
        const wholeMilliseconds = Math.floor(this.milliseconds % 1000);

        const time: Record<string, number> = {
            y: wholeYears,
            M: wholeMonths,
            d: wholeDays,
            h: wholeHours,
            m: wholeMinutes,
            s: wholeSeconds,
            S: wholeMilliseconds,
        };

        return format.replace(blocksPattern, (block) => {
            if (block[0] === "[" && block[block.length - 1] === "]") {
                return block.slice(1, -1);
            }
            const blockKey = block[0];
            const blockValue = time[blockKey];
            // @ts-expect-error -- padStart has a polyfill
            return blockValue.toString().padStart(block.length, "0");
        });
    }
}
