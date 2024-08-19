import { TikJSTime } from "../TikJSTime";

describe("TikJSTime — format", () => {
    it("should return a formatted string", () => {
        const time = new TikJSTime(600);
        const formattedTime = time.format("hh:mm:ss");
        expect(formattedTime).toBe("00:10:00");
    });

    it("should escape blocks with square brackets", () => {
        const time = new TikJSTime(601);
        const formattedTime = time.format("Ti[m]e: mm:ss");
        expect(formattedTime).toBe("Time: 10:01");
    });
});
