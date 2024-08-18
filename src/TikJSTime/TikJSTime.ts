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

export type TikJSInput = string | number;

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

    constructor(time: TikJSInput) {
        const seconds = Number(time);
        if (seconds === 0) return;
        if (isNaN(seconds)) {
            throw new Error(
                `The time "${time}" is not a valid number or string that can be converted to a number.`,
            );
        }
        this.years = seconds / SECONDS_IN_A_YEAR;
        this.months = seconds / SECONDS_IN_A_MONTH;
        this.days = seconds / SECONDS_IN_A_DAY;
        this.hours = seconds / SECONDS_IN_AN_HOUR;
        this.minutes = seconds / SECONDS_IN_A_MINUTE;
        this.seconds = seconds;
        this.milliseconds = seconds * MILLISECONDS_IN_A_SECOND;
    }

    format(format: string) {
        const blocksPattern = /(yy?|MM?|dd?|hh?|mm?|ss?|SS?|\[[^\]]+\])/g;
        const thereAreNoBlocks = format.match(blocksPattern) === null;

        if (thereAreNoBlocks) {
            throw new Error(
                `The time pattern "${format}" must contain at least one of the following blocks: "h", "hh", "m", "mm", "s" or "ss".`,
            );
        }

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
