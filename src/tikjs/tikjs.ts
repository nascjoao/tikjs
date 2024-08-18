import { type TikJSInput, TikJSTime } from "../TikJSTime";

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
export default function tikjs(time: TikJSInput) {
    return new TikJSTime(time);
}
