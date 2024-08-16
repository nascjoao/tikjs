// Polyfill for padStart
// @ts-expect-error -- TS doesn't know about padStart
if (!String.prototype.padStart) {
    // @ts-expect-error -- TS doesn't know about padStart
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; // truncate if number or convert non-number to 0
        padString = String(padString || " ");
        if (this.length >= targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

export { default } from "./tikjs";
