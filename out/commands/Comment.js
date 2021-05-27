"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(comment, start, end) {
        this.comment = comment;
        this.start = start;
        this.end = end;
    }
    getComment() {
        return this.comment;
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