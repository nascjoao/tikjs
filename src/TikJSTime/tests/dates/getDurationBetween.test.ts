import { TikJSTime } from "../..";

describe("TikJSTime — getDurationBetween", () => {
    it("should return the duration between two dates", () => {
        const date1 = new Date("2024-01-01T01:00:00Z");
        const date2 = new Date("2024-01-01T00:00:00Z");
        const time = TikJSTime.dates.getDurationBetween(date1, date2);

        expect(time.format("h [h]our")).toBe("1 hour");
    });

    it("should return the duration between three dates", () => {
        const date1 = new Date("2024-01-01T05:13:05Z");
        const date2 = new Date("2024-01-01T02:30:20Z");
        const date3 = new Date("2024-01-01T01:00:00Z");
        const time = TikJSTime.dates.getDurationBetween(date1, date2, date3);

        expect(time.format("h [hours], m [minutes] [and] s [seconds]")).toBe(
            "4 hours, 13 minutes and 5 seconds",
        );
    });

    it("should return the same duration between dates regardless of the order", () => {
        const date1 = new Date("2024-01-01T05:13:05Z");
        const date2 = new Date("2024-01-01T02:30:20Z");
        const date3 = new Date("2024-01-01T01:00:00Z");

        const time1 = TikJSTime.dates.getDurationBetween(date1, date2, date3);

        const time2 = TikJSTime.dates.getDurationBetween(date3, date2, date1);

        const format = "h [hours], m [minutes] [and] s [seconds]";

        expect(time1.format(format)).toBe(time2.format(format));
    });
});
