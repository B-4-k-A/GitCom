"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserController = void 0;
const Parser_1 = require("./Parser");
class ParserController {
    constructor() {
        this.parser = new Parser_1.Parser();
    }
    removeComments(fileUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let comments = yield this.parser.removeComments(fileUri);
            if (comments.length === 0) {
                return [];
            }
            if (comments[1] === undefined) {
                return comments[0];
            }
            return comments;
        });
    }
    getCommentsInJson(fileUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let comments = yield this.removeComments(fileUri);
            if (comments.length === 0) {
                return [];
            }
            for (const data of comments) {
                let comm = data[0];
                let startPos = data[1];
                let endPos = data[2];
                for (let i = 0; i < comm.; i++)
                    ;
            }
        });
    }
}
exports.ParserController = ParserController;
//# sourceMappingURL=ParserController.js.map