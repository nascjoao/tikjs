import { TikJSTime } from "../TikJSTime";

describe("TikJSTime — format", () => {
    it("should return a formatted string", () => {
        const time = new TikJSTime(600);
        const formattedTime = time.format("hh:mm:ss");
        expect(formattedTime).toBe("00:10:00");
    });

    it("should throw an error if the format string is empty", () => {
        const time = new TikJSTime(600);
        expect(() => time.format("")).toThrow(
            'The time pattern "" must contain at least one of the following blocks: "h", "hh", "m", "mm", "s" or "ss".',
        );
    });

    it("should throw an error if the format string has no blocks", () => {
        const time = new TikJSTime(600);
        expect(() => time.format("abc")).toThrow(
            'The time pattern "abc" must contain at least one of the following blocks: "h", "hh", "m", "mm", "s" or "ss".',
        );
    });

    it("should escape blocks with square brackets", () => {
        const time = new TikJSTime(601);
        const formattedTime = time.format("Ti[m]e: mm:ss");
        expect(formattedTime).toBe("Time: 10:01");
    });
});
