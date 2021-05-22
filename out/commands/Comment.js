"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(line, start, end) {
        this.line = line;
        this.start = start;
        this.end = end;
    }
    getLine() {
        return this.line;
    }
    getStart() {
        return this.start;
    }
    getEnd() {
        return this.end;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map