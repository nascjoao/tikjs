import TikJSTime from "../TikJSTime";

/**
 * @param time - The time to be converted. It must be a number or string representing seconds.
 * @returns A new TikJSTime instance.
 * @example
 * ```javascript
 * import tikjs from "tikjs";
 *
 * const time = tikjs(60);
 *
 * console.log(time.format("m:ss")); // 1:00
 * ```
 */
export default function tikjs(
    time: ConstructorParameters<typeof TikJSTime>[0],
) {
    return new TikJSTime(time);
}
