export interface PatternInterface {
    regex: RegExp;
    length: number;
}

export class Pattern implements PatternInterface {
    public regex: RegExp;
    public length: number;

    constructor(regex, length) {
        this.regex = regex;
        this.length = length;
    }
}
