import {
    MILLISECONDS_IN_A_SECOND,
    SECONDS_IN_A_DAY,
    SECONDS_IN_A_MINUTE,
    SECONDS_IN_A_MONTH,
    SECONDS_IN_A_YEAR,
    SECONDS_IN_AN_HOUR,
} from "../utils/timeEquivalences";

export default function parseTimeToSeconds(time: string | number): number {
    const timeCollection = [];
    let seconds = 0;

    if (typeof time === "string") {
        const regex = /(\d+\.?\d*)\s*([yMdhmsS])?/g;
        let match;
        const matches = [];

        while ((match = regex.exec(time)) !== null) {
            matches.push(match);
        }

        for (const match of matches) {
            timeCollection.push([match[1], match[2] || "s"]);
        }
    }

    if (timeCollection.length === 0) {
        timeCollection.push([time, "s"]);
    }

    for (const [_time, unit] of timeCollection) {
        switch (unit) {
            case "y":
                seconds += Number(_time) * SECONDS_IN_A_YEAR;
                break;
            case "M":
                seconds += Number(_time) * SECONDS_IN_A_MONTH;
                break;
            case "d":
                seconds += Number(_time) * SECONDS_IN_A_DAY;
                break;
            case "h":
                seconds += Number(_time) * SECONDS_IN_AN_HOUR;
                break;
            case "m":
                seconds += Number(_time) * SECONDS_IN_A_MINUTE;
                break;
            case "s":
                seconds += Number(_time);
                break;
            case "S":
                seconds += Number(_time) / MILLISECONDS_IN_A_SECOND;
                break;
            default:
                throw new Error(
                    `Valid units: "y", "M", "d", "h", "m", "s" or "S".`,
                );
        }
    }

    return seconds;
}
