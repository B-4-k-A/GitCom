"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    // private end: number;
    constructor(line, start, end) {
        this.line = line;
        this.start = start;
        // this.end = end;
    }
    getLine() {
        return this.line;
    }
    getStart() {
        return this.start;
    }
    // public getEnd(): number {
    //     return this.end;
    // }
    toString() {
        return "[]";
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map