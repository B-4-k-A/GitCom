
export class Comment {
    private line: number;
    private start: number;
    private end: number;

    constructor(line: number, start: number, end: number) {
        this.line = line;
        this.start = start;
        this.end = end;
    }

    public getLine(): number {
        return this.line;
    }

    public getStart(): number {
        return this.start;
    }

    public getEnd(): number {
        return this.end;
    }
}