import tikjs from "./tikjs";

describe("tikjs", () => {
    it("should return a TikJSTime object", () => {
        const time = tikjs(0);
        expect(time).toBeInstanceOf(Object);
        expect(time).toHaveProperty("years");
        expect(time).toHaveProperty("months");
        expect(time).toHaveProperty("days");
        expect(time).toHaveProperty("hours");
        expect(time).toHaveProperty("minutes");
        expect(time).toHaveProperty("seconds");
        expect(time).toHaveProperty("milliseconds");
    });

    it("should convert seconds to years", () => {
        const secondsInAYear = 31536000;
        const time = tikjs(secondsInAYear);
        expect(time.years).toBeCloseTo(1);
    });

    it("should convert seconds to months", () => {
        const secondsInAMonth = 2628000;
        const time = tikjs(secondsInAMonth);
        expect(time.months).toBeCloseTo(1);
    });

    it("should convert seconds to days", () => {
        const secondsInADay = 86400;
        const time = tikjs(secondsInADay);
        expect(time.days).toBe(1);
    });

    it("should convert seconds to hours", () => {
        const secondsInAnHour = 3600;
        const time = tikjs(secondsInAnHour);
        expect(time.hours).toBe(1);
    });

    it("should convert seconds to minutes", () => {
        const secondsInAMinute = 60;
        const time = tikjs(secondsInAMinute);
        expect(time.minutes).toBe(1);
    });

    it("should convert seconds to seconds", () => {
        const time = tikjs(1);
        expect(time.seconds).toBe(1);
    });

    it("should convert seconds to milliseconds", () => {
        const time = tikjs(1);
        expect(time.milliseconds).toBe(1000);
    });

    it("should return a full TikJSTime object converting seconds to all units", () => {
        const time = tikjs(600);
        expect(time.years).toBeCloseTo(0.000019);
        expect(time.months).toBeCloseTo(0.000228);
        expect(time.days).toBeCloseTo(0.00694444);
        expect(time.hours).toBeCloseTo(0.166667);
        expect(time.minutes).toBe(10);
        expect(time.seconds).toBe(600);
        expect(time.milliseconds).toBe(600000);
    });
});

describe("tikjs.format", () => {
    it("should return a formatted string", () => {
        const time = tikjs(600);
        const formattedTime = time.format("hh:mm:ss");
        expect(formattedTime).toBe("00:10:00");
    });

    it("should throw an error if the format string is empty", () => {
        const time = tikjs(600);
        expect(() => time.format("")).toThrow(
            'The time pattern "" must contain at least one of the following blocks: "h", "hh", "m", "mm", "s" or "ss".',
        );
    });

    it("should throw an error if the format string has no blocks", () => {
        const time = tikjs(600);
        expect(() => time.format("abc")).toThrow(
            'The time pattern "abc" must contain at least one of the following blocks: "h", "hh", "m", "mm", "s" or "ss".',
        );
    });

    it("should escape blocks with square brackets", () => {
        const time = tikjs(601);
        const formattedTime = time.format("Ti[m]e: mm:ss");
        expect(formattedTime).toBe("Time: 10:01");
    });
});
